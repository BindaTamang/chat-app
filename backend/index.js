const express = require("express");
const UserRoute = require('./src/routes/user');
const MessageRoute = require("./src/routes/message")
const { connect } = require("./src/models");
const { ErrorHandle } = require("./src/middleware/error-handling");
const cors = require('cors');
const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", UserRoute);
app.use("/api/message", MessageRoute);

app.use(ErrorHandle);

app.listen(PORT, (err) => {
    if (err) {
        console.log("error while", err);
    } else {
        connect();
    }
});
