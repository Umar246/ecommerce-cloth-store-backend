const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* ROUTES
const authRoutes = require("./Routes/authRoutes");
app.use("/auth", authRoutes);

const userRoutes = require("./Routes/userRoutes");
app.use("/users", userRoutes);

const adminProductRoutes = require("./Routes/adminProductRoutes");
app.use("/admin/products", adminProductRoutes);

const productRoutes = require("./Routes/productRoutes");
app.use("/products", productRoutes);


const cartRoutes = require("./Routes/cartRoutes");
app.use("/cart", cartRoutes);

//TODO Continue API's testing from here 
const cartItemRoutes = require("./Routes/cartItemRoutes");
app.use("/cart_items", cartItemRoutes);

const orderRoutes = require("./Routes/orderRoutes");
app.use("/orders", orderRoutes);

const adminOrderRoutes = require("./Routes/adminOrderRoutes");
app.use("/admin/orders", adminOrderRoutes);

const reviewRoutes = require("./Routes/reviewRoutes");
app.use("/reviews", reviewRoutes);

const ratingRoutes = require("./Routes/ratingRoutes");
app.use("/ratings", ratingRoutes);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ msg: "welcome to ecommerce site ", status: true });
});
module.exports = app;
