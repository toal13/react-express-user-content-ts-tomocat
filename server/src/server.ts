import 'express-async-errors';
import mongoose from 'mongoose';
import { app } from './app';

// HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN!

main().catch((err) => console.error(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI!);

  app.listen(4000, () =>
    console.log('Server running on port: http://localhost:4000')
  );
}
