import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name!"],
        unique: true,
        minlength: [2, "A product name must be at least 2 characters"],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "A product must have a description"],
        trim: true,
    },

    price: {
        type: Number,
        required: [true, "A product must have a price"],
    },

    category: {
        type: String,
    },

    slug: {
        type: String,
    },

    image: {
        type: String,
        required: [true, "A product must have an image!"],
    },

    rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be above 1.0!"],
        max: [5, "Rating must be below 5.0!"],
    },

    ratingsQuantity: {
        type: Number,
        default: 0,
    },

    stock: {
        type: Number,
        required: [true, "A product must have a quantity"],
        min: [0, "Stock must be 0 or more!"],
    },
});

productSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
