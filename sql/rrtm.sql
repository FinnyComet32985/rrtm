DROP DATABASE IF EXISTS rrtm;
CREATE DATABASE rrtm;
USE rrtm;

/* creazione tabelle madri */
DROP TABLE IF EXISTS pattern;
CREATE TABLE pattern( Id int not null primary key, titolo varchar(100), sommario text, contesto text, problema text, soluzione text, esempio text);
DROP TABLE IF EXISTS strategia;
CREATE TABLE strategia( Id int not null primary key, nome varchar(100));
DROP TABLE IF EXISTS vulnerabilita;
CREATE TABLE vulnerabilita( Id int not null primary key, cwe int, titolo varchar(500), stato varchar(300));
DROP TABLE IF EXISTS articoloGDPR;
CREATE TABLE articoloGDPR( Id int not null primary key, titolo varchar(500));

/* creazione tabelle relazioni */
DROP TABLE IF EXISTS StrategiaPattern;
CREATE TABLE StrategiaPattern (strategiaId int NOT NULL, patternId int NOT NULL,  PRIMARY KEY (strategiaId, patternId), FOREIGN KEY (strategiaId) REFERENCES strategia(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));
DROP TABLE IF EXISTS VulnerabilitaPattern;
CREATE TABLE VulnerabilitaPattern(vulnerabilitaId int not null, patternId int not null , primary key (vulnerabilitaId, patternId), FOREIGN KEY (vulnerabilitaId) REFERENCES vulnerabilita(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));
DROP TABLE IF EXISTS ArticoloPattern;
CREATE TABLE ArticoloPattern(articoloId int not null, patternId int not null , primary key (articoloId, patternId), FOREIGN KEY (articoloId) REFERENCES articoloGDPR(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));


/* inserimento pattern */
INSERT INTO pattern VALUES(1, "Protection against Tracking", "Questo pattern evita il tracciamento dei visitatori dei siti web tramite i cookie. Lo fa cancellandoli a intervalli regolari o disabilitando completamente i cookie.", "Questo modello è applicabile quando le informazioni personali identificabili vengono tracciate tramite strumenti software, protocolli o meccanismi come cookie e simili.", "Con ogni singola interazione nel web lasci impronte e indizi su di te. I cookie, ad esempio, consentono ai server web di raccogliere informazioni sugli utenti web che quindi influiscono sulla loro privacy e anonimato. I fornitori di servizi web tracciano il comportamento degli utenti, il che può portare alla profilazione degli utenti. Inoltre i fornitori possono vendere ad altre società i dati raccolti sugli utenti che visitano le loro pagine.", "Limitare l'utilizzo dei cookie lato client eliminando regolarmente i cookie, ad es. ad ogni avvio del sistema operativo oppure abilitandoli di volta in volta decidendo se il sito visitato è affidabile o meno e accettando un cookie solo per la sessione corrente. Al livello più alto di protezione della privacy i cookie sono disabilitati, ma di conseguenza i servizi web sono limitati. Un'altra soluzione potrebbe essere lo scambio di cookie tra client, in modo che emergano profili utente sofisticati.", "Alice vuole comprare delle scarpe e vuole fare acquisti online. Va in un negozio online e cerca delle scarpe, ma non riesce a decidere quali vuole, quindi non ne compra nessuna. Il giorno successivo trova un paio di email nella sua casella di posta, che le danno suggerimenti per altre scarpe e la avvisano che le scarpe visualizzate sono ora in vendita.");
INSERT INTO pattern VALUES(2, "Strip Invisible Metadata", "Elimina i metadati potenzialmente sensibili che non sono direttamente visibili all'utente finale.", "Quando un servizio richiede che un utente importi dati da fonti esterne (ad esempio immagini, tweet, documenti) possono essere trasmessi diversi tipi di metadati. Gli utenti potrebbero non essere a conoscenza dei metadati in quanto possono essere generati automaticamente o non direttamente visibili. I servizi potrebbero essere inavvertitamente responsabili di esporre metadati privati o di andare contro le aspettative degli utenti.", "Gli utenti non sono sempre pienamente consapevoli dei vari tipi di metadati allegati ai file e alle risorse Web che condividono con i servizi online. Molti di questi dati vengono generati automaticamente o non sono direttamente visibili agli utenti durante le loro interazioni. Ciò può creare situazioni in cui, anche se gli utenti condividono informazioni esplicitamente con i servizi, potrebbero essere sorpresi nel vedere questi dati rivelati. In alcuni casi in cui i dati sono protetti legalmente, il servizio potrebbe essere ritenuto responsabile dell'eventuale fuga di informazioni sensibili. In che modo i servizi che richiedono agli utenti di condividere dati e caricare file dovrebbero trattare i metadati aggiuntivi allegati ai file? In caso di caricamento di documenti e immagini, quali parti dei metadati possono essere trattate come informazioni esplicitamente condivise.", "Eliminare tutti i metadati che non sono direttamente visibili durante il caricamento o durante l'utilizzo del servizio può aiutare a proteggere i servizi da perdite e responsabilità. Anche nei casi in cui le informazioni non sono protette legalmente, il servizio può proteggersi dal sorprendere i propri utenti e quindi alienarli. Inoltre, quando gli utenti condividono i dati con i servizi, può essere presentata loro un'anteprima dei dati ottenuti dal servizio, inclusi eventuali metadati [[Anteprima dati condivisi]]. Ciò consente agli utenti di essere più consapevoli delle informazioni che condividono con i servizi e, in molti casi, con altre entità su Internet.", "Caricamento di immagini su twitter.com Twitter.com rimuove i dati EXIF dalle immagini caricate sul proprio servizio di condivisione di immagini. In precedenza si sono verificate numerose violazioni della posizione personale utilizzando i dati EXIF condivisi dai servizi di condivisione di immagini.");
INSERT INTO pattern VALUES(3, "Added-noise measurement obfuscation", "Aggiungi un po' di rumore alle misurazioni del funzionamento del servizio, ma fai in modo che si annulli da solo a lungo termine", "Un fornitore di servizi ottiene misurazioni continue di un attributo di servizio collegato a un individuo del servizio.", "La fornitura di un servizio può richiedere misurazioni ripetute e dettagliate di un attributo del servizio collegato a un interessato, ad es. fatturarli adeguatamente per l'utilizzo del servizio o adattare il servizio in base al carico della domanda. Tuttavia, queste misurazioni possono rivelare ulteriori informazioni (ad esempio abitudini personali, ecc.) se ripetute nel tempo", "Al valore reale misurato viene aggiunto un valore di rumore prima che questo venga trasmesso al fornitore di servizi, in modo da offuscarlo. Il rumore rispetta una distribuzione precedentemente nota, in modo che sia possibile calcolare la migliore stima del risultato della somma di diverse misurazioni, mentre un avversario non sarebbe in grado di dedurre il valore reale di ogni singola misurazione. Si noti che il rumore non deve necessariamente essere additivo o gaussiano. In effetti, questi potrebbero non essere utili per l’offuscamento orientato alla privacy. Il rumore di ridimensionamento e il rumore laplaciano additivo si sono rivelati più utili per la tutela della privacy. Un fornitore di servizi può ottenere misurazioni affidabili degli attributi del servizio per soddisfare i propri requisiti operativi; tuttavia, dall'aggregazione di più misurazioni provenienti dallo stesso utente non è possibile dedurre alcuna informazione personale aggiuntiva.", "Un'azienda elettrica gestisce una rete di reti intelligenti con contatori intelligenti che forniscono misurazioni del consumo energetico istantaneo di ciascun utente. L'azienda utilizza tali informazioni sia per adattare la distribuzione dell'energia in modo dinamico, in base alla domanda dell'utente in ogni momento, sia per fatturare periodicamente a ciascun cliente, in base al suo consumo aggregato durante il periodo di fatturazione. Tuttavia, queste informazioni possono anche essere sfruttate per dedurre informazioni sensibili dell'utente (ad esempio a che ora esce e torna a casa, ecc.)");


