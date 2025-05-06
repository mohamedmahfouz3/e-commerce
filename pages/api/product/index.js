import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

export default async function handler(req, res) {
  try {
    await connectDB();

    switch (req.method) {
      case "GET":
        await getProducts(req, res);
        break;
      case "POST":
        await createProduct(req, res);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await features.query;

    if (!products) {
      return res.status(200).json({
        status: "success",
        result: 0,
        products: [],
      });
    }

    res.status(200).json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    console.error("Error in getProducts:", err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { title, price, inStock, description, content, category, images } =
      req.body;

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return res.status(400).json({ err: "Please add all the fields." });

    const newProduct = new Products({
      title: title.toLowerCase(),
      price,
      inStock,
      description,
      content,
      category,
      images,
    });

    await newProduct.save();

    res.json({ msg: "Success! Created a new product" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
