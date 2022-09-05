import { findByApiKey } from "./../repositories/companyRepository.js"
import { findById as findEmployeeById } from "./../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId, TransactionTypes, insert as insertCard, findById as findCardById, update } from "./../repositories/cardRepository.js";
import { findByCardId as findTransactionsByCardId, PaymentWithBusinessName } from "../repositories/paymentRepository.js";
import { findByCardId as findRechargesByCardId, Recharge, insert as insertRecharge, RechargeInsertData } from "../repositories/rechargeRepository.js";
import { faker } from "@faker-js/faker"
import { Card } from "./../repositories/cardRepository";

import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

async function checkApiKeyOwnerExistence(apiKey: string){

    const result = await findByApiKey(apiKey);

    let apiKeyOwnerExists:boolean;

    if(result === undefined){
        apiKeyOwnerExists = false;
        throw { code: "error_apiKeyHasNoOwner", message: "API key must have an owner!" };
        
    }else{
        apiKeyOwnerExists = true;
        return apiKeyOwnerExists;
    }
}

async function checkEmployeeExistence(id: number){
    const result = await findEmployeeById(id);

    let employeeExists:boolean;

    if(result === undefined){
        employeeExists = false;
        throw { code: "error_employeeDontExist", message: "There is no employee with that id." };
    }else{
        employeeExists = true;
        return employeeExists;
    }
}

async function checkEmployeeCardTypeExistence(type: TransactionTypes, employeeId:number){
    const result = await findByTypeAndEmployeeId(type,employeeId);

    let employeeCardTypeExists:boolean;

    if(result === undefined){
        employeeCardTypeExists = false;
        return employeeCardTypeExists;
    }else{
        employeeCardTypeExists = true;
        throw { code: "error_employeeAlreadyHasThisTypeOfCard", message: "An employee cannot have two cards of the same type!" };
        
    }
}

async function generateCard(employeeId: number, cardType: string){

    const cryptr = new Cryptr(process.env.ENCRYPT_KEY);
    const employeeName: string = (await findEmployeeById(employeeId)).fullName;

    const cardNumber: string = faker.finance.creditCardNumber();
    const cardName: string = generateCardName(employeeName);
    const cardExpirationDate: string = dayjs().add(5,'year').format('MM/YY');
    const cardCVV: string = faker.finance.creditCardCVV();
    const encryptedCVV: string = cryptr.encrypt(cardCVV);

    const card: any = {
        employeeId: employeeId,
        number: cardNumber,
        cardholderName: cardName,
        securityCode: encryptedCVV,
        expirationDate: cardExpirationDate,
        isVirtual: false,
        isBlocked: true,
        type: cardType
    }

    return card;
}

function generateCardName(employeeName:string){

    const separatedNames: string[] = employeeName.split(" ");
    const middleNamesInitials: string[] = [];

    for(let i = 1; i < (separatedNames.length - 2); i++){
        const separatedName: string = separatedNames[i];
        if(separatedName.length >= 3){
            middleNamesInitials.push(separatedName[0]);
        }
    }

    if(middleNamesInitials.length > 0){
        let cardName = separatedNames[0].toString();
        middleNamesInitials.forEach((middleNameInitial) => {
            cardName += " " + middleNameInitial.toString();
        })
        cardName += " " + separatedNames[separatedNames.length - 1].toString();
        return cardName.toUpperCase();
    }else{
        const cardName:string = separatedNames[0].toString() + " " + separatedNames[separatedNames.length - 1].toString()
        return cardName.toUpperCase();
    }
}

async function createCard(cardData: any){
    const result: void = await insertCard(cardData);
}

async function getCardData(cardId: number){
    const cardData: Card = await findCardById(cardId);

    if(cardData === undefined){
        throw { code: "error_cardDoesNotExist", message: "There is no card with this id" };
    }else{
        return cardData;
    }
}

function checkCardExpirationDate(expirationDate: string){

    const expirationMonth = expirationDate[0] + expirationDate[1];
    const expirationYear = expirationDate[3] + expirationDate[4];

    const now = dayjs().format('MM/YY');
    const nowMonth = now[0] + now[1];
    const nowYear = now[3] + now[4];

    if((parseInt(expirationYear) - parseInt(nowYear)) > 5 ){
        throw { code: "error_cardExpired", message: "Card validity has expired!" };
    }else if((parseInt(expirationYear) - parseInt(nowYear)) === 5 ){
        if((parseInt(expirationMonth) - parseInt(nowMonth)) > 0 ){
            throw { code: "error_cardExpired", message: "Card validity has expired!" };
        }
    }
}

