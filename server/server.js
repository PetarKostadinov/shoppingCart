import express from "express";
import path from "path";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRuoter.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {

    console.log('Database connected')

}).catch((err) => {
    console.log(err.message);
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/client/build')));
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/build/index.htmml')));

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server listen at http://localhost:${port}`);
});