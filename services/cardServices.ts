import { findByApiKey } from "./../repositories/companyRepository.js"
import { findById as findEmployeeById } from "./../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId, TransactionTypes, insert, findById as findCardById } from "./../repositories/cardRepository.js";
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
    const result: void = await insert(cardData);
}

async function checkCardExistence(cardId: number){
    const result: Card = await findCardById(cardId);

    if(result === undefined){
         throw { code: "error_cardDoesNotExist", message: "There is no card with this id" };
    }
}

const cardServices = {
    checkApiKeyOwnerExistence,
    checkEmployeeExistence,
    checkEmployeeCardTypeExistence,
    generateCard,
    createCard,
    checkCardExistence
}

export default cardServices;