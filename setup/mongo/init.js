const conn = new Mongo();

const order_db = conn.getDB('orders');
order_db.createUser({
  user: "dev",
  pwd: "dev",
  roles: [{ role: "readWrite", db: "orders" }]
});
order_db.createCollection('orders');

const payment_db = conn.getDB('payments');
payment_db.createUser({
  user: "dev",
  pwd: "dev",
  roles: [{ role: "readWrite", db: "payments" }]
});
payment_db.createCollection('payments');
