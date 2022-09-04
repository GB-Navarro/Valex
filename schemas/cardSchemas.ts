import Joi from "joi";

const createCardSchema = Joi.object({
    employeeId: Joi.number().greater(0).required(),
    cardType: Joi.string().valid("groceries","restaurant","transport","education","health").required()
})

const cardSchemas = {
    createCardSchema
}

export default cardSchemas;