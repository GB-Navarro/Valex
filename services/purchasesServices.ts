function compareCardTypeWithBusinessType(cardType:string, businessType:string){
    if(cardType != businessType){
        throw { code: "error_cardTypeIsDiferentThanBusinessType", message: "The card type is diferent than business type" };
    }
}

function validatePurchaseBalance(cardBalance:number, paymentValue: number){
    if(paymentValue > cardBalance){
        throw { code: "error_cardBalanceIsSmallThanPaymentValue", message: "The card balance is small than payment value" };
    }
}

const purchasesServices = {
    compareCardTypeWithBusinessType,
    validatePurchaseBalance
}

export default purchasesServices;
