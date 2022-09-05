import { findById as findBusinessById } from "../repositories/businessRepository.js";

async function searchABusiness(companyId: number){
    const result = await findBusinessById(companyId);
    if(result === undefined){
        throw { code: "error_businessIsNotRegistered", message: "Do not exist a business with that id!" };
    }
}

const businessServices = {
    searchABusiness
}

export default businessServices;
