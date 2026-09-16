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
          </Route>

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;


// import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedLayout from "./routes/ProtectedLayout.jsx";
// import PublicLayout from "./routes/PublicLayout.jsx";
// //Component
// import Navbar from './component/Nav.jsx'
// import Footer from './component/Footer.jsx'
// import FullScreenLoader from './component/fullScreenLoader.jsx'

// import Home from './pages/Home.jsx'
// import Dashboard from './pages/Dashboard.jsx'

// //Auth
// import Register from './pages/Signup.jsx'
// import Login from './pages/Login.jsx'
// import MyAccount from './pages/MyAccount.jsx'

// //Profile
// import CreateProfile from './pages/CreateProfile.jsx'
// import ProductList from './pages/ProductList.jsx'
// import ProductDetail from './pages/ProductDetail.jsx'

// import { useAuth } from './context/AuthContext.jsx'


// // const {profiles} = useAuth();

// function App() {
//   const [count, setCount] = useState(0)
//   const { loading } = useAuth();
  
//   return (
//     <div className="min-h-screen flex flex-col">
    
//       <Navbar/> {/* Common across all pages */}
//        <main className="flex-1">
//       <Routes>  
//           <Route element={<PublicLayout />}>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/signup" element={<Register/>}/>
//         <Route path="/login" element={<Login/>}/>
        
//         {/* <Route path="/dashboard" element ={<Dashboard/>}/> */}
//         {/* <Route path="/profiles" element={<ProductList/>}/>
//         <Route path="/product/:id" element={<ProductDetail/>}/> */}
//          </Route>

         
//          <Route element={<ProtectedLayout />}>
//           <Route path="/profiles" element={<ProductList/>}/>
//         <Route path="/product/:id" element={<ProductDetail/>}/>
//                  <Route path="/dashboard" element ={<Dashboard/>}/>

//         <Route path="/Account" element={<MyAccount/>}/>
//         <Route path="/register" element={<CreateProfile />} />
//         {/* <Route path="/profile/edit/:id" element={<CreateProfile />} /> */}
//         </Route>

//         </Routes> 
//        </main>
//         <Footer/>   
//     </div>
//   )
// }

// export default App








// //match
// import MatchesPage from './pages/MatchPage.jsx';
// import PartnerPreferences from './pages/PartnerPreferences.jsx'
// //chat
// import Connection from './pages/Connections.jsx'
// import ChatConnection from './pages/ChatConnection.jsx'
// import Chat from './pages/Chat.jsx'
{/* 
  <Route path="/PartnerPreferences" element={<PartnerPreferences />} />
  <Route path="/matches" element={<MatchesPage/>}/>
  
  <Route path="/connections" element={<Connection />} />
  <Route path="/Chat" element={<ChatConnection />} />
  <Route path="/Chat/:id" element={<Chat />} /> */}
