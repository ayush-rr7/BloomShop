# 🌸 FloralPallete

**FloralPallete** is a modern full-stack flower business platform built with the **MERN stack**. It provides a complete digital experience for customers to explore flower products, manage their cart, place orders, and make payments, while also providing a dedicated workflow for shop owners to manage their products and orders.

The project combines **e-commerce functionality with flower-shop business management**, creating a complete platform for online flower ordering and shop operations.

---

## ✨ Features

### 🛍️ Customer Features

* 👤 User registration and login
* 🔐 Secure authentication
* 🌹 Browse available flower products
* 🔎 View detailed product information
* 🛒 Add products to cart
* ➕ Increase or decrease product quantity
* 🗑️ Remove products from cart
* 💰 Automatic cart total calculation
* 📦 Checkout and order placement
* 💳 Online payment integration with Razorpay
* 📍 Enter delivery information during checkout
* 📋 View order details
* 📱 Responsive interface for desktop and mobile devices

### 🏪 Shop Owner Features

* 🔐 Owner authentication
* 📊 Owner/shop dashboard
* 🌸 Add new products
* ✏️ Update product information
* 🗑️ Remove products
* 🖼️ Upload and manage product images
* 📦 Manage customer orders
* 🔄 Update order status
* 📋 View order information

### ☁️ Media Management

* Product image uploads
* Cloudinary-based image storage
* Multer-based file handling
* Optimized image delivery through Cloudinary

### 🔒 Security

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Authentication middleware
* Environment variables for sensitive credentials
* Input validation
* CORS configuration
* Secure payment verification

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────────┐
                         │      React Frontend      │
                         │                          │
                         │  Home                    │
                         │  Products                │
                         │  Product Details         │
                         │  Cart                    │
                         │  Checkout                │
                         │  Orders                  │
                         │  Owner Dashboard         │
                         └────────────┬─────────────┘
                                      │
                              REST API / HTTP
                                      │
                         ┌────────────▼─────────────┐
                         │     Express Backend      │
                         │                          │
                         │ Authentication           │
                         │ Products                 │
                         │ Cart                     │
                         │ Orders                   │
                         │ Payments                 │
                         │ Owner Management         │
                         └───────┬─────────┬────────┘
                                 │         │
                    ┌────────────┘         └─────────────┐
                    ▼                                    ▼
             ┌──────────────┐                     ┌──────────────┐
             │   MongoDB    │                     │  Cloudinary  │
             │              │                     │              │
             │ Users        │                     │ Product      │
             │ Products     │                     │ Images       │
             │ Carts        │                     │              │
             │ Orders       │                     └──────────────┘
             └──────────────┘
                                 │
                                 ▼
                         ┌──────────────────┐
                         │     Razorpay     │
                         │                  │
                         │ Online Payments  │
                         └──────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| React            | User interface                      |
| Vite             | Frontend development and build tool |
| React Router DOM | Client-side routing                 |
| Tailwind CSS     | Responsive UI styling               |
| Axios            | API communication                   |
| Lucide React     | UI icons                            |

## Backend

| Technology | Purpose              |
| ---------- | -------------------- |
| Node.js    | Server runtime       |
| Express.js | REST API development |
| MongoDB    | Database             |
| Mongoose   | MongoDB ODM          |
| JWT        | Authentication       |
| bcrypt     | Password hashing     |
| Multer     | File upload handling |
| Cloudinary | Image storage        |
| Razorpay   | Payment processing   |

---

# 🛒 Core Shopping Workflow

FloralPallete implements a complete online ordering workflow:

```text
        Browse Products
              │
              ▼
       Product Details
              │
              ▼
       Select Quantity
              │
              ▼
          Add to Cart
              │
              ▼
        Review Cart
              │
              ▼
           Checkout
              │
              ▼
      Enter Delivery Details
              │
              ▼
       Select Payment Method
              │
              ▼
       Razorpay Payment
              │
              ▼
        Create Order
              │
              ▼
       Order Confirmation
```

---

# 🌸 Product Management

Products can contain information such as:

* Product name
* Description
* Price
* Category
* Available quantity
* Product image
* Additional product information

The owner can manage the product catalogue through the shop management interface.

---

# 📦 Order Management

The order system connects the customer shopping workflow with the shop owner workflow.

### Customer

```text
Cart
  ↓
Checkout
  ↓
Delivery Details
  ↓
Payment
  ↓
Order Created
  ↓
Order Tracking
```

### Shop Owner

```text
New Order
    ↓
Review Order
    ↓
Process Order
    ↓
Update Status
    ↓
Complete Delivery
```

---

# 💳 Payment Integration

FloralPallete integrates **Razorpay** to support online payments.

The payment workflow includes:

1. Customer proceeds to checkout.
2. Order and delivery information are submitted.
3. Razorpay payment flow is initiated.
4. Customer completes the payment.
5. Payment information is verified by the backend.
6. The order is created/updated according to the payment result.

