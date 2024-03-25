require("dotenv").config();
require("./models/wsa.model").default
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')
const bodyParser = require("body-parser")

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get("/", (req,res) => res.send("WSA"));
app.use("/", require("./controllers/wsa.controller"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server listening on port " + port));
