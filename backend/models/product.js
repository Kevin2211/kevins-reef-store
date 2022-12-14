import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
    url: String,
    fileName: String
})

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        careLevel: {
            type: Number,
            required: true
        },
        countInStock: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        lighting: {
            type: Number,
            required: true
        },
        flow: {
            type: Number,
            required: true
        },
        isAvailable: {
            type: Boolean,
            required: true
        }

    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product