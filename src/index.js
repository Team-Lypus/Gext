const express = require("express");
const app = express();

//cors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require("./routes/index"));

app.listen(3001);
console.log("Servidor escuchando el puerto: 3001");
