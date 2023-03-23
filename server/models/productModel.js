import mongoose, { Schema } from "mongoose";

const URL_PATERN = /http(s)?:\/\/./i;
const productSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        image: {
            type: String, validate: {
                validator: (value) => URL_PATERN.test(value),
                message: 'Invalid URL'
            }
        },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        countMany: { type: Number, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        commentList: [
            new Schema({
                 userId:  String,
                 username: String,
                 comment: String
             })
         ],
    },
    {
        timestamps: true
    }
);

productSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Product = mongoose.model('Product', productSchema);

export default Product;