import { findByApiKey } from "./../repositories/companyRepository.js"
import { findById } from "./../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId, TransactionTypes } from "./../repositories/cardRepository.js";

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

async function checkEmployeeCardTypeExistence(type: TransactionTypes, id:number){
    const result = await findByTypeAndEmployeeId(type,id);

    let employeeCardTypeExists:boolean;

    if(result === undefined){
        employeeCardTypeExists = true;
        return employeeCardTypeExists;
    }else{
        employeeCardTypeExists = false;
        return employeeCardTypeExists;
    }
}

const cardServices = {
    checkApiKeyOwnerExistence,
    checkEmployeeExistence,
    checkEmployeeCardTypeExistence
}

export default cardServices;