import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAccount = (req, res, next) => {
    const user = {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
    };

    res.status(200).json({
        status: "success",
        data: { user },
    });
};

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

export const updateAccount = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                "This route is not for updating password! Please use /updatePassword.",
                400
            )
        );
    }

    const filteredBody = filterObj(req.body, "name", "email");

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});

export const deleteAccount = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

export const getUser = catchAsync(async (req, res, next) => {
    let user = User.findById(req.params.id);

    if (!user) {
        return next(new AppError("No user found with this ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const createUser = catchAsync(async (req, res, next) => {
    res.status(500).json({
        status: "error",
        message:
            "You can't create a user using this route! Please use /register to create a new account",
    });
});

export const updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new AppError("No user found with this ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new AppError("No user found with this ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
