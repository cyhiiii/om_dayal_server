import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const ReceiptSchema = new Schema({

})

ReceiptSchema.plugin(mongooseAggregatePaginate)
export const Receipt = mongoose.model('Receipt', ReceiptSchema)