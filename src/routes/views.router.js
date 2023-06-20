import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js";
import CartManager from "../dao/dbManagers/cartManager.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
    res.render("login", { style: "styles.css", title: "login" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("register", { style: "styles.css", title: "register" });
  } catch (error) {
    console.log(error);
    console.log(style);
  }
});

router.get("/products", async (req, res) => {
  try {
    const { filter, sort, pageQuery } = req.query;
    let products = await productManager.getProducts(
      null,
      pageQuery,
      filter,
      sort
    );
    const {
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink,
      nextLink,
    } = products;
    const data = products.docs;
    const cartId = await cartManager.assignCart();

    return res.render("products", {
      cartId,
      data,
      page,
      filter,
      sort,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink,
      nextLink,
      style: "styles.css",
      title: "products",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/product/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getById(productId);
    const productRender = product[0];
    console.log(productRender);
    console.log(product);
    return res.render("product", { productRender, style: "styles.css" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartManager.getCartById(cid);
    console.log(cart);
    return res.render("cart", { cart, style: "styles.css" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/carts", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    if (!carts) {
      return res.status(404).send({
        status: "Error",
        message: { error: "incomplete or wrong params" },
      });
    }
    return res.render("carts", { carts, style: "styles.css" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/home", async (req, res) => {
  try {
    res.render("home", { style: "styles.css", title: "home" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/profile", async (req, res) => {
  try {
    res.render("profile", {
      user: req.session.user,
      style: "styles.css",
      title: "profile",
    });
  } catch (error) {
    console.log(error);
  }
});
export default router;
