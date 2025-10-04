import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const InvoiceSchema = new Schema({

})

InvoiceSchema.plugin(mongooseAggregatePaginate)
export const Invoice = mongoose.model('Invoice', InvoiceSchema)