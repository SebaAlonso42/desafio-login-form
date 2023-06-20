import { productModel } from "../models/products.js";

export default class ProductManager {
  constructor() {}
  getProducts = async (limit, page, filter, sort) => {
    try {
      if (!filter) {
        page ? null : (page = 1);
        const products = await productModel.paginate(
          {},
          {
            limit: 5,
            page: `${page}`,
            lean: true,
            sort: { category: -1 },
          }
        );
        console.log(products);
        return products;
        //ejecutar sin filtro(todos los ojbs)
        // return array de objs ("data" en /views.router")
      }
      const options = {
        category: JSON.parse(filter),
      };
      Number(sort) === 1 ? (sort = { price: 1 }) : null;
      Number(sort) === -1 ? (sort = { price: -1 }) : null;

      limit ? null : (limit = 2);
      page ? null : (page = 1);

      const products = await productModel.paginate(options, {
        limit: `${limit}`,
        page: `${page}`,
        lean: true,
        sort,
      });
      products.prevLink = products.hasPrevPage
        ? `/products?page=${products.prevPage}`
        : null;
      products.nextLink = products.hasNextPage
        ? `/products?page=${products.nextPage}`
        : null;
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  getProductsList = async () => {
    try {
      const products = await productModel.paginate(
        {},
        {
          limit: 5,
          page: 1,
          lean: true,
          sort: { category: -1 },
        }
      );
      products.prevLink = products.hasPrevPage
        ? `/products?page=${products.prevPage}`
        : null;
      products.nextLink = products.hasNextPage
        ? `/products?page=${products.nextPage}`
        : null;
      console.log(products);
      return products;
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (productId) => {
    try {
      const search = await productModel.find({ _id: productId }).lean();
      return search;
    } catch (error) {
      console.log(error);
    }
  };
  addProduct = async (product) => {
    try {
      product.stock > 0
        ? (product = { status: true, ...product })
        : (product = { status: false, ...product });

      const newProduct = await productModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  };
  updateProduct = async (productId, updateProduct) => {
    try {
      const updatedProduct = await productModel.updateOne(
        { _id: productId },
        updateProduct
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (deleteId) => {
    try {
      const deletedProduct = await productModel.deleteOne({ _id: deleteId });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  };
}
