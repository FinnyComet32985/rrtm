import connection from "../..";
import * as mysql from "mysql";
import nodemailer from "nodemailer";

class Notifica {
    private Id: number;
    private titolo: string;
    private oggetto: string;
    private testo: string;
    private usernameAmm: string;

    constructor(
        Id: number,
        titolo: string,
        oggetto: string,
        testo: string,
        usernameAmm: string
    ) {
        this.Id = Id;
        this.titolo = titolo;
        this.oggetto = oggetto;
        this.testo = testo;
        this.usernameAmm = usernameAmm;
    }
    public async insertDB(): Promise<void> {
        const query =
            "INSERT INTO notifica (Id, titolo, oggetto, testo, usernameAmm) VALUES (?, ?, ?, ?, ?)";
        connection.query(
            query,
            [this.Id, this.titolo, this.oggetto, this.testo, this.usernameAmm],
            (err: mysql.MysqlError | null) => {
                if (err) {
                    console.error("Error inserting into database:", err);
                } else {
                    console.log(
                        "Notification inserted into database successfully."
                    );
                }
            }
        );
    }

    public static async getIdMax(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const query = "SELECT MAX(Id) as idMax FROM notifica";
            connection.query(
                query,
                [],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const idMax = results[0].idMax || 0; // Handle case where there are no entries yet
                        resolve(idMax);
                    } else {
                        reject(new Error("Error"));
                    }
                }
            );
        });
    }

    public static async getNotificaDB(id: number): Promise<Notifica> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM notifica WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const not = new Notifica(
                            results[0].Id,
                            results[0].titolo,
                            results[0].oggetto,
                            results[0].testo,
                            results[0].usernameAmm
                        );
                        resolve(not);
                    } else {
                        reject(new Error(`Notifica not found for id: ${id}`));
                    }
                }
            );
        });
    }

    public async send(): Promise<boolean> {
        try {
            const users = await this.getUsers();
            const emailPromises = users.map(async (user) => {
                try {
                    await this.sendEmail(user.email);
                } catch (error) {
                    console.error(
                        `Error sending email to ${user.email}:`,
                        error
                    );
                    return false;
                }
                return true;
            });

            const results = await Promise.all(emailPromises);
            return results.every((result) => result === true);
        } catch (error) {
            console.error("Error retrieving consenting users:", error);
            return false;
        }
    }

    private getUsers(): Promise<{ email: string }[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT email FROM utente WHERE notPref = true";
            connection.query(
                query,
                [],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });
    }

    private async sendEmail(to: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            //NOSONAR
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "ingegneriarrtm@gmail.com",
                pass: "cgxr avhj irvp mhas",
            },
        });

        const mailOptions = {
            from: "ingegneriarrtm@gmail.com",
            to: to,
            subject: this.oggetto,
            text: this.testo,
            html: `<h1>${this.titolo}</h1><p>${this.testo}</p>`,
        };

        return new Promise<void>((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return reject(error);
                }
                console.log("Email sent: " + info.response);
                resolve();
            });
        });
    }
}

export default Notifica;
