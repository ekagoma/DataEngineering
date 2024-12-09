const express = require("express");
const { Client } = require("pg");
const app = express();
const port = 3000;

// PostgreSQL configuration
const client = new Client({
    user: "your_username",
    host: "localhost",
    database: "financial_data",
    password: "your_password",
    port: 5432,
});

client.connect();

// Endpoint to fetch transactions
app.get("/data", (req, res) => {
    client.query("SELECT * FROM transactions", (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
