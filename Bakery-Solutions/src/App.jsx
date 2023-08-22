import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Components/nav";
import Main from "./Components/main";
import Footer from "./Components/footer";
import About from "./Components/about";
import Contact from "./Components/contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Reg from "./Components/registration";
import { AuthContextProvider } from "./Components/Context/AuthContext";
import { BackToTopButton, BackToTopProvider } from "./Components/Context/ToTop";
// import Raw from "./Components/raw";
import Cart from "./Components/Cart";
import CheckOut from "./Components/checkOut";
import Payment from "./Components/payment";
import Calculator from "./Components/calculator";
import Raw2 from "./Components/raw2";
import ProductCard from "./Components/SubComponents/card";
import ProductDetails from "./Components/SubComponents/productdetails";
import Testimonial from "./Components/SubComponents/testimonial";
import ErrorPage from "./Components/404page";
import Spinner from "./Components/SubComponents/spinner";
import Pay from "./Components/pay";
import Profile from "./Components/Profile";
// import { AuthContext } from "./Components/Context/AuthContext";
// import { useContext } from "react";

function App() {
  // const { auth, setAuth } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <BackToTopProvider>
            <Nav />
            <BackToTopButton />
            <Routes>
              <Route index element={<Main />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="Reg" element={<Reg />} />
              {/* <Route path="Raw" element={<Raw />} /> */}
              <Route path="Raw2" element={<Raw2 />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<CheckOut />} />
              <Route path="payment" element={<Payment />} />
              <Route path="calculator" element={<Calculator />} />
              <Route path="ProductCard" element={<ProductCard />} />
              <Route path="prodDetails/:id" element={<ProductDetails />} />
              <Route path="Testimonial" element={<Testimonial />} />
              <Route path="ErrorPage" element={<ErrorPage />} />
              <Route path="Spinner" element={<Spinner />} />
              <Route path="Pay" element={<Pay />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
            <Footer />
          </BackToTopProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
