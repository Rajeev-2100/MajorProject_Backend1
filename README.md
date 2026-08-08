# MajorProject Backend

This is the backend for an e-commerce web application, built using Node.js, Express, and MongoDB. It provides RESTful API endpoints to manage products, categories, shopping cart, user wishlists, addresses, and orders.

## Features

- **Product Management**: Fetch all products, get details by ID or name, and update products.
- **Category Management**: Create and fetch categories, and get products by category.
- **Cart Management**: Add products to cart, update quantities and sizes, and remove items.
- **Wishlist**: Add and remove items from a user's wishlist.
- **User & Address**: Manage user profiles and their delivery addresses.
- **Order Processing**: Place new orders and fetch order history.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment Management**: dotenv
- **Middleware**: CORS, Express JSON parser

## Project Structure

```text
├── db/
│   └── db.connect.js        # MongoDB connection setup
├── model/
│   ├── address.model.js     # User address schema
│   ├── cart.model.js        # Shopping cart schema
│   ├── category.model.js    # Product category schema
│   ├── order.model.js       # Order schema
│   ├── product.model.js     # Product schema
│   ├── user.model.js        # User profile schema
│   └── wishlist.model.js    # Wishlist schema
├── index.js                 # Main application entry point & API routes
├── package.json             # Project dependencies and scripts
└── vercel.json              # Vercel deployment configuration
```

## Setup and Installation

1. **Clone the repository** and navigate to the project directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variable for the database connection:

```env
MONGO_URL=your_mongodb_connection_string
```

## Usage

To start the server, run:

```bash
node index.js
```

The server will start on port `3001` by default.

## API Documentation

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:productId` - Get a product by ID
- `GET /api/productDetails/:productName` - Get a product by name
- `POST /api/products/:productId` - Update a product by ID

### Categories
- `POST /category` - Create a new category
- `GET /api/categories` - Get all categories
- `GET /api/categories/:categoryId` - Get a category by ID
- `GET /api/category/:categoryName` - Get products by category name
- `GET /api/products/category/:CategoryId` - Get all products by category ID
- `DELETE /api/category/deletedCategoryName/:categoryName` - Delete products by category ID

### Cart
- `POST /api/cart/:productId` - Add an item to the cart
- `GET /api/cart` - Get all cart items
- `PUT /api/updatedCart/:cartId` - Update a cart item
- `PUT /api/updateCartBySize/:cartId` - Update a cart item size
- `DELETE /api/deletedCart/:cartId` - Remove an item from the cart
- `DELETE /api/cart/deletedAll` - Clear the entire cart

### Wishlist
- `POST /api/wishlist/:productId` - Add an item to the wishlist
- `GET /api/wishlist` - Get all wishlist items
- `DELETE /api/wishlist/:wishlistId` - Remove an item from the wishlist

### User & Address
- `POST /api/user` - Create a new user profile
- `GET /api/user` - Get all users
- `POST /api/address` - Add a new address
- `GET /api/address` - Get all addresses
- `PUT /api/address/:addressId` - Update an address
- `DELETE /api/address/:addressId` - Delete an address

### Orders
- `POST /api/order` - Place a new order
- `GET /api/order` - Get all orders
- `GET /api/order/:orderId` - Get order details by ID

## Testing and Deployment
- The project includes a `vercel.json` file, indicating it is configured for deployment on [Vercel](https://vercel.com).
