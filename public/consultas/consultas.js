const {
  Pool
} = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "bikeShop",
  port: 5432,
});

let getTiendas = async () => {
  try {
    const result = await pool.query(`SELECT store_name FROM stores`);
    return result.rows;
  } catch (e) {
    console.log(e);
    return e;
  }
};


let getCategorias = async () => {
  try {
    const result = await pool.query(`SELECT category_name FROM categories`);
    return result.rows;
  } catch (e) {
    console.log(e);
    return e;
  }
};


let getMarcas = async () => {
  try {
    const result = await pool.query(`SELECT brand_name FROM brands`);
    return result.rows;
  } catch (e) {
    console.log(e);
    return e;
  }
};

let getDetails = async () => {
  try {
    const result = await pool.query(`select store_name, product_id, product_name, quantity from products p 
    join stocks using(product_id) 
    join stores using(store_id)
    order by product_name;
  `);
    return result.rows;
  } catch (e) {
    console.log(e);
    return e;
  }
};

let getFiltro = async (tienda, categoria, marca) => {
  try {
    let query = `select store_name, products.product_id, products.product_name, quantity from products
    join stocks using(product_id)
    join stores using(store_id)
    join categories using(category_id)
    join brands using(brand_id) 
    where store_name = coalesce($1, store_name) and category_name = coalesce($2, category_name) and brand_name = coalesce($3, brand_name)`
    const result = await pool.query(
    query, 
    [
      tienda == 0 ? null : `${tienda}`, 
      categoria == 0 ? null : `${categoria}`, 
      marca == 0 ? null : `${marca}`
    ]);
    return result.rows;
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  getTiendas,
  getCategorias,
  getMarcas,
  getDetails,
  getFiltro
};