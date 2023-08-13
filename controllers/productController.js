import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllProducts = catchAsync(async (req, res, next) => {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Product.find(JSON.parse(queryStr));

    const products = await query;

    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

export const createProduct = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            product,
        },
    });
});

export const getProduct = catchAsync(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new AppError("No product found with this ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            product,
        },
    });
});

export const updateProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        return next(new AppError("No product found with this ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            product,
        },
    });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(new AppError("No product found with this ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
