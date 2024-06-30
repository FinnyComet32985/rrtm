DROP DATABASE IF EXISTS rrtm;
CREATE DATABASE rrtm;
USE rrtm;

/* creazione tabelle madri */
DROP TABLE IF EXISTS pattern;
CREATE TABLE pattern( Id int not null primary key, titolo varchar(100), sommario text, contesto text, problema text, soluzione text, esempio text);
DROP TABLE IF EXISTS strategia;
CREATE TABLE strategia( Id int not null primary key, nome varchar(100) );
DROP TABLE IF EXISTS articoloGDPR;
CREATE TABLE articoloGDPR( Id int not null primary key, titolo varchar(500));
DROP TABLE IF EXISTS principioPbD;
CREATE TABLE principioPbD( Id int not null primary key, nome varchar(500));
DROP TABLE IF EXISTS collocazioneMVC;
CREATE TABLE collocazioneMVC( Id int not null primary key, nome varchar(500));
DROP TABLE IF EXISTS faseIso;
CREATE TABLE faseIso( Id decimal(10,2) not null primary key, nome varchar(500));
DROP TABLE IF EXISTS categoriaOWASP;
CREATE TABLE categoriaOWASP( Id int not null primary key, nome varchar(500));
DROP TABLE IF EXISTS utente;
CREATE TABLE utente( username VARCHAR(50) NOT NULL PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, nome VARCHAR(50), cognome VARCHAR(50), notPref boolean);
DROP TABLE IF EXISTS amministratore;
CREATE TABLE amministratore( username VARCHAR(50) NOT NULL PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, nome VARCHAR(50), cognome VARCHAR(50));
DROP TABLE IF EXISTS notifica;
CREATE TABLE notifica( Id int not null primary key, titolo varchar(500) not null, oggetto varchar(1000) not null, testo text not null, usernameAmm varchar(50), FOREIGN KEY (usernameAmm) REFERENCES amministratore(username));
DROP TABLE IF EXISTS vulnerabilita;
CREATE TABLE vulnerabilita( Id int not null primary key, cwe int, titolo varchar(500), stato varchar(300), tipo varchar(300), usernameUt varchar(300), usernameAmm varchar(50), FOREIGN KEY (usernameUt) REFERENCES utente(username), FOREIGN KEY (usernameAmm) REFERENCES amministratore(username));
DROP TABLE IF EXISTS feedback;
CREATE TABLE feedback( Id int not null primary key, titolo varchar(500), descrizione text, usernameUt varchar(500), FOREIGN KEY (usernameUt) REFERENCES utente(username));

/* creazione tabelle relazioni */
DROP TABLE IF EXISTS StrategiaPattern;
CREATE TABLE StrategiaPattern (strategiaId int NOT NULL, patternId int NOT NULL,  PRIMARY KEY (strategiaId, patternId), FOREIGN KEY (strategiaId) REFERENCES strategia(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));
DROP TABLE IF EXISTS VulnerabilitaPattern;
CREATE TABLE VulnerabilitaPattern(vulnerabilitaId int not null, patternId int not null , primary key (vulnerabilitaId, patternId), FOREIGN KEY (vulnerabilitaId) REFERENCES vulnerabilita(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));
DROP TABLE IF EXISTS ArticoloPattern;
CREATE TABLE ArticoloPattern(articoloId int not null, patternId int not null , primary key (articoloId, patternId), FOREIGN KEY (articoloId) REFERENCES articoloGDPR(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));
DROP TABLE IF EXISTS ArticoloStrategia;
CREATE TABLE ArticoloStrategia(articoloId int not null, strategiaId int not null , primary key (articoloId, strategiaId), FOREIGN KEY (articoloId) REFERENCES articoloGDPR(Id), FOREIGN KEY (strategiaId) REFERENCES strategia(Id));
DROP TABLE IF EXISTS ArticoloVulnerabilita;
CREATE TABLE ArticoloVulnerabilita(articoloId int not null, vulnerabilitaId int not null , primary key (articoloId, vulnerabilitaId), FOREIGN KEY (articoloId) REFERENCES articoloGDPR(Id), FOREIGN KEY (vulnerabilitaId) REFERENCES vulnerabilita(Id));
DROP TABLE IF EXISTS PbdStrategia;
CREATE TABLE PbdStrategia(PbdId int not null, strategiaId int not null , primary key (PbdId, strategiaId), FOREIGN KEY (PbdId) REFERENCES principioPbD(Id), FOREIGN KEY (strategiaId) REFERENCES strategia(Id));
DROP TABLE IF EXISTS PbdPattern;
CREATE TABLE PbdPattern(PbdId int not null, patternId int not null , primary key (PbdId, patternId), FOREIGN KEY (PbdId) REFERENCES principioPbD(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));
DROP TABLE IF EXISTS MvcPattern;
CREATE TABLE MvcPattern(MvcId int not null, patternId int not null , primary key (MvcId, patternId), FOREIGN KEY (MvcId) REFERENCES collocazioneMVC(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));
DROP TABLE IF EXISTS IsoMvc;
CREATE TABLE IsoMvc(IsoId decimal(10,2) not null, MvcId int not null , primary key (IsoId, MvcId), FOREIGN KEY (IsoId) REFERENCES faseIso(Id), FOREIGN KEY (MvcId) REFERENCES collocazioneMVC(Id));
DROP TABLE IF EXISTS IsoPattern;
CREATE TABLE IsoPattern(IsoId decimal(10,2) not null, patternId int not null , primary key (IsoId, patternId), FOREIGN KEY (IsoId) REFERENCES faseIso(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));
DROP TABLE IF EXISTS PbdIso;
CREATE TABLE PbdIso(PbdId int not null, IsoId decimal(10,2) not null , primary key (PbdId, IsoId), FOREIGN KEY (IsoId) REFERENCES faseIso(Id), FOREIGN KEY (PbdId) REFERENCES principioPbD(Id));
DROP TABLE IF EXISTS OwaspPattern;
CREATE TABLE OwaspPattern(OwaspId int not null, patternId int not null , primary key (OwaspId, patternId), FOREIGN KEY (OwaspId) REFERENCES categoriaOWASP(Id), FOREIGN KEY (patternId) REFERENCES pattern(Id));


