import { Schema, model } from 'mongoose';

const languageSchema = new Schema({
    title: { type: "string", require: true },
    description: { type: "string", require: true },
    variation: { type: "string", require: true },
    price: { type: "string", require: true },
    exclusions: { type: "string", require: true },
    interests: { type: "string", require: true },
    transportation: { type: "string", require: true },
    guidance: { type: "string", require: true },
    path: { type: "string", require: true },
    requirements: { type: "string", require: true },
});

const contentSchema = new Schema({
    data: {
        type: Map,
        of: languageSchema,
    },
});

const Product = model('content', contentSchema);
export default Product;