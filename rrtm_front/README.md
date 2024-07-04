# Istruzioni esecuzione programma

> Prerequisito fondamentale
> 
> 
> Per l’esecuzione del programma è necessario avere installato node js e mysql
> 

Per poter eseguire il programma bisogna:

1. scaricare la cartella rrtm_git
2. aprire mysql nel terminale e accedere con l’utente root
    1. eseguire il file script `rrtm.sql` per la creazione del database
    2. creare l’utente per far accedere il server ai dati usando il comando 
    
    ```sql
    CREATE USER 'rrtm'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rrtm';
    GRANT ALL PRIVILEGES ON rrtm.* TO 'rrtm'@'localhost';
    ```
    
3. aprire il terminale e posizionarsi nella directory ./rrtm_git
4. eseguire il programma attraverso il comando `npm run start`

> Osservazioni
> 
> 
> La creazione degli amministratori è una funzione accessibile solo nella sezione delle impostazioni dell’interfaccia amministratore. Ma, dato che non è ancora stata implementata, è temporaneamente disponibile all’url: [http://localhost:3000/registerAdmin](http://localhost:3000/registerAdmin)
> 
> La pagina di login è unica sia per gli amministratori che per gli utenti.
> 
> > Attenzione a non creare un utente e un amministratore con lo stesso unsername perchè in quel caso il login farà prevalere sempre l’utente
> > 
> 
> > Attenzione all’inserimeto di più utenti o più amministratori perchè la loro mail deve essere univoca (nella rispettiva tabella)
> >