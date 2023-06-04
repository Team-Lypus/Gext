const pool = require("./database");

class Users {
  list = async (req, res) => {
    const response = await pool.query("SELECT id, username FROM users");
    res.status(200).json(response.rows);
  };

  get = async (req, res) => {
    const response = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [req.params.id]
    );
    res.json(response.rows);
  };

  create = async (req, res) => {
    const { username, password } = req.body;
    const response = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );
    res.json({
      status: 200,
      message: "usuario creado",
    });
  };

  delete = async (req, res) => {
    const response = await pool.query("DELETE FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.json({
      message: `usuario ${req.params.id} eliminado`,
    });
  };

  update = async (req, res) => {
    if (req.body == {}) {
      res.json({
        message: "EMPTY BODY",
      });
      return;
    }
    const id = req.params.id;
    let sql = "UPDATE users SET ";

    for (const [key, value] of Object.entries(req.body)) {
      sql += `${key} = '${value}',`;
    }
    sql = sql.substring(0, sql.length - 1);

    sql += ` WHERE id = ${id};`;
    await pool.query(sql);
    res.json({
      message: `usuario ${id} actualizado`,
    });
  };
}

module.exports = Users;
