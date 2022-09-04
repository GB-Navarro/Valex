import { findByApiKey } from "./../repositories/companyRepository.js"
import { findById } from "./../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId, TransactionTypes, insert } from "./../repositories/cardRepository.js";
import { faker } from "@faker-js/faker"

import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

async function checkApiKeyOwnerExistence(apiKey: string){

    const result = await findByApiKey(apiKey);

    let apiKeyOwnerExists:boolean;

    if(result === undefined){
        apiKeyOwnerExists = false;
        return apiKeyOwnerExists;
    }else{
        apiKeyOwnerExists = true;
        return apiKeyOwnerExists;
    }
}

async function checkEmployeeExistence(id: number){
    const result = await findById(id);

    let employeeExists:boolean;

    if(result === undefined){
        employeeExists = false;
        return employeeExists;
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
        return employeeCardTypeExists;
    }
}

async function generateCard(employeeId: number, cardType: string){

    const cryptr = new Cryptr(process.env.ENCRYPT_KEY);
    const employeeName: string = (await findById(employeeId)).fullName;

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
    let isDataInserted:boolean;
    try{
        const promisse: void = await insert(cardData);
        isDataInserted = true;
        return isDataInserted
    }catch(error){
        console.log(error);
        isDataInserted = false;
        return isDataInserted;
    }
}

const cardServices = {
    checkApiKeyOwnerExistence,
    checkEmployeeExistence,
    checkEmployeeCardTypeExistence,
    generateCard,
    createCard
}

export default cardServices;