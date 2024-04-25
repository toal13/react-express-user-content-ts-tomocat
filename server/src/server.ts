import { app } from './app';

// HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN!

app.listen(4000, () =>
  console.log('Server running on port: http://localhost:4000')
);
