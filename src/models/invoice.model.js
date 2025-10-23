import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const InvoiceSchema = new Schema({
    invoice_no: {
        type: String,
        required: true,
        unique:true
    },
    leadID: {
        type: String,
        required: true
    },
    invoice_date: {
        type: Date,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    },
    totalAmount: {
        type: String,
        required: String
    },
    dueDate: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

InvoiceSchema.plugin(mongooseAggregatePaginate)
export const Invoice = mongoose.model('Invoice', InvoiceSchema)