"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patternRoutes_1 = __importDefault(require("./routes/patternRoutes")); // Importa le tue route API
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1337;
app.use(express_1.default.json()); // Middleware per il parsing del body delle richieste in formato JSON
// Utilizza le tue route API
app.use("/api", patternRoutes_1.default);
// Avvio del server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