/* inserimento pattern */
INSERT INTO pattern VALUES(1, "Protection against Tracking", "Questo pattern evita il tracciamento dei visitatori dei siti web tramite i cookie. Lo fa cancellandoli a intervalli regolari o disabilitando completamente i cookie.", "Questo modello è applicabile quando le informazioni personali identificabili vengono tracciate tramite strumenti software, protocolli o meccanismi come cookie e simili.", "Con ogni singola interazione nel web lasci impronte e indizi su di te. I cookie, ad esempio, consentono ai server web di raccogliere informazioni sugli utenti web che quindi influiscono sulla loro privacy e anonimato. I fornitori di servizi web tracciano il comportamento degli utenti, il che può portare alla profilazione degli utenti. Inoltre i fornitori possono vendere ad altre società i dati raccolti sugli utenti che visitano le loro pagine.", "Limitare l'utilizzo dei cookie lato client eliminando regolarmente i cookie, ad es. ad ogni avvio del sistema operativo oppure abilitandoli di volta in volta decidendo se il sito visitato è affidabile o meno e accettando un cookie solo per la sessione corrente. Al livello più alto di protezione della privacy i cookie sono disabilitati, ma di conseguenza i servizi web sono limitati. Un'altra soluzione potrebbe essere lo scambio di cookie tra client, in modo che emergano profili utente sofisticati.", "Alice vuole comprare delle scarpe e vuole fare acquisti online. Va in un negozio online e cerca delle scarpe, ma non riesce a decidere quali vuole, quindi non ne compra nessuna. Il giorno successivo trova un paio di email nella sua casella di posta, che le danno suggerimenti per altre scarpe e la avvisano che le scarpe visualizzate sono ora in vendita.");
INSERT INTO pattern VALUES(2, "Strip Invisible Metadata", "Elimina i metadati potenzialmente sensibili che non sono direttamente visibili all'utente finale.", "Quando un servizio richiede che un utente importi dati da fonti esterne (ad esempio immagini, tweet, documenti) possono essere trasmessi diversi tipi di metadati. Gli utenti potrebbero non essere a conoscenza dei metadati in quanto possono essere generati automaticamente o non direttamente visibili. I servizi potrebbero essere inavvertitamente responsabili di esporre metadati privati o di andare contro le aspettative degli utenti.", "Gli utenti non sono sempre pienamente consapevoli dei vari tipi di metadati allegati ai file e alle risorse Web che condividono con i servizi online. Molti di questi dati vengono generati automaticamente o non sono direttamente visibili agli utenti durante le loro interazioni. Ciò può creare situazioni in cui, anche se gli utenti condividono informazioni esplicitamente con i servizi, potrebbero essere sorpresi nel vedere questi dati rivelati. In alcuni casi in cui i dati sono protetti legalmente, il servizio potrebbe essere ritenuto responsabile dell'eventuale fuga di informazioni sensibili. In che modo i servizi che richiedono agli utenti di condividere dati e caricare file dovrebbero trattare i metadati aggiuntivi allegati ai file? In caso di caricamento di documenti e immagini, quali parti dei metadati possono essere trattate come informazioni esplicitamente condivise.", "Eliminare tutti i metadati che non sono direttamente visibili durante il caricamento o durante l'utilizzo del servizio può aiutare a proteggere i servizi da perdite e responsabilità. Anche nei casi in cui le informazioni non sono protette legalmente, il servizio può proteggersi dal sorprendere i propri utenti e quindi alienarli. Inoltre, quando gli utenti condividono i dati con i servizi, può essere presentata loro un'anteprima dei dati ottenuti dal servizio, inclusi eventuali metadati [[Anteprima dati condivisi]]. Ciò consente agli utenti di essere più consapevoli delle informazioni che condividono con i servizi e, in molti casi, con altre entità su Internet.", "Caricamento di immagini su twitter.com Twitter.com rimuove i dati EXIF dalle immagini caricate sul proprio servizio di condivisione di immagini. In precedenza si sono verificate numerose violazioni della posizione personale utilizzando i dati EXIF condivisi dai servizi di condivisione di immagini.");
INSERT INTO pattern VALUES(3, "Added-noise measurement obfuscation", "Aggiungi un po' di rumore alle misurazioni del funzionamento del servizio, ma fai in modo che si annulli da solo a lungo termine", "Un fornitore di servizi ottiene misurazioni continue di un attributo di servizio collegato a un individuo del servizio.", "La fornitura di un servizio può richiedere misurazioni ripetute e dettagliate di un attributo del servizio collegato a un interessato, ad es. fatturarli adeguatamente per l'utilizzo del servizio o adattare il servizio in base al carico della domanda. Tuttavia, queste misurazioni possono rivelare ulteriori informazioni (ad esempio abitudini personali, ecc.) se ripetute nel tempo", "Al valore reale misurato viene aggiunto un valore di rumore prima che questo venga trasmesso al fornitore di servizi, in modo da offuscarlo. Il rumore rispetta una distribuzione precedentemente nota, in modo che sia possibile calcolare la migliore stima del risultato della somma di diverse misurazioni, mentre un avversario non sarebbe in grado di dedurre il valore reale di ogni singola misurazione. Si noti che il rumore non deve necessariamente essere additivo o gaussiano. In effetti, questi potrebbero non essere utili per l’offuscamento orientato alla privacy. Il rumore di ridimensionamento e il rumore laplaciano additivo si sono rivelati più utili per la tutela della privacy. Un fornitore di servizi può ottenere misurazioni affidabili degli attributi del servizio per soddisfare i propri requisiti operativi; tuttavia, dall'aggregazione di più misurazioni provenienti dallo stesso utente non è possibile dedurre alcuna informazione personale aggiuntiva.", "Un'azienda elettrica gestisce una rete di reti intelligenti con contatori intelligenti che forniscono misurazioni del consumo energetico istantaneo di ciascun utente. L'azienda utilizza tali informazioni sia per adattare la distribuzione dell'energia in modo dinamico, in base alla domanda dell'utente in ogni momento, sia per fatturare periodicamente a ciascun cliente, in base al suo consumo aggregato durante il periodo di fatturazione. Tuttavia, queste informazioni possono anche essere sfruttate per dedurre informazioni sensibili dell'utente (ad esempio a che ora esce e torna a casa, ecc.)");
INSERT INTO pattern VALUES(4, "Data Breach Notification Pattern", "I gestori dei servizi (o prodotti) forniti agli utenti raccolgono enormi quantità di dati, in gran parte personali, per migliorare la qualità e l'esperienza dell'utente di tale servizio. Tutto ciò deve avvenire con il consenso informato dell’utente, che deve comprendere correttamente i rischi associati ai propri dati. Uno di questi rischi è quello dell’accesso, della modifica, della rimozione o della condivisione non autorizzata dei dati. Se si verifica una violazione dei dati, è necessaria la notifica. Qualsiasi titolare del trattamento dei dati all'interno dell'UE (o che fornisce servizi o prodotti all'interno dell'UE) deve informare l'autorità di controllo del suo stabilimento principale o rappresentante. La notifica deve essere effettuata entro 72 ore, salvo giustificazione. La notifica agli utenti dipende dal fatto che siano sufficientemente preoccupati.", "I titolari dei servizi (o prodotti) forniti agli utenti raccolgono grandi quantità di dati, molti dei quali personali, per migliorare la qualità e l'esperienza dell'utente di tale servizio. Tutto questo deve essere fatto con il consenso informato dell'utente, che dovrebbe comprendere adeguatamente i rischi connessi ai propri dati. Uno di questi rischi è quello dell’accesso, della modifica, della rimozione o della condivisione non autorizzata dei dati. Se si verifica una tale violazione dei dati, è necessaria la notifica. Qualsiasi titolare del trattamento all'interno dell'UE (o che fornisce servizi o prodotti all'interno) deve informare l'autorità di controllo del proprio stabilimento principale o rappresentante. Ciò deve avvenire entro 72 ore, salvo giustificazione. La notifica agli utenti dipende dal fatto che siano sufficientemente colpiti.", "Quando si verificano violazioni dei dati, numerosi rischi diventano evidenti per più parti, queste parti devono essere informate e i rischi devono essere mitigati. I casi successivi dovrebbero essere prevenuti attraverso le lezioni apprese.. Forze e preoccupazioni. Gli utenti vogliono sapere se è successo qualcosa che ha compromesso i loro dati, la loro sicurezza o la loro privacy .Gli utenti desiderano che il titolare del trattamento riduca i rischi prima e dopo una violazione al meglio delle loro capacità .I controllori vogliono evitare che i rischi si materializzino e adottare misure contro le violazioni future. I titolari del trattamento vogliono inoltre evitare che gli utenti subiscano conseguenze derivanti dalla violazione o che ne ignorino la violazione", "Individuare e reagire rapidamente alle violazioni dei dati, comunicando all’autorità di controllo i dettagli, in particolare la mitigazione del rischio, al fine di stabilire se anche gli utenti debbano essere informati. La corretta gestione di questi eventi rafforzerà la fiducia degli utenti anziché indebolirla.", "Supponiamo che una [azienda] memorizzi i dati di tutti i dipendenti [attraverso il servizio di un responsabile del trattamento]. Esiste un accordo contrattuale tra [loro] secondo cui ogni fuga di dati viene segnalata entro un'ora. Ora Bob, dipendente [del titolare del trattamento] e non autorizzato a leggere i dati [dell'azienda], riesce ad aggirare [i] meccanismi di controllo degli accessi e legge i dati [personali]. Ciò rappresenta una violazione dei dati di cui [l’azienda] deve essere informata entro un’ora.");
INSERT INTO pattern VALUES(
5, 
"Unusual Activities", 
"Prevenire l'accesso sospetto ai dati dell'utente tramite avvisi ed eseguire l'autenticazione attraverso più fattori in caso di potenziale compromissione dell'account.", 
"I servizi (o prodotti), in particolare su Internet, tendono a utilizzare l'autenticazione basata su nome utente e password. Questo meccanismo di sicurezza si rivela più conveniente per gli utenti, poiché è comune e semplice rispetto alle alternative più sicure. Tuttavia è anche soggetto a carenze comuni. Le password diventano meno sicure quanto più a lungo rimangono invariate, sono spesso vulnerabili alla forza bruta, allo snooping e agli attacchi di phishing e non è possibile dimostrare che siano detenute esclusivamente dall'utente. Ciò complica la certezza dell'autenticazione, e quindi l'autenticità di qualsiasi decisione presa dall'utente, compreso il consenso. I titolari del trattamento possono tuttavia ricavare anche fattori aggiuntivi, come il dispositivo o l'accesso a informazioni specifiche. Se viene fornita la posizione, ad esempio, potrebbe suggerire un'improbabile attività dell'account.",
"La sola autenticazione del nome utente e della password ha un'affidabilità variabile nel dimostrare le decisioni prese da un utente, soprattutto quando riguardano azioni più sensibili. I titolari del trattamento devono aumentare la loro certezza che qualsiasi consenso fornito sia legittimo.",
"Analizzare le informazioni disponibili per le quali esiste il consenso per stabilire una norma di accesso. Testarlo rispetto ad accessi futuri per identificare attività insolite. Quando ciò si verifica, avvisa l'utente e utilizza l'autenticazione a più fattori ristabilendo la certezza. L'utente autenticato dovrebbe essere in grado di rivedere e intraprendere ulteriori azioni.", 
"Gmail visualizza informazioni su altre sessioni (se presenti) nel piè di pagina, collegandosi a una pagina denominata ""Attività su questo account"" che elenca altre sessioni e attività recenti sull'account Gmail. L'utente ha la possibilità di disconnettersi da altre sessioni. In caso di fastidiosi falsi positivi, l'utente può scegliere di disattivare l'avviso per attività insolite. La disattivazione richiede circa una settimana, ""per essere sicuri che non siano i cattivi a disattivare i tuoi avvisi""."
);
INSERT INTO pattern VALUES (
6, 
"Minimal Information Asymmetry", 
"Impedire che gli utenti siano svantaggiati dalla loro mancanza di familiarità con le politiche, i potenziali rischi e la loro agenzia all'interno del trattamento.",
"Questo modello è applicabile quando le informazioni personali identificabili vengono tracciate tramite strumenti software, protocolli o meccanismi come cookie e simili.",
"Con ogni singola interazione nel web lasci impronte e indizi su di te. I cookie, ad esempio, consentono ai server web di raccogliere informazioni sugli utenti web che quindi influiscono sulla loro privacy e anonimato. I fornitori di servizi web tracciano il comportamento degli utenti, il che può portare alla profilazione degli utenti. Inoltre i fornitori possono vendere ad altre società i dati raccolti sugli utenti che visitano le loro pagine.",
"Limitare l'utilizzo dei cookie lato client cancellando regolarmente i cookie, ad esempio ad ogni avvio del sistema operativo, o abilitandoli caso per caso decidendo se il sito web visitato è affidabile o meno e accettando un cookie solo per la sessione corrente. Al livello più alto di protezione della privacy i cookie sono disabilitati, ma di conseguenza i servizi web sono limitati. Un'altra soluzione potrebbe essere lo scambio di cookie tra client, in modo che emergano profili utente sofisticati.",
"Alice vuole comprare delle scarpe e vuole fare acquisti online. Va in un negozio online e cerca delle scarpe, ma non riesce a decidere quali vuole, quindi non ne compra nessuna. Il giorno successivo trova un paio di email nella sua casella di posta, che le danno suggerimenti per altre scarpe e la avvisano che le scarpe visualizzate sono ora in vendita."
);

INSERT INTO pattern VALUES (
7, 
"Onion Routing", 
"Questo modello garantisce la non tracciabilità tra mittenti e destinatari incapsulando i dati in diversi strati di crittografia, limitando la conoscenza di ciascun nodo lungo il percorso di consegna.",
"Un sistema in cui i dati vengono instradati tra diversi nodi.7",
"Quando si consegnano i dati, il destinatario deve essere conosciuto. Se il sistema fornisce la funzionalità a cui il destinatario dei dati dovrebbe essere in grado di rispondere, allora il destinatario dovrebbe conoscere anche l'indirizzo del mittente. Quando si inoltrano informazioni su più stazioni, in un'implementazione ingenua, ciascuna stazione sul percorso di consegna conosce il mittente e la destinazione finale.",
"La soluzione è crittografare i dati a strati in modo tale che ogni stazione lungo il percorso possa rimuovere un livello di crittografia e così conoscere la stazione immediatamente successiva. In questo modo tutti coloro che si trovano nel percorso dal mittente al destinatario conoscono solo l'immediato successore e predecessore nel percorso di consegna.",
"Alice è una informatore e cerca di inoltrare i dati a Bob che lavora alla stampa. Invia i documenti corrispondenti come allegato di posta elettronica. Eve monitora il traffico e può vedere chi ha inviato questa mail a chi. Il giorno successivo, la polizia fa irruzione nell'appartamento di Alice e la manda in prigione. L'account di posta di Bob viene sequestrato."
);

