import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const ReceiptSchema = new Schema({
    invoice_no: {
        type: String,
        required: true,
    },
    receipt_no: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    leadID: {
        type: String,
        required: true,
    },
    paidAmount: {
        type: String,
        required: true,
    },
    transactionID: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: String,
        required: true,
    },
    remainingAmount: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
)

ReceiptSchema.plugin(mongooseAggregatePaginate)
export const Receipt = mongoose.model('Receipt', ReceiptSchema)