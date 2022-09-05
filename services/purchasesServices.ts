import { insert, PaymentInsertData } from "./../repositories/paymentRepository.js"

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

async function insertPayment(cardId: number, businessId: number, amount: number){
    const paymentData: PaymentInsertData = {
        cardId:cardId,
        businessId:businessId,
        amount:amount
    }
    await insert(paymentData);
}

const purchasesServices = {
    compareCardTypeWithBusinessType,
    validatePurchaseBalance,
    insertPayment
}

export default purchasesServices;
