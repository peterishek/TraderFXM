// App
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

// Routes
const XpubRouter = require("./routers/XpubRouter");
const RatesRouter = require("./routers/RatesRouter");
const UsersRouter = require("./routers/UsersRouter");
const AdminsRouter = require("./routers/AdminsRouter");
const OrdersRouter = require("./routers/OrdersRouter");
const GroupsRouter = require("./routers/GroupsRouter");
const ProductsRouter = require("./routers/ProductsRouter");
const ParentgroupsRouter = require("./routers/ParentgroupsRouter");
const TransactionsRouter = require("./routers/TransactionsRouter");
const NairaTransactionsRouter = require("./routers/NairaTransactionsRouter");

app.use("/api", XpubRouter);
app.use("/api", UsersRouter);
app.use("/api", RatesRouter);
app.use("/api", OrdersRouter);
app.use("/api", GroupsRouter);
app.use("/api", AdminsRouter);
app.use("/api", ProductsRouter);
app.use("/api", ParentgroupsRouter);
app.use("/api", TransactionsRouter);
app.use("/api", NairaTransactionsRouter);

const path = require("path");
const publicPath = path.resolve(__dirname, "../public_html/");

app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", publicPath);

app.get("/sw.js", (request, response) => {
  return response.sendFile(publicPath, "sw.js");
});

app.get("*", (request, response) => {
  return response.render("index.ejs");
});

const port = process.env.PORT || 1027;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
