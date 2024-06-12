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
Object.defineProperty(exports, "__esModule", { value: true });
const connection = require("../../index.js");
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
    getId() {
        return this.Id;
    }
    getTitolo() {
        return this.titolo;
    }
    getSommario() {
        return this.sommario;
    }
    getDescrizione() {
        return this.descrizione;
    }
    getProblema() {
        return this.problema;
    }
    getSoluzione() {
        return this.soluzione;
    }
    getEsempio() {
        return this.esempio;
    }
    // setters
    setId(Id) {
        this.Id = Id;
    }
    setTitolo(titolo) {
        this.titolo = titolo;
    }
    setSommario(sommario) {
        this.sommario = sommario;
    }
    setDescrizione(descrizione) {
        this.descrizione = descrizione;
    }
    setProblema(problema) {
        this.problema = problema;
    }
    setSoluzione(soluzione) {
        this.soluzione = soluzione;
    }
    setEsempio(esempio) {
        this.esempio = esempio;
    }
    static updateFiltro(filtro) {
        return __awaiter(this, void 0, void 0, function* () {
            let Id = filtro.filtroPattern.getId();
            const query = "SELECT * FROM pattern WHERE id = ?";
            return new Promise((resolve, reject) => {
                connection.query(query, [Id], (err, results) => {
                    if (err)
                        return reject(err);
                    if (results.length > 0) {
                        const patternData = results[0];
                        filtro.filtroPattern.setId(patternData.Id);
                        filtro.filtroPattern.setDescrizione(patternData.descrizione);
                        filtro.filtroPattern.setEsempio(patternData.esempio);
                        resolve();
                    }
                    else {
                        reject(new Error("Pattern not found"));
                    }
                });
            });
        });
    }
    static getTitoloDB(Id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM pattern WHERE titolo = ?";
            connection.query(query, [Id], (err, results) => {
                if (err)
                    return reject(err);
                if (results.length > 0) {
                    resolve(results[0].titolo);
                }
                else {
                    reject(new Error("Pattern not found"));
                }
            });
        });
    }
    static getPatternFromDB(Id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM pattern WHERE id=?";
            connection.query(query, [Id], (err, results) => {
                if (err)
                    return reject(err);
                if (results.length > 0) {
                    const patternData = results[0];
                    const pattern = new Pattern(patternData.id, patternData.titolo, "", patternData.descrizione, "", "", patternData.esempio);
                    resolve(pattern);
                }
                else {
                    reject(new Error("Pattern not found"));
                }
            });
        });
    }
    static getIdByTitolo(titolo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM pattern WHERE titolo = ?";
            connection.query(query, [titolo], (err, results) => {
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
