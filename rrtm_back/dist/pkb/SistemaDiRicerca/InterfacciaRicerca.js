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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FiltroApplicato_1 = __importDefault(require("./FiltroApplicato"));
const pattern_1 = __importDefault(require("../pattern"));
const connection = require("../../index.js");
class InterfacciaRicerca {
    static findEsempioApplicazionePattern(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            let filtro = new FiltroApplicato_1.default(Id, "", "esempioApplicazionePattern");
            yield pattern_1.default.updateFiltro(filtro);
            let esempio = filtro.filtroPattern.getEsempio();
            return esempio;
        });
    }
    static showPatterns() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = "SELECT * FROM pattern";
                connection.query(query, (err, results) => {
                    if (err)
                        return reject(err);
                    if (results.length > 0) {
                        const patterns = results.map((row) => ({
                            id: row.Id,
                            titolo: row.titolo,
                            sommario: row.sommario,
                            descrizione: row.descrizione,
                            esempio: row.esempio,
                        }));
                        resolve(patterns);
                    }
                    else {
                        reject(new Error("Pattern not found"));
                    }
                });
            });
        });
    }
}
exports.default = InterfacciaRicerca;