INSERT INTO pattern VALUES (
8, 
"Encryption with user-managed keys", 
"Utilizzare la crittografia in modo tale che il fornitore di servizi non possa decrittare le informazioni dell'utente perché l'utente gestisce le chiavi.",
"L'utente desidera archiviare o trasferire i propri dati personali tramite un servizio online e desidera proteggere la propria privacy, e in particolare la riservatezza delle proprie informazioni personali. I rischi di accesso non autorizzato possono includere lo stesso fornitore di servizi online o terze parti come i suoi partner, ad esempio per il backup, o la sorveglianza governativa a seconda delle aree geografiche in cui i dati vengono archiviati o trasferiti.",
"Come può un utente archiviare o trasferire le proprie informazioni personali tramite un servizio online garantendo al tempo stesso la propria privacy e impedendo specificamente l'accesso non autorizzato alle proprie informazioni personali? Richiedere all'utente di eseguire la gestione della chiave di crittografia potrebbe infastidirlo o confonderlo e potrebbe tornare a nessuna crittografia o alla crittografia con il fornitore di servizi online che gestisce la chiave di crittografia (non offrendo alcuna protezione da parte dello specifico fornitore di servizi online che gestisce la chiave), scegliendo un chiave di crittografia debole, riutilizzata, scritta e così via. Potrebbe essere necessario che alcuni metadati rimangano non crittografati per supportare il fornitore di servizi online o funzioni di terze parti, ad esempio nomi di file per l'archiviazione nel cloud o informazioni di instradamento per applicazioni di trasferimento, esponendo i metadati a rischi di accesso non autorizzato, indicizzazione lato server per la ricerca o decrittografia -duplicazione. Se il fornitore di servizi ha scritto il software lato client che esegue la crittografia lato client con una chiave di crittografia gestita dall'utente, potrebbero esserci ulteriori dubbi riguardo al fatto che il software client sia sicuro o manomesso in modi che possano compromettere la privacy.",
"Crittografia delle informazioni personali dell'utente prima di memorizzarle o trasferirle tramite un servizio online. In questa soluzione l'utente deve generare una chiave di crittografia avanzata e gestirla autonomamente, mantenendola privata e sconosciuta al servizio online non affidabile o a terze parti.",
"Backup, sincronizzazione e condivisione online che consentono la gestione delle informazioni personali da parte dell'utente in un ambiente di privacy a conoscenza zero."
);

INSERT INTO pattern VALUES (
9, 
"Use of dummies", 
"Questo modello nasconde le azioni compiute da un utente aggiungendo azioni false indistinguibili da quelle reali.",
"Questo modello è applicabile quando non è possibile evitare di eseguire, ritardare o offuscare il contenuto di un'azione.",
"Quando gli utenti interagiscono con i sistemi ICT, le loro azioni rivelano molte informazioni su loro stessi. Un'opzione potrebbe essere che gli utenti non eseguano tali azioni per proteggere la propria privacy. Ciò però non è possibile in quanto gli utenti non possono evitare del tutto di eseguire queste azioni perché necessitano di eseguirle per raggiungere un obiettivo (es. cercare una parola su Internet, inviare una email, cercare una località).",
"Poiché l'azione deve essere eseguita accuratamente, un'opzione per garantire la privacy è quella di eseguire simultaneamente altre azioni in modo tale che l'avversario non possa distinguere le azioni reali da quelle false (spesso chiamate fittizie).",
"Alice vuole cercare una clinica per aborti su Google, ma non vuole rivelare le sue intenzioni di abortire a un avversario che potrebbe intercettare questa ricerca (ad esempio, fornitore di servizi ISP, amministratore di sistema del suo posto di lavoro, ecc.)."
);

INSERT INTO pattern VALUES (
10, 
"Federated Privacy Impact Assessment", 
"L'impatto delle informazioni personali in una federazione è maggiore dell'impatto nella federata.",
"Scenari di gestione delle identità (ovvero quando i ruoli del provider di identità e del fornitore di servizi sono separati).",
"Sono state introdotte soluzioni di gestione dell'identità per disaccoppiare le funzioni relative all'autenticazione, all'autorizzazione e alla gestione degli attributi dell'utente, da un lato, e alla fornitura di servizi dall'altro. La gestione federata delle identità consente di archiviare l'identità di un interessato su diversi sistemi. Tutti insieme formano una Federazione che coinvolge flussi di dati complessi. Le soluzioni di gestione federata possono essere utilizzate per migliorare la privacy (ad esempio consentendo ai fornitori di servizi di offrire i propri servizi senza conoscere l'identità dei propri utenti). Tuttavia, la complessità dei flussi di dati e la possibilità di collusione tra soggetti diversi comportano nuovi rischi e minacce per quanto riguarda i dati personali.",
"Una valutazione dell'impatto sulla privacy viene condotta da tutti i membri della federazione, sia individualmente che congiuntamente, in modo da definire politiche sulla privacy condivise, dimostrarne il rispetto e dimostrare l'idoneità dell'architettura, a vantaggio di tutti i membri.",
"Un provider di identità rilascia pseudonimi per autenticare gli utenti presso fornitori di servizi di terze parti, che a loro volta possono verificare l'autenticità di questi pseudonimi presso il provider di identità, senza conoscere la reale identità dell'utente. Tuttavia, l'Identity Provider conosce tutti i servizi richiesti dagli utenti, il che rivela le informazioni personali all'Identity Provider e gli consente di profilare gli utenti."
);

INSERT INTO pattern VALUES (
11, 
"Obligation Management", 
"Il modello consente di trasferire e gestire le obbligazioni relative alla condivisione, archiviazione e trattamento dei dati quando i dati vengono condivisi tra più parti.",
"Lo sviluppatore mira a garantire che più parti siano consapevoli e rispettino le politiche utente/organizzative richieste poiché i dati personali e sensibili vengono successivamente condivisi tra una serie di parti che archiviano o elaborano tali dati.",
"I dati possono essere accessibili o gestiti da più parti che condividono i dati con un'organizzazione in modi che potrebbero non essere approvati dall'interessato.",
"I fornitori di servizi utilizzano un sistema di gestione degli obblighi. La gestione degli obblighi gestisce la gestione del ciclo di vita delle informazioni in base alle preferenze individuali e alle politiche organizzative. Il sistema di gestione degli obblighi manipola i dati nel tempo, garantendo la minimizzazione, la cancellazione e la notifica degli stessi agli interessati.",
"Un fornitore di servizi subappalta i servizi, ma richiede che i dati vengano cancellati dopo un certo tempo e che il fornitore di servizi richieda di essere informato in caso di ulteriore subappalto."
);

INSERT INTO pattern VALUES (
12, 
"Sticky Policies", 
"Le politiche leggibili dalla macchina sono associate ai dati per definire l'uso consentito e le obbligazioni man mano che viaggiano attraverso più parti, consentendo agli utenti di migliorare il controllo sulle loro informazioni personali.",
"Più parti sono consapevoli e agiscono secondo una determinata politica quando i dati sensibili alla privacy vengono trasmessi alle molteplici parti successive che archiviano, elaborano e condividono tali dati.",
"I dati possono essere accessibili o gestiti da più parti che condividono i dati con un'organizzazione in modi che potrebbero non essere approvati dall'interessato.",
"I fornitori di servizi utilizzano un sistema di gestione degli obblighi. La gestione degli obblighi gestisce la gestione del ciclo di vita delle informazioni in base alle preferenze individuali e alle politiche organizzative. Il sistema di gestione degli obblighi manipola i dati nel tempo, garantendo la minimizzazione, la cancellazione e la notifica degli stessi agli interessati.",
"Quando i dati vengono condivisi da un'organizzazione, questa può utilizzare la politica di preservazione della privacy per imporre il rispetto della privacy dell'utente da parte di organizzazioni terze che utilizzano, elaborano e archiviano tali dati. Ad esempio, un ospedale può condividere dati con organizzazioni terze che richiedono il rispetto di specifiche politiche sulla privacy associate ai dati."
);

INSERT INTO pattern VALUES (
13, 
"Personal Data Store", 
"I soggetti mantengono il controllo sui loro dati personali che sono archiviati su un dispositivo personale.",
"Il modello è applicabile a tutti i dati prodotti dall'interessato (o originariamente sotto il suo controllo) in contrapposizione ai dati che lo riguardano prodotti da terzi.",
"Gli interessati perdono effettivamente il controllo sui propri dati quando questi vengono archiviati su un server gestito da terzi.",
"Una soluzione consiste nel combinare un server centrale e token personali sicuri. I token personali, che possono assumere la forma di chiavi USB, incorporano un sistema di database, un server web locale e un certificato per la loro autenticazione da parte del server centrale. Gli interessati possono decidere lo stato dei propri dati e, a seconda del proprio livello di sensibilità, scegliere di registrarli esclusivamente sul proprio token personale oppure di farli replicare sul server centrale. La replica sul server centrale è utile per migliorare la sostenibilità e per consentire a terzi designati (ad esempio operatori sanitari) di accedere ai dati.",
"I pazienti vogliono mantenere il controllo sui propri dati sanitari ma anche garantire un accesso specifico ad alcuni operatori sanitari."
);

INSERT INTO pattern VALUES (
14, 
"User data confinement pattern", 
"Evitare la raccolta centralizzata di dati personali spostando una parte del trattamento dei dati personali agli ambienti di fiducia dell'utente (es. i propri dispositivi). Consentire agli utenti di controllare i dati esatti che condividono con i fornitori di servizi.",
"Questo modello può essere utilizzato ogniqualvolta la raccolta di dati personali con uno scopo specifico e legittimo rappresenti ancora un livello rilevante di minaccia per la privacy degli utenti",
"Il processo di ingegneria è orientato a sviluppare architetture incentrate sul sistema in cui i dati vengono raccolti ed elaborati in singole entità centrali, costringendo gli utenti a fidarsi di loro e a condividere dati personali potenzialmente sensibili",
"La soluzione è spostare il rapporto di fiducia, nel senso che invece di avere il cliente che si fida del servizio fornito per proteggere i propri dati personali, il fornitore di servizi deve ora fidarsi dell'elaborazione dei clienti. Nell'esempio del contatore intelligente, il contatore intelligente riceverà la tariffa mensile e calcolerà la fattura del cliente che verrà poi inviata al fornitore di energia dove verrà elaborata. Il vantaggio principale è che in nessun momento i dati personali hanno lasciato l’ambiente fidato degli utenti.",
"La rete intelligente è un campo con un chiaro esempio: avere contatori intelligenti che forniscono al fornitore di energia il consumo energetico orario dei clienti rappresenta una seria minaccia per la privacy dei clienti."
);

