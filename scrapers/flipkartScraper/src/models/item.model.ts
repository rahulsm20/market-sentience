import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    description: { type: String },
    review_count: { type: Number, required: true },
    rating_count:{type:Number,required:true},
    rating: { type: mongoose.Schema.Types.Decimal128, required: true },
    media_count: { type: Number, required: true },
    comments:[{ type: String }]
});

export const ItemModel = mongoose.model('Item',ItemSchema); 