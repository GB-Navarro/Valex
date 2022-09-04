import Joi from "joi";

const createCardSchema = Joi.object({
    employeeId: Joi.number().greater(0).required(),
    cardType: Joi.string().min(6).valid("groceries","restaurant","transport","education","health").required()
})

const activateCardSchema = Joi.object({
    cardId: Joi.number().greater(0).required(),
    cardCVC: Joi.string().min(3).required(),
    cardPassword: Joi.string().min(8).required
})

const cardSchemas = {
    createCardSchema,
    activateCardSchema
}

export default cardSchemas;