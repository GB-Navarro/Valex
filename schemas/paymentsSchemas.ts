import Joi from "joi";

const purchaseAtPointOfSaleSchema = Joi.object({
    cardId: Joi.number().greater(0).required(),
    cardPassword: Joi.string().min(1).required(),
    businessId: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).required()
});

const paymentsSchemas = {
    purchaseAtPointOfSaleSchema
}

export default paymentsSchemas;