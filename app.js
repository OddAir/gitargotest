const express = require('express');
const app = express();
const port = 3000;

// Dummy-funksjoner for å simulere database-interaksjon
function connectToPostgres() {
  const host = process.env.POSTGRES_HOST || 'localhost';
  console.log(`Simulerer tilkobling til PostgreSQL på host: ${host}`);
  return true; // Simulerer suksess
}

function connectToInfluxDB() {
  const host = process.env.INFLUXDB_HOST || 'localhost';
  console.log(`Simulerer tilkobling til InfluxDB på host: ${host}`);
  return true; // Simulerer suksess
}

app.get('/', (req, res) => {
  res.send(`Heisann, verden! Appen kjører.`);
});

// En "test"-funksjon vi kan kalle fra CI
function runTests() {
    console.log("Kjører simulerte tester...");
    const pgOk = connectToPostgres();
    const influxOk = connectToInfluxDB();

    if (pgOk && influxOk) {
        console.log("Alle tester bestått!");
        process.exit(0); // Suksess
    } else {
        console.error("En eller flere tester feilet!");
        process.exit(1); // Feil
    }
}

if (process.argv[2] === 'test') {
    runTests();
} else {
    app.listen(port, () => {
        console.log(`App lytter på http://localhost:${port}`);
    });
}