INSERT INTO pattern VALUES (
15, 
"Anonymous Reputation-based Blacklisting", 
"Eliminare i disturbatori senza nemmeno sapere chi sono.",
"Un fornitore di servizi fornisce un servizio agli utenti che accedono in modo anonimo e che potrebbero fare un cattivo uso del servizio.",
"L’anonimato è una proprietà desiderabile dal punto di vista della privacy. Tuttavia, l’anonimato può favorire comportamenti scorretti, poiché gli utenti non temono ritorsioni. Un fornitore di servizi può assegnare un punteggio di reputazione ai propri utenti, in base alle loro interazioni con il servizio. Coloro che si comportano male si guadagnano una cattiva reputazione e alla fine vengono aggiunti a una lista nera e gli viene vietato di utilizzare più il servizio. Tuttavia, questi sistemi di punteggio richiedono tradizionalmente che l’identità dell’utente venga rivelata e collegata al suo punteggio di reputazione, quindi sono in conflitto con l’anonimato. Ciò ha portato, ad esempio, gli amministratori di Wikipedia a prendere la decisione di vietare le richieste di edizione provenienti dalla rete TOR, poiché non possono identificare correttamente gli utenti che si comportano male. Una terza parte fidata (TTP) potrebbe essere introdotta tra l'utente e il fornitore di servizi. Il TTP può ricevere punteggi di reputazione dal fornitore di servizi in modo da applicare politiche di accesso basate sulla reputazione, mantenendo l'identità nascosta al fornitore di servizi. Tuttavia, ciò richiederebbe che l’utente abbia fiducia che il TTP non sia effettivamente un informatore.",
"Innanzitutto, il fornitore di servizi fornisce ai propri utenti credenziali per l'autenticazione anonima. Quindi, ogni volta che un utente autenticato tiene una sessione al servizio, il fornitore di servizi assegna e registra un valore di reputazione per quella sessione, a seconda del comportamento dell'utente durante la sessione. Tieni presente che questi valori di reputazione possono essere collegati solo a una sessione specifica, ma non a un utente specifico (poiché si sono autenticati in modo anonimo). Quando l'utente torna e avvia una nuova sessione al servizio, il fornitore di servizi sfida l'utente a dimostrare a conoscenza zero di non essere collegato a nessuna delle sessioni incriminate (quelle a cui è associata una reputazione negativa). Le prove a conoscenza zero consentono all'utente di dimostrarlo, senza rivelare la propria identità al fornitore di servizi. Sono state proposte diverse prove alternative, ad esempio dimostrare che l'utente non è collegato a nessuna delle sessioni in un insieme di ID di sessione, dimostrare che le ultime K sessioni dell'utente hanno una buona reputazione, ecc. In pratica possono essere applicate anche regole di blacklist più complesse. Ad esempio, è possibile assegnare più punteggi di reputazione alla stessa sessione, ciascuno relativo a diversi aspetti del comportamento dell'utente. Quindi, le soglie della lista nera possono assumere la forma di una combinazione booleana o di una combinazione lineare sui valori di reputazione delle singole sessioni e delle faccette.",
"Un wiki consente a qualsiasi visitatore di modificarne i contenuti, anche senza essersi autenticato. Alcuni visitatori malintenzionati potrebbero vandalizzare i contenuti. Questo fatto è segnalato dagli amministratori del wiki. Se un visitatore proveniente dallo stesso indirizzo IP continua ad vandalizzare il sito, si guadagnerà una cattiva reputazione e al suo IP non sarà più consentito modificare i contenuti. Tuttavia, gli utenti che accedono tramite un proxy di rete di anonimato Tor non possono essere identificati dai loro IP e quindi la loro reputazione non può essere tracciata."
);

INSERT INTO pattern VALUES (
16, 
"Location Granularity", 
"Supportare la minimizzazione della raccolta e distribuzione dei dati. Importante quando un servizio raccoglie dati sulla posizione da o su un utente, o trasmette dati sulla posizione di un utente a una terza parte.",
"Quando un servizio raccoglie dati sulla posizione da o su un utente o trasmette dati sulla posizione di un utente a terze parti.",
"Molti servizi basati sulla posizione raccolgono informazioni sulla posizione corrente o continua di un utente al fine di fornire alcuni servizi contestuali (bar più vicino, meteo locale, ecc.). La raccolta di più informazioni del necessario può danneggiare la privacy dell'utente e aumentare il rischio per il servizio (in caso di violazione della sicurezza, ad esempio), ma potrebbe comunque essere necessario raccogliere dati sulla posizione per fornire il servizio. Allo stesso modo, gli utenti potrebbero desiderare i vantaggi di condividere la propria posizione dal tuo servizio con gli amici o con qualche altro servizio, ma la condivisione di informazioni molto precise comporta un rischio molto maggiore per gli utenti (di reidentificazione, stalking, intrusione fisica, ecc.). Accettare o trasmettere dati sulla posizione a diversi livelli di granularità richiede generalmente una gerarchia di posizione o un'ontologia geografica concordata da entrambi i servizi e un modello di archiviazione dei dati più complesso rispetto alle semplici coordinate digitali. Troncare le coordinate di latitudine e longitudine a un certo numero di cifre decimali può diminuire la precisione, ma generalmente non è considerato un buon algoritmo di fuzzing. (Ad esempio, se un utente si muove in linea retta e aggiorna regolarmente la propria posizione, le informazioni sulla posizione troncate riveleranno occasionalmente la posizione precisa quando l'utente attraversa un confine lat/lon.) Allo stesso modo, utilizzando ""città"" anziché lat/lon potrebbe occasionalmente rivelano dati più precisi del previsto quando l'utente attraversa un confine tra due città.",
"Poiché molti dati geografici hanno intrinsecamente diversi livelli di precisione (vedi ontologie geografiche , ad esempio) - come strade, città, contea, stato, paese - potrebbero esserci divisioni naturali nella precisione dei dati sulla posizione. Raccogliendo o distribuendo solo il livello di granularità necessario, un servizio può essere in grado di mantenere la stessa funzionalità senza richiedere o distribuire dati potenzialmente sensibili. Un sito meteorologico locale può accedere solo al codice postale dell'utente per fornire informazioni meteorologiche pertinenti senza mai accedere a informazioni precise (e quindi sensibili) sulla posizione.",
"Wikipedia consente a qualsiasi visitatore di modificarne i contenuti, anche senza essersi autenticato. Alcuni visitatori malintenzionati potrebbero vandalizzare i contenuti. Se un visitatore proveniente dallo stesso indirizzo IP continua a vandalizzare il sito, si guadagnerà una cattiva reputazione e al suo IP non sarà più consentito modificare i contenuti (tuttavia, gli utenti che accedono tramite un proxy della rete di anonimato Tor non possono essere identificati dai loro IP, e quindi la loro reputazione non può essere monitorata)."
);

INSERT INTO pattern VALUES (
17, 
"Discouraging blanket strategies", 
"Dare agli utenti la possibilità di definire un livello di privacy tra una gamma di opzioni ogni volta che condividono contenuti.",
"I servizi socialmente orientati su Internet consentono alla loro base di utenti, spesso diversificata, di condividere contenuti. Queste masse di utenti e contenuti condivisi sono anche sufficientemente varie da scoraggiare l’attenzione individuale. I titolari del trattamento preferiscono proteggersi da ulteriore complessità e investimenti in funzionalità che forniscono loro meno dati. Gli utenti, tuttavia, sentono il bisogno di impostazioni sulla privacy per distinguere la loro propensione al rischio personale da quella normale. Ognuno di loro ha le proprie idee sulla sensibilità delle proprie informazioni, il che rende difficile implementare controlli sufficienti.",
"Impostazioni sulla privacy eccessivamente semplificate che seguono strategie tutto o niente potrebbero comportare sovraesposizione, autocensura e utenti insoddisfatti.",
"Fornire agli utenti la possibilità di definire un livello di privacy per i contenuti condivisi con il controller o con altri utenti. Offri loro una gamma di visibilità, in modo che possano decidere il livello di accesso del contenuto condiviso in base ai diversi utenti o ai gruppi definiti dal servizio.",
"Su Facebook, prima di pubblicare un post, è possibile impostare uno dei tre livelli di privacy del post che possono essere ""Tutti"", ""Solo Amici"", ""Privato"". Nel primo caso il post può essere visto da qualsiasi utente Facebook, nel secondo caso il post può essere visto solo dagli amici dell'utente del post, infine, nell'ultimo caso il post non è visibile a nessuno tranne che al proprietario."
);

INSERT INTO pattern VALUES (
18, 
"Reciprocity", 
"Consentire agli utenti di beneficiare in base ai contributi che fanno.",
"Nei servizi in cui gli utenti possono contribuire socialmente o in modo collaborativo, la partecipazione può costituire il fondamento del modello di business del servizio. In queste situazioni la qualità e la frequenza dei contenuti influiscono sul successo del servizio e quindi gli utenti hanno un grande impatto sulla sua sopravvivenza. Il fatto che un singolo utente contribuisca o meno gioca un ruolo nella redditività, il che mette il controllore nella posizione di incoraggiare o imporre una partecipazione paritaria. Gli utenti potrebbero tuttavia rispondere negativamente a tali idee, soprattutto se non vedono potenziali guadagni degni del loro impegno e rischi personali per la privacy.",
"Non sempre la parità di partecipazione si traduce in uguali ricompense. In alcuni casi, i partecipanti non hanno bisogno di contribuire affatto per beneficiare del contenuto generato dal gruppo. Chiunque si senta offeso probabilmente contribuirà di meno, mettendo a repentaglio i risultati del gruppo.",
"Limitare i benefici ottenuti dallo sforzo di gruppo alla quantità di sforzo apportato. A tutti i contributi dovrebbero essere concessi guadagni proporzionati.",
null
);

INSERT INTO pattern VALUES (
19, 
"Incentivized Participation", 
"Gli utenti sono più disposti a contribuire con input preziosi quando possono farlo senza divulgare dati personali, o percepiscono uno scambio di valore uguale o superiore, sia monetario che sociale.",
"Un titolare del trattamento trae diversi valori dalla partecipazione dei suoi utenti (ovvero gli interessati). Quanto più questi utenti partecipano, fornendo esplicitamente il contesto e fornendo implicitamente metadati (ad esempio statistiche e telemetria), tanto migliore sarà il controllore sotto diversi aspetti. Nonostante questa relazione chiave, la condivisione eccessiva può violare notevolmente il diritto alla privacy dell'utente. Molti titolari del trattamento mirano quindi a rispettare questo diritto quando traggono vantaggio dalle interazioni degli utenti. Poiché il titolare del trattamento dovrebbe riconoscere la necessità di un consenso legittimo specifico, informato e liberamente prestato , gli utenti sono informati delle insidie ​​​​di un tale sistema. Man mano che vengono informati, magari attraverso una combinazione di Privacy Dashboard o Awareness Feed , gli utenti possono bilanciare i compromessi relativi alla privacy. Ciò riduce al minimo i rischi per la privacy assunti in base alle scelte personali informate dell'utente e protegge il responsabile del trattamento dal compromettere inavvertitamente la privacy dell'utente. Il titolare del trattamento, tuttavia, desidera comunque la partecipazione e può quindi fare ulteriori concessioni o disposizioni per contribuire a rendere il compromesso utile o inesistente. A tal fine, il titolare del trattamento può integrare la propria strategia con una scelta più granulare, ad esempio con la divulgazione selettiva e l'interruzione selettiva .",
"I controllori che traggono vantaggio dall’attività degli utenti vogliono spingere per la partecipazione, ma ciò può influire negativamente sugli utenti. Gli utenti hanno diversi gradi di preoccupazione per la propria privacy e non rispondono allo stesso modo alle diverse forme di incoraggiamento. Penalizzando la scarsa condivisione e l'inattività, o essendo fuorvianti, gli utenti si alienano e diffidano del sistema. In quanto tale, questo problema ha molteplici elementi. Questi includono rendimenti asimmetrici sugli investimenti e la carenza di incentivi standard, in cui gli utenti non sono incoraggiati a partecipare.",
"Le preoccupazioni relative alla privacy devono essere soddisfatte con valide rassicurazioni sulle questioni che interessano all'utente. In primo luogo, gli utenti dovrebbero sapere che il sistema tiene in grande considerazione le loro preferenze. In secondo luogo, dovrebbero percepire un valore reale nella loro partecipazione. Infine, se lo si desidera, gli utenti dovrebbero essere assistiti in una transizione graduale nell’ecosistema.",
null
);

