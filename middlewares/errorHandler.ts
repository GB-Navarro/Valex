import { Request, Response, NextFunction } from "express";

export default async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.code === "error_apiKeyHasNoOwner" || error.code === "error_employeeDontExist" || error.code === "error_cardDoesNotExist" || error.code === "error_cardHasAlreadyBeenActivated" || error.code === "error_cardPasswordFormatIsNotValid" || error.code === "error_cardAlreadyIsBlocked" || error.code === "error_cardAlreadyIsUnblocked") {
        return res.status(404).send({ message: error.message });
    }
    if (error.code === "error_employeeAlreadyHasThisTypeOfCard") {
        return res.status(406).send({ message: error.message });
    }
    if (error.code === "error_dataDontIsValid") {
        return res.status(400).send({ message: error.message });
    }
    if (error.code === "error_cardExpired" || error.code === "error_cardSecurityCodeIsInvalid" || error.code === "error_invalidPassword" || error.code === "error_cardIsInactive" || error.code === "error_businessIsNotRegistered" || error.code === "error_cardTypeIsDiferentThanBusinessType" || error.code === "error_unchargedCard" || error.code === "error_cardBalanceIsSmallThanPaymentValue") {
        return res.status(401).send({ message: error.message });
    }
    return res.sendStatus(500);
}