"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const InterfacciaRicerca = require("../pkb/SistemaDiRicerca/InterfacciaRicerca");
const router = express.Router();
// Definisci la route API per ottenere i pattern
router.get("/patterns", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patterns = yield InterfacciaRicerca.showPatterns();
        res.json(patterns);
    }
    catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
