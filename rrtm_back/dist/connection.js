"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// Connessione al database
const connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "rrtm",
    password: "rrtm",
    database: "rrtm",
});
connection.connect((err) => {
    if (err)
        throw err;
    console.log("Connected to the database!");
});
exports.default = connection;
