import Joi from "joi";

const purchaseAtPointOfSaleSchema = Joi.object({
    cardId: Joi.number().greater(0).required(),
    cardPassword: Joi.string().min(1).required(),
    companieId: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).required()
});

const purchasesSchemas = {
    purchaseAtPointOfSaleSchema
}

export default purchasesSchemas;