function checkIfCardIsActive(password: string){
    if(password === null){
        throw { code: "error_cardIsInactive", message: "This card is inactive!" };
    }
}

function checkIfCardIsInactive(password: string){
    if(password != null){
        throw { code: "error_cardHasAlreadyBeenActivated", message: "This card has already been activated!" };
    }
}

function checkCardSecurityCode(receivedSecurityCode:string, encryptedRealSecurityCode:string){
    const cryptr = new Cryptr(process.env.ENCRYPT_KEY);
    const decryptedRealSecurityCode:string = cryptr.decrypt(encryptedRealSecurityCode);

    if(receivedSecurityCode != decryptedRealSecurityCode){
        throw { code: "error_cardSecurityCodeIsInvalid", message: "The card security code is invalid!" }
    }
}

function checkReceivedPasswordFormatValidity(cardPassword: string){

    const regex = /^[0-9]{4}$/;
    const isPasswordValid: boolean = regex.test(cardPassword);

    if(!(isPasswordValid)){
        throw { code: "error_cardPasswordFormatIsNotValid", message: "The card password must be composed of 4 numbers" }
    }
}

async function activateCard(cardId:number, cardPassword: string){
    const cryptr = new Cryptr(process.env.ENCRYPT_KEY);
    const encryptedCardPassword: any = cryptr.encrypt(cardPassword);
    const result = await update(cardId, {password: encryptedCardPassword});
}

async function getCardTransactions(cardId: number){
    const result = await findTransactionsByCardId(cardId);
    return result;
}

async function getCardRecharges(cardId: number){
    const result = await findRechargesByCardId(cardId);
    return result;
}

function calculateBalance(cardTransactions: PaymentWithBusinessName[], cardRecharges: Recharge[]){
    let cardRechargesBalance: number = 0;
    cardRecharges.forEach((cardRecharges) => {
        cardRechargesBalance += cardRecharges.amount;
    })
    let cardTransactionsBalance: number = 0;
    cardTransactions.forEach((cardTransaction) => {
        cardTransactionsBalance += cardTransaction.amount;
    })
    const balance = cardRechargesBalance - cardTransactionsBalance;
    const balanceData = {
        balance: balance,
        transactions: cardTransactions,
        recharges: cardRecharges
    }
    return balanceData;
}

function checkIfCardAreUnblocked(isBlocked:boolean){
    if(isBlocked){
        throw { code: "error_cardAlreadyIsBlocked", message: "The card is blocked" }
    }
}

function checkIfCardAreBlocked(isBlocked:boolean){
    if(!(isBlocked)){
        throw { code: "error_cardAlreadyIsUnblocked", message: "The card is unblocked" }
    }
}

function checkPasswordValidity(receivedPassword: string, cardPassword: string){
    const cryptr = new Cryptr(process.env.ENCRYPT_KEY);
    const decryptedPassword = cryptr.decrypt(cardPassword);
    if(decryptedPassword != receivedPassword){
        throw { code: "error_invalidPassword", message: "The card password is incorrect!" }
    }
}

async function blockCard(cardId:number){
    const result = await update(cardId, {isBlocked: true});
}

async function unblockCard(cardId:number){
    const result = await update(cardId, {isBlocked: false});
}

async function insertCardRecharge(cardId: number, amount: number){
    const rechargeData: RechargeInsertData =  {
        cardId:cardId,
        amount:amount
    }
    const result = await insertRecharge(rechargeData);
}

const cardServices = {
    checkApiKeyOwnerExistence,
    checkEmployeeExistence,
    checkEmployeeCardTypeExistence,
    generateCard,
    createCard,
    getCardData,
    checkCardExpirationDate,
    checkIfCardIsActive,
    checkIfCardIsInactive,
    checkCardSecurityCode,
    checkReceivedPasswordFormatValidity,
    activateCard,
    getCardTransactions,
    getCardRecharges,
    calculateBalance,
    checkIfCardAreUnblocked,
    checkPasswordValidity,
    blockCard,
    checkIfCardAreBlocked,
    unblockCard,
    insertCardRecharge
}

export default cardServices;