import { findByApiKey } from "./../repositories/companyRepository.js"
import { findById } from "./../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId, TransactionTypes } from "./../repositories/cardRepository.js";
import { faker } from "@faker-js/faker"
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
    const cardNumber: string = faker.finance.account()
    const employeeName: any = (await findById(employeeId)).fullName;
    const cardName: string = generateCardName(employeeName);
    console.log(cardName);
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

const cardServices = {
    checkApiKeyOwnerExistence,
    checkEmployeeExistence,
    checkEmployeeCardTypeExistence,
    generateCard
}

export default cardServices;