INSERT INTO pattern VALUES (
20, 
"Outsourcing [with consent]", 
"Il titolare deve ottenere un ulteriore consenso specifico, informato, esplicito e liberamente dato prima di esternalizzare il trattamento dei dati a una terza parte.",
"I titolari del trattamento spesso non hanno i mezzi per trattare in modo fattibile o sufficiente i dati che supervisionano nella misura in cui desiderano. In questi casi cercano un processore esterno o una terza parte per gestire il processo. Ciò in genere è in conflitto con il consenso già ottenuto dai loro utenti (i loro interessati), poiché l'ulteriore trattamento da parte di terzi non è necessariamente compatibile con gli scopi concordati. In queste situazioni il titolare del trattamento non ha ottenuto legalmente il consenso per questo trattamento e sarà responsabile se lo effettua.",
"I responsabili del trattamento di terze parti non hanno il consenso dell'utente concesso a un responsabile del trattamento, ma necessitano del consenso di ciascun utente prima di poter elaborare le proprie informazioni. Il responsabile del trattamento non può contattare gli utenti necessari poiché non hanno accesso legale ad alcun mezzo per identificarli.",
"Ottenere ulteriore (Legittimo Consenso)[Legittimo-Consenso] per le finalità specifiche necessarie da ciascun utente prima di consentire a terzi di trattare i propri dati. Non trattare i dati degli utenti che non acconsentono. Il consenso può essere visto come un contratto che stabilisce quali e come i dati saranno trattati dalla [terza parte]. Il [responsabile del trattamento] deve inoltre garantire, preferibilmente mediante un accordo scritto, che il [terzo] rispetti rigorosamente tutte le condizioni relative al trattamento dei dati che gli sono state imposte.",
"Lo scenario descritto da Compagna et al. (2007) presenta un Centro sanitario (responsabile del trattamento dei dati) e un utente (interessato), Bob, che necessita di una supervisione costante. Il subappaltatore, un fornitore di reti di sensori (fornitore di terze parti), installa e mantiene la rete responsabile del monitoraggio automatizzato della salute di Bob. Questo subappaltatore necessita di un ulteriore consenso specifico, informato, esplicito e liberamente concesso da Bob."
);

INSERT INTO pattern VALUES (
21, 
"Sign an Agreement to Solve Lack of Trust on the Use of Private Data Context", 
"I servizi di un titolare possono richiedere agli utenti di firmare contratti che stipulano i loro obblighi e le finalità di trattamento per cui gli utenti devono acconsentire per utilizzare il servizio. Questo garantisce che gli utenti possano fidarsi del titolare poiché è vincolato al contratto che firma.",
"Gli utenti non si fidano intrinsecamente dei titolari del trattamento che forniscono servizi (o prodotti), poiché non hanno garanzie su quali siano le vere intenzioni del titolare del trattamento o del responsabile del trattamento. I titolari e i responsabili del trattamento in genere mirano a realizzare profitti, ma ciò potrebbe andare a discapito degli utenti se questi non considerano le loro esigenze di privacy. Il titolare del trattamento potrebbe avere valori predefiniti o livelli di controllo ragionevoli , ma anche gli utenti devono sentirsi rassicurati sul fatto che le loro scelte vengono rispettate. Ciò è particolarmente vero per ciò per cui forniscono o non forniscono il consenso legale.",
"Il titolare del trattamento non gode necessariamente della fiducia dei suoi utenti e ha bisogno di questa fiducia affinché i suoi servizi possano elaborare i loro dati.",
"Il servizio dovrebbe fornire all'utente un accordo contrattuale (contenente un'informativa sulla privacy) che vincoli il responsabile del trattamento alla sua parola, a condizione che l'utente acconsenta al trattamento dei dati necessari per scopi specifici. L'accordo dovrebbe vincolare anche qualsiasi rappresentante del titolare del trattamento. Dovrebbe essere abbastanza semplice e chiaro da poter essere compreso dall'utente.",
null
);

INSERT INTO pattern VALUES (
22, 
"Pseudonymous Messaging", 
"Un servizio di messaggistica è migliorato utilizzando una terza parte di fiducia per scambiare gli identificatori dei partner di comunicazione tramite pseudonimi.",
"Questo modello può essere utilizzato per le comunicazioni online tramite posta elettronica, tramite bacheche e newsgroup.",
"La messaggistica include tutte le forme di comunicazione tramite e-mail, articoli, bacheche, newsgroup ecc. Queste informazioni potrebbero essere archiviate e utilizzate per creare profili utente sofisticati. A volte può essere utilizzato anche per perseguire le persone.",
"Un messaggio viene inviato da un utente al server, che scambia l'indirizzo del mittente con uno pseudonimo. I messaggi con risposta vengono rispediti all'indirizzo pseudonimo, che verrà poi ripristinato all'originale.",
"Alice è un'attivista politica e cerca di organizzare una manifestazione politica. Dato che al suo governo non piace la libertà di parola, i suoi canali di comunicazione sono intensamente monitorati e un giorno semplicemente scompare in un campo di lavoro e non viene mai più vista."
);

INSERT INTO pattern VALUES (
23, 
"Pseudonymous Identity", 
"Nascondere l'identità utilizzando uno pseudonimo e garantire un'identità pseudonima che non possa essere collegata a un'identità reale durante le interazioni online.",
"Questo modello può essere utilizzato per i sistemi in cui gli utenti vengono identificati tramite identità pubbliche.",
"Molti tipi di informazioni sensibili vengono rilasciate attraverso interazioni web, e-mail, condivisione di dati o sistemi basati sulla posizione, che possono contenere il nome di un utente o informazioni di intestazione nei pacchetti. Un altro problema potrebbe essere quello di interagire in modo anonimo in un forum. Tuttavia, un'interazione eccessiva in un forum con un'identità anonima può essere pericolosa, nel senso che la relazione tra l'identità originale e un'identità pseudonima può essere esposta.3",
"Avvia uno pseudonimo casuale, che non può essere correlato all'originale, in modo che l'identità sia nascosta. Inoltre uno pseudonimo dipende dall'occultamento, quindi l'assegnazione dello pseudonimo necessita di protezione.",
"Supponiamo che alcuni studenti stiano scrivendo un esame e debbano compilare un modulo sulla loro identità, dove c'è un campo facoltativo per uno pseudonimo scelto. In questo modo il risultato può essere diffuso con gli pseudonimi scelti e l'identità di ogni studente viene nascosta. Ma essendo attenti, alcuni studenti potrebbero essere in grado di capire quale identità appartiene a quale pseudonimo e quindi la riservatezza dell’identità è compromessa."
);

INSERT INTO pattern VALUES (
24, 
"Aggregation Gateway", 
"Crittografare, aggregare e decrittografare in luoghi diversi.",
"Un fornitore di servizi ottiene misurazioni continue di un attributo del servizio collegato a un insieme di singoli utenti del servizio.",
"La fornitura di un servizio può richiedere misurazioni dettagliate di un attributo del servizio collegato a un interessato per adattare il funzionamento del servizio in ogni momento in base al carico della domanda. Tuttavia, queste misurazioni possono rivelare ulteriori informazioni (es. abitudini personali, ecc.) se ripetute nel tempo.",
"È possibile aggiungere un sistema di dosaggio dell'alimentatore come asta di misurazione che introduce un confronto per ciascun gruppo di contatori. Lasciare che il fornitore del servizio abbia accesso affidabile al carico aggregato in ogni momento, in modo da soddisfare le proprie esigenze operative, senza consentirgli di accedere al carico individuale richiesto da ogni specifico utente del servizio.",
"Un'azienda elettrica gestisce una rete di reti intelligenti con contatori intelligenti che forniscono misurazioni del consumo energetico istantaneo di ciascun utente. L'azienda utilizza queste informazioni per adattare la distribuzione dell'energia in modo dinamico, in base alla domanda dell'utente in ogni momento."
);

INSERT INTO pattern VALUES (
25, 
"Informed Secure Passwords", 
"Garantire che gli utenti mantengano abitudini di autenticazione sane attraverso la consapevolezza e la comprensione.",
"Le credenziali sono richieste da numerosi servizi (e prodotti) per garantire che solo gli utenti autenticati e autorizzati abbiano accesso a determinate funzionalità. I controllori in genere forniscono meccanismi di autenticazione sotto forma di nomi utente e password. Sebbene forniscano una forma di sicurezza debole se utilizzati in modo errato, sono più convenienti per gli utenti rispetto a molte alternative meno popolari e più sicure. I controllori spesso cercano di aggirare le carenze delle password incoraggiando gli utenti a cambiarle frequentemente, a utilizzare varianti più forti, a controllarle e a impedirne la divulgazione e il riutilizzo. Tuttavia gli utenti utilizzano molti servizi e utilizzano molte password, scoraggiando così una corretta applicazione. Questa applicazione errata può comportare l'accesso ai dati personali da parte di persone non autorizzate.",
"Gli utenti devono mantenere regolarmente molte password complesse, ricordarle e proteggerle, ma non sono ben attrezzati per farlo. Quindi, invece, molti scelgono quelli deboli e li riutilizzano.",
"Fornire agli utenti assistenza nella comprensione e nel mantenimento di password complesse che siano più facili da ricordare.",
"Strongpasswordgenerator.com fornisce spiegazioni sugli approcci all'avanguardia per proteggere le password in modo facile da usare per i non addetti ai lavori e aiuta a generarle."
);

/* inserimento strategie */
INSERT INTO strategia VALUES(1, "Minimize");
INSERT INTO strategia VALUES(2, "Hide");
INSERT INTO strategia VALUES(3, "Abstract");
INSERT INTO strategia VALUES(4, "Inform");
INSERT INTO strategia VALUES(5, "Control");
INSERT INTO strategia VALUES(6, "Enforce");
INSERT INTO strategia VALUES(7, "Separate");

