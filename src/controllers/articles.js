const pool = require("./database");

class Articles {
  list = async (req, res) => {
    const resp = await pool.query("SELECT * FROM articles");
    res.json(resp.rows);
  };

  get = async (req, res) => {
    const resp = await pool.query("SELECT * FROM articles WHERE id = $1", [
      req.params.id,
    ]);
    res.json(resp.rows[0]);
  };

  create = async (req, res) => {
    const { nombre, descripcion, precio, iva } = req.body;
    await pool.query(`INSERT INTO public.articles(
            nombre, descripcion, iva, precio)
            VALUES ('${nombre}', '${descripcion}', ${iva}, ${precio});`);
    res.json({
      message: "articulo creado",
    });
  };

  delete = async (req, res) => {
    const id = req.params.id;
    await pool.query(`DELETE FROM public.articles WHERE id = ${id}`);
    res.json({
      message: `articulo ${id} eliminado`,
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
    let sql = "UPDATE articles SET ";

    for (const [key, value] of Object.entries(req.body)) {
      sql += `${key} = '${value}',`;
    }
    sql = sql.substring(0, sql.length - 1);

    sql += ` WHERE id = ${id};`;
    await pool.query(sql);
    res.json({
      message: `articulo ${id} actualizado`,
    });
  };
}

module.exports = Articles;
