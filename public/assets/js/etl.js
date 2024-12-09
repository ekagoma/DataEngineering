const fs = require("fs");
const csv = require("csv-parser");
const { Client } = require("pg");

// PostgreSQL configuration
const client = new Client({
    user: "your_username",
    host: "localhost",
    database: "financial_data",
    password: "your_password",
    port: 5432,
});

// Connect to PostgreSQL
client.connect();

// ETL process
fs.createReadStream("transactions.csv")
    .pipe(csv())
    .on("data", (row) => {
        const query = `
            INSERT INTO transactions (date, amount, category)
            VALUES ($1, $2, $3)
        `;
        const values = [row.date, row.amount, row.category];
        client.query(query, values, (err) => {
            if (err) console.error(err);
        });
    })
    .on("end", () => {
        console.log("ETL process complete.");
        client.end();
    });