/* inserimento vulnerabilita */
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(1, 306, "Missing Authentication for Critical Function", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(2, 798, "Use of Hard-coded Credentials", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(3, 287, "Improper Authentication", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(4, 269, "Improper Privilege Management", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(5, 434, "Unrestricted Upload of File with Dangerous Type", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(6, 502, "Deserialization of Untrusted Data", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(7, 22, "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(8, 862, "Missing Authorization", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(9, 863, "Incorrect Authorization", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(10, 276, "Incorrect Default Permissions", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(11, 20, "Improper Input Validation", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(12, 79, "Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(13, 89, "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(14, 78, "Improper Neutralization of Special Elements used in an OS Command ('OS Command Injection')", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(15, 77, "Improper Neutralization of Special Elements used in a Command ('Command Injection')", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(16, 94, "Improper Control of Generation of Code ('Code Injection')", "pubblicata", "inserita");
INSERT INTO vulnerabilita(Id, cwe, titolo, stato, tipo) VALUES(17, 918, "Server-Side Request Forgery (SSRF)", "pubblicata", "inserita");

/* inserimento articoli */
INSERT INTO articoloGDPR VALUES(32, "Security of processing");
INSERT INTO articoloGDPR VALUES(25, "Data protection by design and by default");
INSERT INTO articoloGDPR VALUES(5, "Principles relating to processing of personal data");
INSERT INTO articoloGDPR VALUES(33, "Notification of a personal data breach to the supervisory authority");
INSERT INTO articoloGDPR VALUES(34, "Communication of a personal data breach to the data subject");
INSERT INTO articoloGDPR VALUES(12, "Transparent information, communication and modalities for the exercise of the rights of the data subject");
INSERT INTO articoloGDPR VALUES(35, "Data protection impact assessment");
INSERT INTO articoloGDPR VALUES(28, "Processor");
INSERT INTO articoloGDPR VALUES(13, "Information to be provided where personal data are collected from the data subject");
INSERT INTO articoloGDPR VALUES(6, "Lawfulness of processing");
INSERT INTO articoloGDPR VALUES(7, "Conditions for consent");

/* inseriemento principiPbD */
INSERT INTO principioPbD VALUES(1, "Privacy as the default setting");
INSERT INTO principioPbD VALUES(2, "Privacy Embedded into Design");
INSERT INTO principioPbD VALUES(3, "Visibility and Transparency");
INSERT INTO principioPbD VALUES(4, "Proactive not Reactive");
INSERT INTO principioPbD VALUES(5, "Respect for User Privacy");
INSERT INTO principioPbD VALUES(6, "End-to-End Security");
INSERT INTO principioPbD VALUES(7, "Full Functionality");

/* Inserimento MVC */ 
INSERT INTO collocazioneMVC VALUES(1, "Model");
INSERT INTO collocazioneMVC VALUES(2, "View");
INSERT INTO collocazioneMVC VALUES(3, "Controller");

/* Inserimento ISO */ 
INSERT INTO faseIso VALUES(7.4, "Producing design solutions");
INSERT INTO faseIso VALUES(7.3, "Specify the requirements");
INSERT INTO faseIso VALUES(7.2, "Understanding and specifying the context of use");
INSERT INTO faseIso VALUES(7.5, "Evaluating the design");
INSERT INTO faseIso VALUES(6, "Plan the human-centered design process");

/* Inserimento OWASP */ 
INSERT INTO categoriaOWASP VALUES(1, "Broken Access Control");
INSERT INTO categoriaOWASP VALUES(2, "Cryptographic Failures");
INSERT INTO categoriaOWASP VALUES(3, "Injection");
INSERT INTO categoriaOWASP VALUES(4, "Insecure Design");
INSERT INTO categoriaOWASP VALUES(5, "Security Misconfiguration");
INSERT INTO categoriaOWASP VALUES(6, "Vulnerable and Outdated Components");
INSERT INTO categoriaOWASP VALUES(7, "Identification and Authentication Failures");
INSERT INTO categoriaOWASP VALUES(8, "Software and Data Integrity Failures");
INSERT INTO categoriaOWASP VALUES(9, "Security Logging and Monitoring Failures");
INSERT INTO categoriaOWASP VALUES(10, "Server-Side Request Forgery (SSRF)");

/* Inserimento relazioni */
/* inserimento StrategiaPattern */
INSERT INTO StrategiaPattern VALUES(1, 1);
INSERT INTO StrategiaPattern VALUES(1, 2);
INSERT INTO StrategiaPattern VALUES(2, 3);
INSERT INTO StrategiaPattern VALUES(3, 3);
INSERT INTO StrategiaPattern VALUES(4, 4);
INSERT INTO StrategiaPattern VALUES(4, 5);
INSERT INTO StrategiaPattern VALUES(4, 6);
INSERT INTO StrategiaPattern VALUES(2, 7);
INSERT INTO StrategiaPattern VALUES(2, 8);
INSERT INTO StrategiaPattern VALUES(5, 8);
INSERT INTO StrategiaPattern VALUES(2, 9);
INSERT INTO StrategiaPattern VALUES(6, 10);
INSERT INTO StrategiaPattern VALUES(6, 11);
INSERT INTO StrategiaPattern VALUES(6, 12);
INSERT INTO StrategiaPattern VALUES(5, 13);
INSERT INTO StrategiaPattern VALUES(7, 13);
INSERT INTO StrategiaPattern VALUES(7, 14);
INSERT INTO StrategiaPattern VALUES(7, 15);
INSERT INTO StrategiaPattern VALUES(2, 15);
INSERT INTO StrategiaPattern VALUES(3, 16);
INSERT INTO StrategiaPattern VALUES(5, 17);
INSERT INTO StrategiaPattern VALUES(5, 18);
INSERT INTO StrategiaPattern VALUES(5, 19);
INSERT INTO StrategiaPattern VALUES(5, 20);
INSERT INTO StrategiaPattern VALUES(5, 21);
INSERT INTO StrategiaPattern VALUES(2, 22);
INSERT INTO StrategiaPattern VALUES(2, 23);
INSERT INTO StrategiaPattern VALUES(2, 24);
INSERT INTO StrategiaPattern VALUES(4, 25);

/* inserimento VulnerabilitaPattern */
INSERT INTO VulnerabilitaPattern VALUES(1, 1);
INSERT INTO VulnerabilitaPattern VALUES(2, 1);
INSERT INTO VulnerabilitaPattern VALUES(3, 1);
INSERT INTO VulnerabilitaPattern VALUES(4, 2);
INSERT INTO VulnerabilitaPattern VALUES(5, 2);
INSERT INTO VulnerabilitaPattern VALUES(4, 3);
INSERT INTO VulnerabilitaPattern VALUES(5, 3);
INSERT INTO VulnerabilitaPattern VALUES(1, 3);
INSERT INTO VulnerabilitaPattern VALUES(2, 3);
INSERT INTO VulnerabilitaPattern VALUES(3, 3);
INSERT INTO VulnerabilitaPattern VALUES(6, 4);
INSERT INTO VulnerabilitaPattern VALUES(7, 5);
INSERT INTO VulnerabilitaPattern VALUES(8, 5);
INSERT INTO VulnerabilitaPattern VALUES(9, 5);
INSERT INTO VulnerabilitaPattern VALUES(10, 5);
INSERT INTO VulnerabilitaPattern VALUES(1, 5);
INSERT INTO VulnerabilitaPattern VALUES(2, 5);
INSERT INTO VulnerabilitaPattern VALUES(3, 5);
INSERT INTO VulnerabilitaPattern VALUES(4, 6);
INSERT INTO VulnerabilitaPattern VALUES(5, 6);
INSERT INTO VulnerabilitaPattern VALUES(4, 7);
INSERT INTO VulnerabilitaPattern VALUES(5, 7);
INSERT INTO VulnerabilitaPattern VALUES(1, 7);
INSERT INTO VulnerabilitaPattern VALUES(2, 7);
INSERT INTO VulnerabilitaPattern VALUES(3, 7);
INSERT INTO VulnerabilitaPattern VALUES(6, 7);
INSERT INTO VulnerabilitaPattern VALUES(4, 8);
INSERT INTO VulnerabilitaPattern VALUES(5, 8);
INSERT INTO VulnerabilitaPattern VALUES(7, 9);
INSERT INTO VulnerabilitaPattern VALUES(8, 9);
INSERT INTO VulnerabilitaPattern VALUES(9, 9);
INSERT INTO VulnerabilitaPattern VALUES(10, 9);
INSERT INTO VulnerabilitaPattern VALUES(11, 9);
INSERT INTO VulnerabilitaPattern VALUES(12, 9);
INSERT INTO VulnerabilitaPattern VALUES(13, 9);
INSERT INTO VulnerabilitaPattern VALUES(14, 9);
INSERT INTO VulnerabilitaPattern VALUES(15, 9);
INSERT INTO VulnerabilitaPattern VALUES(16, 9);
INSERT INTO VulnerabilitaPattern VALUES(1, 9);
INSERT INTO VulnerabilitaPattern VALUES(2, 9);
INSERT INTO VulnerabilitaPattern VALUES(3, 9);
INSERT INTO VulnerabilitaPattern VALUES(17, 9);
INSERT INTO VulnerabilitaPattern VALUES(7, 10);
INSERT INTO VulnerabilitaPattern VALUES(8, 10);
INSERT INTO VulnerabilitaPattern VALUES(9, 10);
INSERT INTO VulnerabilitaPattern VALUES(10, 10);
INSERT INTO VulnerabilitaPattern VALUES(1, 10);
INSERT INTO VulnerabilitaPattern VALUES(2, 10);
INSERT INTO VulnerabilitaPattern VALUES(3, 10);
INSERT INTO VulnerabilitaPattern VALUES(1, 11);
INSERT INTO VulnerabilitaPattern VALUES(2, 11);
INSERT INTO VulnerabilitaPattern VALUES(3, 11);
INSERT INTO VulnerabilitaPattern VALUES(6, 11);
INSERT INTO VulnerabilitaPattern VALUES(1, 12);
INSERT INTO VulnerabilitaPattern VALUES(2, 12);
INSERT INTO VulnerabilitaPattern VALUES(3, 12);
INSERT INTO VulnerabilitaPattern VALUES(6, 12);
INSERT INTO VulnerabilitaPattern VALUES(6, 13);
INSERT INTO VulnerabilitaPattern VALUES(7, 14);
INSERT INTO VulnerabilitaPattern VALUES(8, 14);
INSERT INTO VulnerabilitaPattern VALUES(9, 14);
INSERT INTO VulnerabilitaPattern VALUES(10, 14);
INSERT INTO VulnerabilitaPattern VALUES(1, 14);
INSERT INTO VulnerabilitaPattern VALUES(2, 14);
INSERT INTO VulnerabilitaPattern VALUES(3, 14);
INSERT INTO VulnerabilitaPattern VALUES(1, 15);
INSERT INTO VulnerabilitaPattern VALUES(2, 15);
INSERT INTO VulnerabilitaPattern VALUES(3, 15);
INSERT INTO VulnerabilitaPattern VALUES(7, 16);
INSERT INTO VulnerabilitaPattern VALUES(8, 16);
INSERT INTO VulnerabilitaPattern VALUES(9, 16);
INSERT INTO VulnerabilitaPattern VALUES(10, 16);
INSERT INTO VulnerabilitaPattern VALUES(4, 17);
INSERT INTO VulnerabilitaPattern VALUES(5, 17);
INSERT INTO VulnerabilitaPattern VALUES(1, 17);
INSERT INTO VulnerabilitaPattern VALUES(2, 17);
INSERT INTO VulnerabilitaPattern VALUES(3, 17);
INSERT INTO VulnerabilitaPattern VALUES(17, 18);
INSERT INTO VulnerabilitaPattern VALUES(6, 19);
INSERT INTO VulnerabilitaPattern VALUES(1, 20);
INSERT INTO VulnerabilitaPattern VALUES(2, 20);
INSERT INTO VulnerabilitaPattern VALUES(3, 20);
INSERT INTO VulnerabilitaPattern VALUES(6, 20);
INSERT INTO VulnerabilitaPattern VALUES(7, 21);
INSERT INTO VulnerabilitaPattern VALUES(8, 21);
INSERT INTO VulnerabilitaPattern VALUES(9, 21);
INSERT INTO VulnerabilitaPattern VALUES(10, 21);
INSERT INTO VulnerabilitaPattern VALUES(11, 21);
INSERT INTO VulnerabilitaPattern VALUES(12, 21);
INSERT INTO VulnerabilitaPattern VALUES(13, 21);
INSERT INTO VulnerabilitaPattern VALUES(14, 21);
INSERT INTO VulnerabilitaPattern VALUES(15, 21);
INSERT INTO VulnerabilitaPattern VALUES(16, 21);
INSERT INTO VulnerabilitaPattern VALUES(1, 21);
INSERT INTO VulnerabilitaPattern VALUES(2, 21);
INSERT INTO VulnerabilitaPattern VALUES(3, 21);
INSERT INTO VulnerabilitaPattern VALUES(17, 21);
INSERT INTO VulnerabilitaPattern VALUES(7, 22);
INSERT INTO VulnerabilitaPattern VALUES(8, 22);
INSERT INTO VulnerabilitaPattern VALUES(9, 22);
INSERT INTO VulnerabilitaPattern VALUES(10, 22);
INSERT INTO VulnerabilitaPattern VALUES(6, 22);
INSERT INTO VulnerabilitaPattern VALUES(1, 23);
INSERT INTO VulnerabilitaPattern VALUES(2, 23);
INSERT INTO VulnerabilitaPattern VALUES(3, 23);
INSERT INTO VulnerabilitaPattern VALUES(6, 24);
INSERT INTO VulnerabilitaPattern VALUES(11, 25);
INSERT INTO VulnerabilitaPattern VALUES(12, 25);
INSERT INTO VulnerabilitaPattern VALUES(13, 25);
INSERT INTO VulnerabilitaPattern VALUES(14, 25);
INSERT INTO VulnerabilitaPattern VALUES(15, 25);
INSERT INTO VulnerabilitaPattern VALUES(16, 25);

/* inserimento ArticoloPattern */
INSERT INTO ArticoloPattern VALUES(32, 1);
INSERT INTO ArticoloPattern VALUES(25, 2);
INSERT INTO ArticoloPattern VALUES(5, 2);
INSERT INTO ArticoloPattern VALUES(32, 3);
INSERT INTO ArticoloPattern VALUES(33, 4);
INSERT INTO ArticoloPattern VALUES(34, 4);
INSERT INTO ArticoloPattern VALUES(32, 5);
INSERT INTO ArticoloPattern VALUES(25, 6);
INSERT INTO ArticoloPattern VALUES(12, 6);
INSERT INTO ArticoloPattern VALUES(25, 7);
INSERT INTO ArticoloPattern VALUES(32, 7);
INSERT INTO ArticoloPattern VALUES(25, 8);
INSERT INTO ArticoloPattern VALUES(32, 9);
INSERT INTO ArticoloPattern VALUES(35, 10);
INSERT INTO ArticoloPattern VALUES(28, 11);
INSERT INTO ArticoloPattern VALUES(25, 12);
INSERT INTO ArticoloPattern VALUES(32, 12);
INSERT INTO ArticoloPattern VALUES(25, 13);
INSERT INTO ArticoloPattern VALUES(32, 14);
INSERT INTO ArticoloPattern VALUES(32, 15);
INSERT INTO ArticoloPattern VALUES(5, 16);
INSERT INTO ArticoloPattern VALUES(25, 16);
INSERT INTO ArticoloPattern VALUES(12, 17);
INSERT INTO ArticoloPattern VALUES(5, 19);
INSERT INTO ArticoloPattern VALUES(13, 20);
INSERT INTO ArticoloPattern VALUES(6, 21);
INSERT INTO ArticoloPattern VALUES(7, 21);
INSERT INTO ArticoloPattern VALUES(32, 22);
INSERT INTO ArticoloPattern VALUES(25, 23);
INSERT INTO ArticoloPattern VALUES(32, 23);
INSERT INTO ArticoloPattern VALUES(32, 24);
INSERT INTO ArticoloPattern VALUES(25, 25);

/* inserimento ArticoloStrategia */ 
INSERT INTO ArticoloStrategia VALUES(32, 1); -- Minimize
INSERT INTO ArticoloStrategia VALUES(32, 5); -- Control
INSERT INTO ArticoloStrategia VALUES(32, 6); -- Enforce
INSERT INTO ArticoloStrategia VALUES(32, 7); -- Separate
INSERT INTO ArticoloStrategia VALUES(25, 1); -- Minimize
INSERT INTO ArticoloStrategia VALUES(25, 3); -- Abstract
INSERT INTO ArticoloStrategia VALUES(25, 4); -- Inform
INSERT INTO ArticoloStrategia VALUES(33, 5); -- Control
INSERT INTO ArticoloStrategia VALUES(34, 5); -- Control
INSERT INTO ArticoloStrategia VALUES(12, 3); -- Abstract
INSERT INTO ArticoloStrategia VALUES(35, 2); -- Hide
INSERT INTO ArticoloStrategia VALUES(28, 6); -- Enforce
INSERT INTO ArticoloStrategia VALUES(13, 4); -- Inform
INSERT INTO ArticoloStrategia VALUES(6, 6); -- Enforce
INSERT INTO ArticoloStrategia VALUES(5, 1); -- Minimize
INSERT INTO ArticoloStrategia VALUES(7, 2); -- Hide 

/* inserimento ArticoloVulnerabilita */
INSERT INTO ArticoloVulnerabilita VALUES(32, 1); -- CWE-306: Missing Authentication for Critical Function
INSERT INTO ArticoloVulnerabilita VALUES(32, 2); -- CWE-798: Use of Hard-coded Credentials
INSERT INTO ArticoloVulnerabilita VALUES(32, 3); -- CWE-287: Improper Authentication
INSERT INTO ArticoloVulnerabilita VALUES(25, 16); -- CWE-5: Principles relating to processing of personal data
INSERT INTO ArticoloVulnerabilita VALUES(25, 11); -- CWE-28: Processor
INSERT INTO ArticoloVulnerabilita VALUES(33, 4); -- CWE-502: Deserialization of Untrusted Data
INSERT INTO ArticoloVulnerabilita VALUES(34, 4); -- CWE-502: Deserialization of Untrusted Data
INSERT INTO ArticoloVulnerabilita VALUES(12, 17); -- CWE-12: Transparent information, communication and modalities for the exercise of the rights of the data subject
INSERT INTO ArticoloVulnerabilita VALUES(35, 10); -- CWE-35: Data protection impact assessment
INSERT INTO ArticoloVulnerabilita VALUES(28, 11); -- CWE-28: Processor
INSERT INTO ArticoloVulnerabilita VALUES(13, 11); -- CWE-20: Improper Input Validation
INSERT INTO ArticoloVulnerabilita VALUES(6, 7); -- CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')
INSERT INTO ArticoloVulnerabilita VALUES(6, 8);  -- CWE-862: Missing Authorization
INSERT INTO ArticoloVulnerabilita VALUES(5, 16); -- CWE-5: Principles relating to processing of personal data

/* insermento PbDStrategia */
INSERT INTO PbDStrategia VALUES(1, 1);
INSERT INTO PbDStrategia VALUES(2, 1);
INSERT INTO PbDStrategia VALUES(3, 1);
INSERT INTO PbDStrategia VALUES(4, 1);
INSERT INTO PbDStrategia VALUES(5, 1);
INSERT INTO PbDStrategia VALUES(3, 2);
INSERT INTO PbDStrategia VALUES(2, 2);
INSERT INTO PbDStrategia VALUES(4, 3);
INSERT INTO PbDStrategia VALUES(5, 3);
INSERT INTO PbDStrategia VALUES(6, 3);
INSERT INTO PbDStrategia VALUES(5, 4);
INSERT INTO PbDStrategia VALUES(6, 4);
INSERT INTO PbDStrategia VALUES(2, 4);
INSERT INTO PbDStrategia VALUES(7, 5);
INSERT INTO PbDStrategia VALUES(6, 5);
INSERT INTO PbDStrategia VALUES(4, 5);
INSERT INTO PbDStrategia VALUES(1, 5);
INSERT INTO PbDStrategia VALUES(2, 5);
INSERT INTO PbDStrategia VALUES(3, 5);
INSERT INTO PbDStrategia VALUES(1, 6);
INSERT INTO PbDStrategia VALUES(5, 6);
INSERT INTO PbDStrategia VALUES(7, 6);
INSERT INTO PbDStrategia VALUES(2, 7);
INSERT INTO PbDStrategia VALUES(7, 7);

/* inserimento MVC Pattern */
INSERT INTO MvcPattern VALUES(1, 1);
INSERT INTO MvcPattern VALUES(2, 1);
INSERT INTO MvcPattern VALUES(3, 1);
INSERT INTO MvcPattern VALUES(1, 2);
INSERT INTO MvcPattern VALUES(3, 2);
INSERT INTO MvcPattern VALUES(1, 3);
INSERT INTO MvcPattern VALUES(3, 4);
INSERT INTO MvcPattern VALUES(1, 4);
INSERT INTO MvcPattern VALUES(3, 5);
INSERT INTO MvcPattern VALUES(1, 6);
INSERT INTO MvcPattern VALUES(3, 7);
INSERT INTO MvcPattern VALUES(1, 8);
INSERT INTO MvcPattern VALUES(3, 9);
INSERT INTO MvcPattern VALUES(1, 10);
INSERT INTO MvcPattern VALUES(1, 11);
INSERT INTO MvcPattern VALUES(3, 11);
INSERT INTO MvcPattern VALUES(1, 12);
INSERT INTO MvcPattern VALUES(1, 13);
INSERT INTO MvcPattern VALUES(3, 14);
INSERT INTO MvcPattern VALUES(1, 15);
INSERT INTO MvcPattern VALUES(1, 16);
INSERT INTO MvcPattern VALUES(3, 16);
INSERT INTO MvcPattern VALUES(2, 17);
INSERT INTO MvcPattern VALUES(3, 17);
INSERT INTO MvcPattern VALUES(3, 18);
INSERT INTO MvcPattern VALUES(1, 19);
INSERT INTO MvcPattern VALUES(3, 19);
INSERT INTO MvcPattern VALUES(1, 20);
INSERT INTO MvcPattern VALUES(3, 20);
INSERT INTO MvcPattern VALUES(1, 21);
INSERT INTO MvcPattern VALUES(3, 21);
INSERT INTO MvcPattern VALUES(1, 22);
INSERT INTO MvcPattern VALUES(1, 23);
INSERT INTO MvcPattern VALUES(3, 23);
INSERT INTO MvcPattern VALUES(1, 24);
INSERT INTO MvcPattern VALUES(3, 24);
INSERT INTO MvcPattern VALUES(2, 25);
INSERT INTO MvcPattern VALUES(3, 25);

/* insetrimento ISO MVC */ 
INSERT INTO IsoMvc VALUES(7.4, 1);
INSERT INTO IsoMvc VALUES(7.4, 2);
INSERT INTO IsoMvc VALUES(7.4, 3);
INSERT INTO IsoMvc VALUES(7.3, 1);
INSERT INTO IsoMvc VALUES(7.2, 1);
INSERT INTO IsoMvc VALUES(7.2, 3);
INSERT INTO IsoMvc VALUES(7.5, 1);
INSERT INTO IsoMvc VALUES(6.0, 1);

/* inserimento PbDPattern */ 
INSERT INTO PbDPattern VALUES(1, 1);
INSERT INTO PbDPattern VALUES(2, 1);
INSERT INTO PbDPattern VALUES(3, 1);
INSERT INTO PbDPattern VALUES(4, 1);
INSERT INTO PbDPattern VALUES(2, 2);
INSERT INTO PbDPattern VALUES(3, 2);
INSERT INTO PbDPattern VALUES(5, 2);
INSERT INTO PbDPattern VALUES(3, 3);
INSERT INTO PbDPattern VALUES(5, 3);
INSERT INTO PbDPattern VALUES(3, 4);
INSERT INTO PbDPattern VALUES(4, 4);
INSERT INTO PbDPattern VALUES(4, 5);
INSERT INTO PbDPattern VALUES(5, 5);
INSERT INTO PbDPattern VALUES(6, 5);
INSERT INTO PbDPattern VALUES(2, 6);
INSERT INTO PbDPattern VALUES(3, 6);
INSERT INTO PbDPattern VALUES(4, 6);
INSERT INTO PbDPattern VALUES(2, 7);
INSERT INTO PbDPattern VALUES(4, 7);
INSERT INTO PbDPattern VALUES(6, 7);
INSERT INTO PbDPattern VALUES(6, 8);
INSERT INTO PbDPattern VALUES(7, 8);
INSERT INTO PbDPattern VALUES(1, 9);
INSERT INTO PbDPattern VALUES(2, 9);
INSERT INTO PbDPattern VALUES(4, 9);
INSERT INTO PbDPattern VALUES(5, 9);
INSERT INTO PbDPattern VALUES(2, 10);
INSERT INTO PbDPattern VALUES(3, 10);
INSERT INTO PbDPattern VALUES(5, 10);
INSERT INTO PbDPattern VALUES(7, 11);
INSERT INTO PbDPattern VALUES(7, 12);
INSERT INTO PbDPattern VALUES(2, 12);
INSERT INTO PbDPattern VALUES(1, 13);
INSERT INTO PbDPattern VALUES(2, 13);
INSERT INTO PbDPattern VALUES(5, 13);
INSERT INTO PbDPattern VALUES(4, 14);
INSERT INTO PbDPattern VALUES(2, 14);
INSERT INTO PbDPattern VALUES(2, 15);
INSERT INTO PbDPattern VALUES(7, 15);
INSERT INTO PbDPattern VALUES(4, 16);
INSERT INTO PbDPattern VALUES(2, 16);
INSERT INTO PbDPattern VALUES(2, 17);
INSERT INTO PbDPattern VALUES(5, 17);
INSERT INTO PbDPattern VALUES(5, 18);
INSERT INTO PbDPattern VALUES(5, 19);
INSERT INTO PbDPattern VALUES(5, 20);
INSERT INTO PbDPattern VALUES(1, 20);
INSERT INTO PbDPattern VALUES(2, 20);
INSERT INTO PbDPattern VALUES(4, 21);
INSERT INTO PbDPattern VALUES(2, 21);
INSERT INTO PbDPattern VALUES(5, 21);
INSERT INTO PbDPattern VALUES(3, 21);
INSERT INTO PbDPattern VALUES(1, 22);
INSERT INTO PbDPattern VALUES(5, 22);
INSERT INTO PbDPattern VALUES(4, 22);
INSERT INTO PbDPattern VALUES(1, 23);
INSERT INTO PbDPattern VALUES(5, 23);
INSERT INTO PbDPattern VALUES(6, 24);
INSERT INTO PbDPattern VALUES(1, 24);
INSERT INTO PbDPattern VALUES(2, 25);
INSERT INTO PbDPattern VALUES(3, 25);

/* inserimento IsoPattern */
INSERT INTO IsoPattern VALUES(7.4, 1);
INSERT INTO IsoPattern VALUES(7.4, 2);
INSERT INTO IsoPattern VALUES(7.4, 3);
INSERT INTO IsoPattern VALUES(7.3, 4);
INSERT INTO IsoPattern VALUES(7.3, 5);
INSERT INTO IsoPattern VALUES(7.2, 6);
INSERT INTO IsoPattern VALUES(7.4, 7);
INSERT INTO IsoPattern VALUES(7.4, 8);
INSERT INTO IsoPattern VALUES(7.4, 9);
INSERT INTO IsoPattern VALUES(7.5, 10);
INSERT INTO IsoPattern VALUES(7.2, 11);
INSERT INTO IsoPattern VALUES(7.4, 12);
INSERT INTO IsoPattern VALUES(7.4, 13);
INSERT INTO IsoPattern VALUES(7.2, 14);
INSERT INTO IsoPattern VALUES(7.4, 15);
INSERT INTO IsoPattern VALUES(7.2, 16);
INSERT INTO IsoPattern VALUES(7.2, 17);
INSERT INTO IsoPattern VALUES(7.2, 18);
INSERT INTO IsoPattern VALUES(7.2, 19);
INSERT INTO IsoPattern VALUES(6.0, 19);
INSERT INTO IsoPattern VALUES(7.2, 20);
INSERT INTO IsoPattern VALUES(7.3, 20);
INSERT INTO IsoPattern VALUES(7.2, 21);
INSERT INTO IsoPattern VALUES(7.4, 22);
INSERT INTO IsoPattern VALUES(7.4, 23);
INSERT INTO IsoPattern VALUES(7.4, 24);
INSERT INTO IsoPattern VALUES(7.2, 25);

/* inserimento PbdIso */
INSERT INTO PbdIso VALUES(1, 7.4);
INSERT INTO PbdIso VALUES(2, 7.4);
INSERT INTO PbdIso VALUES(3, 7.4);
INSERT INTO PbdIso VALUES(4, 7.4);
INSERT INTO PbdIso VALUES(4, 7.3);
INSERT INTO PbdIso VALUES(5, 7.3);
INSERT INTO PbdIso VALUES(6, 7.2);
INSERT INTO PbdIso VALUES(2, 7.2);
INSERT INTO PbdIso VALUES(5, 7.2);
INSERT INTO PbdIso VALUES(1, 7.2);

/* inserimento OwaspPattern */ 
INSERT INTO OwaspPattern VALUES(5, 1);
INSERT INTO OwaspPattern VALUES(7, 1);
INSERT INTO OwaspPattern VALUES(4, 2);
INSERT INTO OwaspPattern VALUES(5, 2);
INSERT INTO OwaspPattern VALUES(4, 3);
INSERT INTO OwaspPattern VALUES(5, 3);
INSERT INTO OwaspPattern VALUES(9, 3);
INSERT INTO OwaspPattern VALUES(7, 3);
INSERT INTO OwaspPattern VALUES(5, 4);
INSERT INTO OwaspPattern VALUES(8, 4);
INSERT INTO OwaspPattern VALUES(9, 4);
INSERT INTO OwaspPattern VALUES(7, 5);
INSERT INTO OwaspPattern VALUES(9, 5);
INSERT INTO OwaspPattern VALUES(1, 5);
INSERT INTO OwaspPattern VALUES(7, 6);
INSERT INTO OwaspPattern VALUES(4, 6);
INSERT INTO OwaspPattern VALUES(5, 6);
INSERT INTO OwaspPattern VALUES(2, 7);
INSERT INTO OwaspPattern VALUES(4, 7);
INSERT INTO OwaspPattern VALUES(5, 7);
INSERT INTO OwaspPattern VALUES(8, 7);
INSERT INTO OwaspPattern VALUES(1, 8);
INSERT INTO OwaspPattern VALUES(3, 8);
INSERT INTO OwaspPattern VALUES(5, 8);
INSERT INTO OwaspPattern VALUES(7, 8);
INSERT INTO OwaspPattern VALUES(10, 9);
INSERT INTO OwaspPattern VALUES(1, 9);
INSERT INTO OwaspPattern VALUES(3, 9);
INSERT INTO OwaspPattern VALUES(5, 9);
INSERT INTO OwaspPattern VALUES(7, 9);
INSERT INTO OwaspPattern VALUES(10, 10);
INSERT INTO OwaspPattern VALUES(5, 10);
INSERT INTO OwaspPattern VALUES(7, 10);
INSERT INTO OwaspPattern VALUES(8, 10);
INSERT INTO OwaspPattern VALUES(9, 10);
INSERT INTO OwaspPattern VALUES(1, 11);
INSERT INTO OwaspPattern VALUES(5, 11);
INSERT INTO OwaspPattern VALUES(7, 11);
INSERT INTO OwaspPattern VALUES(8, 11);
INSERT INTO OwaspPattern VALUES(9, 11);
INSERT INTO OwaspPattern VALUES(1, 12);
INSERT INTO OwaspPattern VALUES(5, 12);
INSERT INTO OwaspPattern VALUES(7, 12);
INSERT INTO OwaspPattern VALUES(8, 12);
INSERT INTO OwaspPattern VALUES(9, 12);
INSERT INTO OwaspPattern VALUES(8, 13);
INSERT INTO OwaspPattern VALUES(9, 13);
INSERT INTO OwaspPattern VALUES(1, 14);
INSERT INTO OwaspPattern VALUES(7, 14);
INSERT INTO OwaspPattern VALUES(1, 15);
INSERT INTO OwaspPattern VALUES(7, 16);
INSERT INTO OwaspPattern VALUES(5, 16);
INSERT INTO OwaspPattern VALUES(4, 17);
INSERT INTO OwaspPattern VALUES(7, 17);
INSERT INTO OwaspPattern VALUES(10, 18);
INSERT INTO OwaspPattern VALUES(8, 19);
INSERT INTO OwaspPattern VALUES(9, 19);
INSERT INTO OwaspPattern VALUES(5, 20);
INSERT INTO OwaspPattern VALUES(7, 20);
INSERT INTO OwaspPattern VALUES(8, 20);
INSERT INTO OwaspPattern VALUES(9, 20);
INSERT INTO OwaspPattern VALUES(1, 21);
INSERT INTO OwaspPattern VALUES(2, 21);
INSERT INTO OwaspPattern VALUES(3, 21);
INSERT INTO OwaspPattern VALUES(7, 21);
INSERT INTO OwaspPattern VALUES(1, 22);
INSERT INTO OwaspPattern VALUES(2, 22);
INSERT INTO OwaspPattern VALUES(8, 22);
INSERT INTO OwaspPattern VALUES(9, 22);
INSERT INTO OwaspPattern VALUES(5, 23);
INSERT INTO OwaspPattern VALUES(7, 23);
INSERT INTO OwaspPattern VALUES(6, 24);
INSERT INTO OwaspPattern VALUES(8, 24);
INSERT INTO OwaspPattern VALUES(2, 25);
INSERT INTO OwaspPattern VALUES(3, 25);
INSERT INTO OwaspPattern VALUES(5, 25);


