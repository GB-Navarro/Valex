import { findByApiKey } from "./../repositories/companyRepository.js"

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

const cardServices = {
    checkApiKeyOwnerExistence
}

export default cardServices;