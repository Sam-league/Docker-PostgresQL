const express = require("express");
const pool = require("./db");

const port = 3000;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let data = await pool.query("SELECT * FROM schools");
    res.send(data.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    await pool.query(`INSERT INTO schools(name, address) VALUES($1,$2)`, [
      name,
      email,
    ]);
    res.send({
      message: "Child added successfully",
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      `CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))`
    );
    res.send({
      message: "table created",
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`server running on port ${port}`));