/* inserimento strategie */
INSERT INTO strategia VALUES(1, "Minimize");
INSERT INTO strategia VALUES(2, "Hide");
INSERT INTO strategia VALUES(3, "Abstract");
INSERT INTO strategia VALUES(4, "Inform");
INSERT INTO strategia VALUES(5, "Control");
INSERT INTO strategia VALUES(6, "Enforce");
INSERT INTO strategia VALUES(7, "Separate");

/* inserimento vulnerabilita */
INSERT INTO vulnerabilita VALUES(1, 306, "Missing Authentication for Critical Function", "pubblicata");
INSERT INTO vulnerabilita VALUES(2, 798, "Use of Hard-coded Credentials", "pubblicata");
INSERT INTO vulnerabilita VALUES(3, 287, "Improper Authentication", "pubblicata");
INSERT INTO vulnerabilita VALUES(4, 269, "Improper Privilege Management", "pubblicata");


/* inserimento articoli */
INSERT INTO articoloGDPR VALUES(32, "Security of processing");

/* inserimento StrategiaPattern */
INSERT INTO StrategiaPattern VALUES(1, 1);
INSERT INTO StrategiaPattern VALUES(1, 2);
INSERT INTO StrategiaPattern VALUES(2, 3);
INSERT INTO StrategiaPattern VALUES(3, 3);

/* inserimento VulnerabilitaPattern */
INSERT INTO VulnerabilitaPattern VALUES(1, 1);
INSERT INTO VulnerabilitaPattern VALUES(2, 1);
INSERT INTO VulnerabilitaPattern VALUES(3, 1);
INSERT INTO VulnerabilitaPattern VALUES(4, 2);
INSERT INTO VulnerabilitaPattern VALUES(4, 3);

/* inserimento ArticoloPattern */
INSERT INTO ArticoloPattern VALUES(32, 1);




