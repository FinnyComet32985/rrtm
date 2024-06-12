"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pkb/SistemaDiRicerca/FiltroApplicato.ts
const pattern_1 = __importDefault(require("../pattern"));
class FiltroApplicato {
    constructor(id, nome, tipoRicerca) {
        this.tipoRicerca = tipoRicerca;
        this.filtroPattern = new pattern_1.default(id, "", "", "", "", "", "");
        if (tipoRicerca === "pattern" ||
            tipoRicerca === "esempioApplicazionePattern") {
            this.filtroPattern = new pattern_1.default(id, "", "", "", "", "", "");
        }
    }
}
exports.default = FiltroApplicato;
