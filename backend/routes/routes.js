const express = require("express");
const router = express.Router();

let stocks = [
  {
    id: "1",
    stockName: "Apple",
    price: "138.93",
  },
  {
    id: "2",
    stockName: "Amazon",
    price: "109.56",
  },
  {
    id: "3",
    stockName: "Tesla",
    price: "681.79",
  },
];

let users = [
  {
    id: "1",
    userName: "Jhon Smith",
    cashBalance: "5000",
  },
  {
    id: "2",
    userName: "Sammy Smith",
    cashBalance: "100000",
  },
  {
    id: "3",
    userName: "Daniel Smith",
    cashBalance: "55000",
  },
];

router.get("/stocks", (req, res) => {
  res.json(stocks);
});

router.get("/users", (req, res, next) => {
  res.json(users);
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.filter((user) => user.id == id)[0];
  res.json(user);
});

router.get("/stock/:id", (req, res) => {
  const { id } = req.params;
  const stock = stocks.filter((stock) => stock.id == id)[0];
  res.json(stock);
});

router.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const { cashBalance } = req.params;
  const user = users.filter((user) => user.id == id)[0];
  user.cashBalance = req.body.cashBalance;
  res.json({ ok: true, user });
});

router.get("/", (req, res) => {
  res.send("foobar");
});

module.exports = router;
