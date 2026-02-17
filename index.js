const Products = require("./model/product.model.js");
const { initializeDatabase } = require("./db/db.connect.js");
const express = require("express");
const Category = require("./model/category.model.js");
const Users = require("./model/user.model.js");
const Address = require("./model/address.model.js");
const Cart = require("./model/cart.model.js");
const Wishlist = require("./model/wishlist.model.js");
const Order = require("./model/order.model.js");

const app = express();
initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// async function seedData() {
//   try {
//     for (const ProductData of ProductsData) {
//       const newProduct = new Products(ProductData);
//       await newProduct.save();
//     }
//     console.log("All products saved successfully");
//   } catch (error) {
//     console.log("Error seeding the data:", error.message);
//   }
// }

// seedData()

async function getAllProductData() {
  try {
    const product = await Products.find().populate("categoryField");
    return product;
  } catch (error) {
    throw error;
  }
}

app.get("/api/products", async (req, res) => {
  try {
    const product = await getAllProductData();
    res.status(201).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product Data" });
  }
});

async function getProductDetailByProductId(productId) {
  try {
    const product = await Products.findById(productId);
    // console.log(product);
    return product;
  } catch (error) {
    throw error;
  }
}

app.get("/api/products/category/:CategoryId", async (req, res) => {
  try {
    const product = await getAllProductDataByCategory(req.params.CategoryId);
    console.log(product);
    if (product) {
      return res.status(200).json({ data: product });
    } else {
      res.status(404).json({ error: "This product Id not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product Data" });
  }
});

app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await getProductDetailByProductId(req.params.productId);
    if (product) {
      return res.status(201).json({ data: product });
    } else {
      res.status(404).json({ error: "This product Id not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product Data" });
  }
});

async function getAllProductDataByCategory(categoryId) {
  try {
    // console.log(categoryId)
    const products = await Products.find({ categoryField: categoryId });
    // console.log(products)
    return products;
  } catch (error) {
    throw error;
  }
}

async function createCategoryData(newCategory) {
  try {
    const category = new Category(newCategory);
    return category.save();
  } catch (error) {
    throw error;
  }
}

