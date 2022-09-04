import { findByApiKey } from "./../repositories/companyRepository.js"
import { findById } from "./../repositories/employeeRepository.js";

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

const cardServices = {
    checkApiKeyOwnerExistence,
    checkEmployeeExistence
}

export default cardServices;