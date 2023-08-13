import path from "path";
import url from "url";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";

import { router as userRouter } from "./routes/userRoutes.js";
import { router as productRouter } from "./routes/productRoutes.js";
import { router as viewRouter } from "./routes/viewRoutes.js";
import { router as bookingRouter } from "./routes/paymentRoutes.js";
import AppError from "./utils/appError.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(helmet({ contentSecurityPolicy: false }));

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(express.json());
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
    hpp({
        whitelist: ["name", "price", "category"],
    })
);

app.use("/", viewRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/purchases", bookingRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

export default app;
