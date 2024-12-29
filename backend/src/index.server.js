const express = require("express");
const app = express();
const mongoose = require("mongoose")
const env = require("dotenv").config();
const PORT = process.env.PORT;
const userRoutes = require("./routes/user.Routes")
const categoryRoutes = require("./routes/category.Routes")
const cartRoutes = require("./routes/cart.Routes")
const productRoutes = require("./routes/product.Routes")
const path = require("path")


app.use(express.json())
app.use("/public/",express.static(path.join(__dirname,"./uploads")))
app.use("/api", userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",cartRoutes)
app.use("/api",productRoutes)


mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(PORT, () => { console.log("server is connected on port " + PORT); })
        console.log("Database is connected");
    }).catch((err) => { console.log(err); })


