import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import __dirname from "./utils.js";
import database from "./db.js";
import config from "./config.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";

//Initialize
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.dbUrl,
      ttl: 20,
    }),
    resave: true,
    saveUninitialized: false,
    secret: "guau-guau",
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Settings
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//Database connect
database.connect();

//Routes
app.use("/api/sessions", sessionsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
