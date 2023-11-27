const express = require("express");
const app = express();
app.use(express.json());
const items = ["Book", "Camera", "Headphones", "Laptop", "Phone"]; 

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/shop/search", function (req, res) {
  res.send("Shop API Search"); 
});

app.get("/shop/items", function (req, res) {
  res.send(items); 
});

app.get("/shop/items/:index", function (req, res) {
  const index = req.params.index;
  if (!items[index]) {
    return res.status(404).send(`Item at index ${index} not found.`);
  }
  res.send(items[index]);
});

app.put("/shop/items/:index", function (req, res) {
  const index = req.params.index;
  if (!items[index]) {
    return res.status(400).send("Item not found");
  }
  items[index] = req.body.name;
  res.send(items[index]);
});

app.delete("/shop/items/:index", function (req, res) {
  const index = req.params.index;
  items.splice(index, 1);
  res.send(items);
});

app.post("/shop/items", function (req, res) {
  items.push(req.body.name);
  res.send(items);
});

app.get("/shop/items/count", function (req, res) {
  res.send(`Total number of items: ${items.length}`);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
