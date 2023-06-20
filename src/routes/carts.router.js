import { Router } from "express";
import CartManager from "../dao/dbManagers/cartManager.js";

const router = Router();

const cartManager = new CartManager();

// **GET**
router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  return res.send({ status: "Success", payload: carts });
});
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    return res.send({ status: "Success", payload: cart });
  } catch (error) {
    console.log(error);
  }
});

// **POST**
router.post("/", async (req, res) => {
  try {
    const cart = { product: [] };
    const newCart = await cartManager.createCart(cart);
    res.status(201).send({ status: "Success", payload: newCart });
  } catch (error) {
    console.log(error);
  }
});
// **UPDATE**
router.put("/:cid/products/:pid-:qty", async (req, res) => {
  try {
    const { cid, pid, qty } = req.params;
    const cartUpdate = await cartManager.addToCart(cid, pid, qty);
    if (!cartUpdate) {
      return res.status(400).send({
        status: "Error",
        message: { error: "incomplete or wrong params" },
      });
    } else {
      return res.status(200).send({
        status: "Success",
        payload: cartUpdate,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// **DELETE**
router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cleanCart = await cartManager.cleanCart(cartId);
    return res.status(200).send({
      status: "Success",
      payload: cleanCart,
    });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const deleteFromCart = await cartManager.deleteFromCart(cartId, prodId);
    return res.status(200).send({
      status: "Success",
      payload: deleteFromCart,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
