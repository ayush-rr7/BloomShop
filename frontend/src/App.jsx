import { Routes, Route } from "react-router-dom";

import ProtectedLayout from "./routes/ProtectedLayout.jsx";
import PublicLayout from "./routes/PublicLayout.jsx";
import OwnerLayout from "./routes/OwnerLayout.jsx";

import Navbar from "./component/Nav.jsx";
import Footer from "./component/Footer.jsx";

// Public
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
// import Services from "./pages/Services.jsx";
// import ServiceDetail from "./pages/ServiceDetail.jsx";

// Auth
import Register from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import MyAccount from "./pages/MyAccount.jsx";

// Customer
import Cart from "./pages/Cart.jsx";
import Favourite from "./pages/Favourite.jsx";
import Orders from "./pages/Orders.jsx";
import Checkout from "./pages/Checkout.jsx";

// Owner
import Dashboard from "./pages/Dashboard.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import ManageOrders from "./pages/ManageOrders.jsx";
// import ManageProducts from "./pages/ManageProducts.jsx";
// import ManageOrders from "./pages/ManageOrders.jsx";

import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">

        <Routes>

          {/* ================= PUBLIC ================= */}

          <Route element={<PublicLayout />}>

            <Route path="/" element={<Home />} />

            <Route
              path="/products"
              element={<ProductList />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />

            {/* <Route
              path="/services"
              element={<Services />}
            />

            <Route
              path="/service/:id"
              element={<ServiceDetail />}
            /> */}

            <Route
              path="/signup"
              element={<Register />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route path="/contact" element={<Contact />} />

          </Route>


          {/* ================= CUSTOMER ================= */}

          <Route element={<ProtectedLayout />}>
              

            <Route
              path="/account"
              element={<MyAccount/>}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/Favourite"
              element={<Favourite />}
            />

            <Route
              path="/account"
              element={<MyAccount />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

          </Route>


          {/* ================= OWNER ================= */}

          <Route element={<OwnerLayout />}>

            <Route
              path="/admin"
              element={<Dashboard />}
            />
           
            {/* <Route
              path="/admin/products"
              element={<ManageProducts />}
              /> */}
              <Route path="/admin/products" element={<ProductList />} />
            <Route
              path="/admin/products/create"
              element={<CreateProduct />}
            />
              <Route
                  path="/admin/products/edit/:id"
                  element={<CreateProduct />}
                />

            <Route
              path="/admin/orders"
              element={<ManageOrders />}
              /> *
              {/* 
            <Route
              path="/admin/orders"
              element={<ManageOrders />}
            /> */}
            
            <Route
              path="/admin/account"
              element={<MyAccount />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;

