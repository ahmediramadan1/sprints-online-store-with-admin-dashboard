import express from "express";

import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAccount,
    updateAccount,
    deleteAccount,
} from "../controllers/userController.js";

import {
    signup,
    login,
    logout,
    updatePassword,
    forgotPassword,
    resetPassword,
    protectRoute,
    restrictRoute,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protectRoute);

router.get("/getAccount", getAccount);
router.patch("/updateAccount", updateAccount);
router.patch("/updatePassword", updatePassword);
router.delete("/deleteAccount", deleteAccount);

router.use(restrictRoute("super-admin", "sub-admin"));

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export { router };
