import cartModel from "../models/carts.js";
import { productModel } from "../models/products.js";

export default class CartManager {
  constructor() {}
  getCarts = async () => {
    const carts = await cartModel.find().lean().populate("products.product");
    try {
      return carts;
    } catch (error) {
      console.log(error);
    }
  };
  getCartById = async (cartId) => {
    try {
      const cartById = await cartModel
        .findOne({ _id: cartId })
        .populate("products.product")
        .lean();
      return cartById;
    } catch (error) {
      console.log(error);
    }
  };
  createCart = async (cart) => {
    try {
      const newCart = await cartModel.create(cart);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  };
  assignCart = async () => {
    let carts = await this.getCarts();
    if (!carts) {
      let cart = { product: [] };
      const newCart = await this.createCart(cart);
      return newCart._id;
    } else {
      return carts[0]._id;
    }
  };
  addToCart = async (cartId, productId, qty) => {
    try {
      const findCart = await cartModel.findOne({ _id: cartId });
      const prodcarIndex = findCart.products.findIndex(
        (product) => product._id == productId
      );
      console.log(prodcarIndex);
      console.log(typeof prodcarIndex);
      console.log(findCart);
      if (prodcarIndex !== -1) {
        await cartModel.updateOne(
          { _id: cartId, "products._id": productId },
          { $inc: { "products.$.quantity": Number(qty) } }
        );
        const updatedCart = await cartModel.findOne({ _id: cartId });
        return updatedCart;
      } else {
        const cartUpdate = await cartModel.updateOne(
          { _id: cartId },
          {
            $push: {
              products: [{ product: productId, quantity: Number(qty) }],
            },
          }
        );
        return cartUpdate;
      }
    } catch (error) {
      console.error(error);
    }
  };
  cleanCart = async (cartId) => {
    try {
      const cleanCart = await cartModel.updateOne(
        { _id: cartId },
        { $set: { products: [] } }
      );
      return cleanCart;
    } catch (error) {
      console.log(error);
    }
  };
  deleteFromCart = async (cartId, productId) => {
    try {
      const findCart = await cartModel.findOne({ _id: cartId });
      if (!findCart) {
        return new Error("Cart not found");
      } else {
        const cartPull = await cartModel.updateOne(
          { _id: cartId },
          { $pull: { products: { _id: productId } } }
        );
        return cartPull;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
