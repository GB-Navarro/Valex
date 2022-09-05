function compareCardTypeWithBusinessType(cardType:string, businessType:string){
    if(cardType != businessType){
        throw { code: "error_cardTypeIsDiferentThanBusinessType", message: "The card type is diferent than business type" };
    }
}

const purchasesServices = {
    compareCardTypeWithBusinessType
}

export default purchasesServices;
