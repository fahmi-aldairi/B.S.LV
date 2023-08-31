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
import { LangBtn, LangProvider } from "./Components/Context/langBtn";
import Cart from "./Components/Cart";
import CheckOut from "./Components/checkOut";
import Raw2 from "./Components/raw2";
import ProductCard from "./Components/SubComponents/card";
import ProductDetails from "./Components/SubComponents/productdetails";
import Testimonial from "./Components/SubComponents/testimonial";
import Policy from "./Components/SubComponents/policy";
import ErrorPage from "./Components/404page";
import Pay from "./Components/pay";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <BackToTopProvider>
            <LangProvider>
              <Nav />
              <BackToTopButton />
              <LangBtn />
              <Routes>
                <Route index element={<Main />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="Reg" element={<Reg />} />
                <Route path="Raw2" element={<Raw2 />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<CheckOut />} />
                <Route path="ProductCard" element={<ProductCard />} />
                <Route path="prodDetails/:id" element={<ProductDetails />} />
                <Route path="Testimonial" element={<Testimonial />} />
                <Route path="ErrorPage" element={<ErrorPage />} />
                <Route path="Pay" element={<Pay />} />
                <Route path="profile" element={<Profile />} />
                <Route path="policy" element={<Policy />} />
                <Route path="/*" element={<ErrorPage />} />
              </Routes>
              <Footer />
            </LangProvider>
          </BackToTopProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