Sensitive Razorpay credentials are stored through environment variables rather than being hard-coded in the application.

---

# 🗄️ Database Structure

MongoDB is used as the primary database.

### Main Collections

```text
Users
 │
 ├── Account information
 ├── Authentication information
 └── User role

Products
 │
 ├── Product information
 ├── Price
 ├── Category
 └── Image information

Carts
 │
 ├── User
 ├── Products
 ├── Quantities
 └── Cart totals

Orders
 │
 ├── Customer information
 ├── Products
 ├── Quantity
 ├── Delivery details
 ├── Payment information
 └── Order status
```

---

# 📁 Project Structure

```text
FloralPallete/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── middleware/
│   │   └── authentication.js
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── razorpay.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

> The exact folder names can be adjusted to match the current repository structure.

---

# 🔌 API Overview

## Authentication

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | `/auth/signup` | Register a user        |
| POST   | `/auth/login`  | Login user             |
| POST   | `/auth/logout` | Logout user            |
| GET    | `/auth/me`     | Get authenticated user |

## Products

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/products`     | Get all products    |
| GET    | `/api/products/:id` | Get product details |
| POST   | `/api/products`     | Create a product    |
| PUT    | `/api/products/:id` | Update a product    |
| DELETE | `/api/products/:id` | Delete a product    |

## Cart

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/api/cart`     | Get current user's cart |
| POST   | `/api/cart`     | Add item to cart        |
| PUT    | `/api/cart/:id` | Update cart item        |
| DELETE | `/api/cart/:id` | Remove cart item        |

## Orders

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | `/api/orders`     | Create an order     |
| GET    | `/api/orders`     | Get user orders     |
| GET    | `/api/orders/:id` | Get order details   |
| PUT    | `/api/orders/:id` | Update order status |

> Update the endpoint names above if your current backend uses different route paths.

---

# 🔐 Security

FloralPallete follows common web application security practices:

* Password hashing with bcrypt
* JWT-based authentication
* Protected routes and APIs
* Authentication middleware
* Environment-based secret management
* CORS configuration
* Server-side validation
* Secure payment processing
* Cloudinary credentials stored in environment variables
* Razorpay credentials stored in environment variables

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

```env
NODE_ENV=development
PORT=3002

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

FRONTEND_URL=http://localhost:5173
```

For the frontend:

```env
VITE_API_URL=http://localhost:3002
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

**Never commit `.env` files or secret credentials to GitHub.**

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

* Node.js 16+
* MongoDB / MongoDB Atlas
* Cloudinary account
* Razorpay account for payment functionality

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd FloralPallete
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Configure the backend `.env` file and start the server:

```bash
npm start
```

---

## 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

Configure `.env.local` and run:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# ☁️ Deployment

FloralPallete can be deployed using separate services for the frontend, backend, database, image storage, and payment processing.

| Service       | Purpose                   |
| ------------- | ------------------------- |
| Vercel        | Frontend deployment       |
| Render        | Backend deployment        |
| MongoDB Atlas | Cloud database            |
| Cloudinary    | Product image storage     |
| Razorpay      | Online payment processing |

Production environment variables should be configured through the respective deployment platforms.

---

# 📱 Responsive Design

The frontend is designed using Tailwind CSS with responsive layouts for:

* Desktop
* Laptop
* Tablet
* Mobile

The shopping workflow remains accessible across different screen sizes.

---

# 📈 Future Enhancements

Planned improvements include:

* 📊 Advanced owner dashboard and analytics
* 🔔 Customer order notifications
* ❤️ Wishlist and favourites
* 🔎 Advanced product filtering and search
* 🎁 Custom bouquet/event-based packages
* 📅 Flower delivery scheduling
* 📍 Delivery-area management
* 🧾 Invoice generation
* ⭐ Product reviews and ratings
* 📦 Improved inventory management
* 📈 Sales and order analytics
* 👥 Customer management for shop owners

---

# 🎯 Project Status

🟢 **Active Development**

FloralPallete currently focuses on building a complete digital workflow for a flower business, covering both sides of the platform:

```text
Customer Side
    │
    ├── Browse Products
    ├── Product Details
    ├── Cart
    ├── Checkout
    ├── Payment
    └── Orders
         
              ↕
         
Shop Side
    │
    ├── Product Management
    ├── Order Management
    └── Shop Operations
```

---

# 🤝 Contributing

Contributions and suggestions are welcome.

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Add changes
git add .

# Commit changes
git commit -m "Add your feature"

# Push branch
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 🙏 Acknowledgments

* React
* Node.js
* Express.js
* MongoDB
* Mongoose
* Tailwind CSS
* Cloudinary
* Razorpay
* Vite

---

## 📄 License

This project is developed as a **college project and full-stack web application** for a flower-shop business platform.
