"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
class Pattern {
    constructor(Id, titolo, sommario, descrizione, problema, soluzione, esempio) {
        this.Id = Id;
        this.titolo = titolo;
        this.sommario = sommario;
        this.descrizione = descrizione;
        this.problema = problema;
        this.soluzione = soluzione;
        this.esempio = esempio;
    }
    // gli altri costruttori
    static getIdByTitolo(titolo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM pattern WHERE titolo = ?";
            server_1.default.query(query, [titolo], (err, results) => {
                if (err)
                    return reject(err);
                if (results.length > 0) {
                    resolve(results[0].Id);
                }
                else {
                    reject(new Error("Pattern not found"));
                }
            });
        });
    }
}
exports.default = Pattern;
