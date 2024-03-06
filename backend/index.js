const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware"); 
const rootRouter = require("./routes/index");
const { DB_URL } = require("./config");

const port = 3000;

const app = express();
async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
connectToDatabase();

//middleware 
app.use(cors());
app.use(express.json());

// Using the middleware
app.use(authMiddleware);

app.use("/api/v1", rootRouter);
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`server is listening on port`);
});