app.post("/category", async (req, res) => {
  try {
    const category = await createCategoryData(req.body);
    if (category) {
      res
        .status(201)
        .json({ message: "Saved all Category inside the Product Schema" });
    } else {
      res.status(404).json({ error: "Category not created" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch Category Data", details: error.message });
  }
});

async function getAllCategoryData() {
  try {
    const category = await Category.find();
    return category;
  } catch (error) {
    throw error;
  }
}

app.get("/api/categories", async (req, res) => {
  try {
    const category = await getAllCategoryData();
    if (category) {
      res.status(201).json({ data: category });
    }
    res.status(404).json({ error: "Categories not found" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch Category Data", details: error.message });
  }
});

async function getCategoryByCategoryId(categoryId) {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    throw error;
  }
}

app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const category = await getCategoryByCategoryId(req.params.categoryId);
    if (category) {
      res.status(200).json({ data: category });
    }
    res.status(404).json({ error: "Category Id not found" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch Category Data", details: error.message });
  }
});

// * ----------------------- Add Cart Page --------------------------

// ! api for create a cart Details

async function createCartDetail(productId, productQuantity) {
  try {
    const product = await Products.findById(productId);
    if (!product) {
      return null;
    }

    const cartItem = new Cart({
      product: product._id,
      productQuantity: productQuantity,
    });

    console.log("CartItem:", cartItem);
    await cartItem.save();
    return cartItem;
  } catch (error) {
    throw error;
  }
}

app.post("/api/cart/:productId", async (req, res) => {
  try {
    const { productQuantity } = req.body;
    const cart = await createCartDetail(req.params.productId, productQuantity);
    if (!cart) {
      return res.status(404).json({ error: "Product Id not found" });
    }
    console.log("Cart: ", cart);
    res.status(201).json({
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add product to cart",
      details: error.message,
    });
    console.error(error.message);
  }
});

// ! api for get a Cart Detail

async function getCartDetail() {
  try {
    const product = await Cart.find().populate("product");
    return product;
  } catch (error) {
    throw error;
  }
}

app.get("/api/cart", async (req, res) => {
  try {
    const cart = await getCartDetail();
    if (!cart) {
      return res.status(404).json({ error: "Cart Detail not found" });
    } else {
      res.status(201).json({
        message: "Cart Details is this",
        data: cart,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to Fetch Cart data",
      details: error.message,
    });
  }
});

// ! api for deleted a cart detail

async function deletedCartDetailByCartId(cartId) {
  try {
    const cart = await Cart.findByIdAndDelete(cartId);
    return cart;
  } catch (error) {
    throw error;
  }
}

app.delete("/api/deletedCart/:cartId", async (req, res) => {
  try {
    const cart = await deletedCartDetailByCartId(req.params.cartId);
    if (!cart) {
      res.status(404).json({ error: "This Cart Id not found" });
    } else {
      res.status(201).json({ message: "This cart Id is deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Cart Details" });
  }
});

// ! api for update the cart detail

async function updateToCartDetailByProductId(productId, dataToUpdate) {
  try {
    const cart = await Cart.findByIdAndUpdate(productId, dataToUpdate, {
      new: true,
    });
    return cart;
  } catch (error) {
    throw error;
  }
}

app.put("/api/updatedCart/:productId", async (req, res) => {
  try {
    const cart = await updateToCartDetailByProductId(
      req.params.productId,
      req.body,
    );
    if (cart) {
      res
        .status(201)
        .json({ message: "Cart Item update Successfully", data: cart });
    } else {
      res.status(404).json({ error: "Cart Id not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Cart Data" });
  }
});

// * ----------------------- WishList Page --------------------------

async function createWishListDetail(productId) {
  try {
    const wishlist = new Wishlist({
      product: productId,
    });

    const savedWishlist = await wishlist.save();
    return savedWishlist;
  } catch (error) {
    throw error;
  }
}

app.post("/api/wishlist/:productId", async (req, res) => {
  try {
    const wishlist = await createWishListDetail(req.params.productId);
    if (!wishlist) {
      res.status(404).json({ error: "This Product Id not found in product" });
    } else {
      res.status(201).json({
        message: "Wishlist added successfully",
        data: wishlist,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to add Wishlist",
    });
    console.error(error.message);
  }
});

// ! api for get a Wishlist Detail

async function getWishListData() {
  try {
    const wishlist = await Wishlist.find().populate("product");
    return wishlist;
  } catch (error) {
    throw error;
  }
}

app.get("/api/wishlist", async (req, res) => {
  try {
    const wishlist = await getWishListData();
    if (!wishlist) {
      res.status(404).json({ error: "This Wishlist Id not found" });
    } else {
      res
        .status(201)
        .json({ message: "WishList Data is this: ", data: wishlist });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Wishlist Data" });
  }
});

// ! api for Delete a Wishlist Detail

async function deletedWishlistDetails(productId) {
  try {
    const wishlist = await Wishlist.findById(productId);
    return wishlist;
  } catch (error) {
    throw error;
  }
}

app.delete("/api/wishlist/:productId", async (req, res) => {
  try {
    const wishlist = await deletedWishlistDetails(req.params.productId);
    if (!wishlist) {
      res.status(404).json({ error: "This Wishlist Id not found" });
      console.error(error.message);
    } else {
      res
        .status(201)
        .json({ message: "WishList Data is this: ", data: wishlist });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Wishlist Data" });
  }
});

// * ----------------------- User Profile --------------------------

// ! api for added user Profile

async function createNewUserDetails(newUser) {
  try {
    const user = new Users(newUser);
    const savedUser = user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
}

app.post("/api/user", async (req, res) => {
  try {
    const user = await createNewUserDetails(req.body);
    if (user) {
      res.status(200).json({ data: user });
    }
    res.status(404).json({ error: "Something wrong in user Details " });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user Detail" });
  }
});

// ! api for get the user Data

async function getUserDetail() {
  try {
    const user = await Users.find();
    return user;
  } catch (error) {
    throw error;
  }
}

app.get("/api/user", async (req, res) => {
  try {
    const user = await getUserDetail();
    if (user) {
      res.status(201).json({ message: "User Detail this:", data: user });
    }
    res.status(404).json({ error: "This User Id not found in Db" });
  } catch (error) {
    throw error;
  }
});

// * ----------------------- User Address --------------------------

// ! create change for user Address

async function createUserAddress(newAddress) {
  try {
    const address = new Address(newAddress);
    const savedAddress = await address.save();
    return savedAddress;
  } catch (error) {
    throw error;
  }
}

app.post("/api/address", async (req, res) => {
  try {
    const address = await createUserAddress(req.body);
    if (address) {
      res.status(200).json({ data: address });
    }
    res.status(404).json({ error: "Something wrong in address Details " });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch address Detail" });
    console.error(error.message);
  }
});

// ! get All User Address

async function getAllDetailOfUserAddress() {
  try {
    const user = await Address.find();
    return user;
  } catch (error) {
    throw error;
  }
}

app.get("/api/address", async (req, res) => {
  try {
    const address = await getAllDetailOfUserAddress();
    if (!address) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ data: address });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch address Detail" });
  }
});

// ! update the User Address Detail

async function updatedToUserAddressDetail(addressId, dataToUpdate) {
  try {
    const address = await Address.findByIdAndUpdate(addressId, dataToUpdate, {
      new: true,
    });
    return address;
  } catch (error) {
    throw error;
  }
}

app.put("/api/address/:addressId", async (req, res) => {
  try {
    const address = await updatedToUserAddressDetail(
      req.params.addressId,
      req.body,
    );
    if (address) {
      res.status(201).json({ data: address });
    }
    res.status(404).json({ error: "That Address Id not found" });
    console.error(error.message);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch address data" });
  }
});

// ! delete route using address id

async function deletedUserDetailAddress(addressId) {
  try {
    const address = await Address.findByIdAndDelete(addressId);
    return address;
  } catch (error) {
    throw error;
  }
}

app.delete("/api/address/:addressId", async (req, res) => {
  try {
    const address = await deletedUserDetailAddress(req.params.addressId);
    console.log(req.params.addressId);
    if (address) {
      res.status(201).json({ data: "User Address Deleted successfully" });
    }
    res.status(404).json({ error: "User Address id not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch User Address Details" });
  }
});

// ! post route for orderDetail

async function createOrderDetails(newOrder) {
  try {
    const order = new Order(newOrder);
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw error;
  }
}

app.post("/api/order", async (req, res) => {
  try {
    const { product, user, address, quantity } = req.body;
    if (!product || !user || !address || !quantity) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const productData = await Products.findById(product);
    if (!productData) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const totalPrice = productData.productPrice * quantity;
    const order = new Order({
      product,
      user,
      address,
      quantity,
      totalPrice,
    });

    const savedOrder = await order.save();
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("product")
      .populate("user")
      .populate("address");
    res.status(201).json({
      message: "Order placed successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

async function getOrderDetailsById(orderId) {
  try {
    const order = await Order.findById(orderId)
      .populate("product")
      .populate("user")
      .populate("address")
      .select('product address user totalPrice quantity orderStatus createdAt')
    return order;
  } catch (error) {
    throw error;
  }
}

// ! get route for orderDetail by orderId


app.get("/api/order/:orderId", async (req, res) => {
  try {
    const order = await getOrderDetailsById(req.params.orderId);
    if (!order) {
      res.status(404).json({ error: "Order Id not found" });
    } else {
      res.status(201).json({ message: "Order Details is this: ", data: order });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch Order Detail" });
  }
});

// ! get route for all orderDetail 


async function getAllOrderDetail() {
  try {
    const order = await Order.find()
      .populate("product")
      .select('product totalPrice quantity orderStatus createdAt')
    return order;
  } catch (error) {
    throw error;
  }
}

app.get("/api/order", async (req, res) => {
  try {
    const order = await getAllOrderDetail();
    if (!order) {
      res.status(404).json({ error: "Orders not found" });
    } else {
      res.status(201).json({ message: "Order Details is this: ", data: order });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch Order Details" });
    console.error(error.message);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running on this", PORT);
});
