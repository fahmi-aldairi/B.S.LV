// /* eslint-disable react/jsx-no-comment-textnodes */
// import "../Style/raw.css";
// import { styled } from "@mui/material/styles";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Chip from "@mui/material/Chip";
// import HomeIcon from "@mui/icons-material/Home";

// import pageLogo from "../images/Group9.png";
// import prd1 from "../images/product-1.jpg";
// import prd2 from "../images/product-2.jpg";
// import prd3 from "../images/product-3.jpg";
// import { useContext, useState } from "react";
// import { HashLink } from "react-router-hash-link";

// /////
// const WhiteSeparator = styled("span")({
//   backgroundColor: "#fff",
//   width: "1px",
//   height: "15px",
//   margin: "0 8px",
// });

// const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
//   backgroundColor: "#8B4403",
//   height: theme.spacing(3.5),
//   color: "#fff",
//   fontWeight: theme.typography.fontWeightRegular,
//   "&:hover, &:focus": {
//     backgroundColor: "#FFD966",
//     color: "#8B4403",
//   },
// }));
// /////
// const newBackColor = {
//   background: "#FFD966",
// };

// const AllProducts = {
//   cakeProds: [
//     {
//       id: 1,
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/1.Prima_220x.png?v=1659425535",
//       title: "Prima Prima Flour 1",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       id: 2,
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/1.Prima_220x.png?v=1659425535",
//       title: "Prima Prima Flour 2",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       id: 3,
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/1.Prima_220x.png?v=1659425535",
//       title: "Prima Prima Flour 3",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       id: 4,
//       img: "https://www.al-mahmoudia.com/assets/img/Chocolate/1.png",
//       title: "Prima Prima Flour 4",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//   ],
//   breadProds: [
//     {
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/Screenshot2021-09-23at10.48.36AM_220x.png?v=1659425686",
//       title: "Prima Prima Flour br 1",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/3.Clover_220x.png?v=1659425291",
//       title: "Prima Prima Flour br 2",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/4.Fairy_220x.png?v=1659425317",
//       title: "Prima Prima Flour br 3",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/2.Ikan_220x.png?v=1659425408",
//       title: "Prima Prima Flour br 4",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//   ],
//   cookiesProds: [
//     {
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/5.Featherlite_220x.png?v=1659425370",
//       title: "Prima Prima Flour co 1",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/5.Featherlite_220x.png?v=1659425370",
//       title: "Prima Prima Flour co 2",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/5.Featherlite_220x.png?v=1659425370",
//       title: "Prima Prima Flour co 3",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//     {
//       img: "https://cdn.shopify.com/s/files/1/0523/4081/8080/products/5.Featherlite_220x.png?v=1659425370",
//       title: "Prima Prima Flour co 4",
//       desc: "Ipsum ipsum clita erat amet dolor sit justo sea eirmod diam stet sit justo",
//       price: "15.00",
//       weigth: "5",
//     },
//   ],
// };

// function Raw() {
//   const CakeProds = AllProducts.cakeProds;
//   const BreadProds = AllProducts.breadProds;
//   const CookiesProds = AllProducts.cookiesProds;

//   const [cakeStyle, setCakeStyle] = useState({});
//   const [breadStyle, setbreadStyle] = useState({});
//   const [CookiesStyle, setCookiesStyle] = useState({});
//   // setProducts("cakeProds");

//   const handleCakeClick = (e) => {
//     e.preventDefault();
//     setCakeStyle(newBackColor);
//     setCookiesStyle();
//     setbreadStyle();
//   };

//   const handleBreadClick = (e) => {
//     e.preventDefault();
//     setbreadStyle(newBackColor);
//     setCakeStyle();
//   };

//   const handleCookiesClick = (e) => {
//     e.preventDefault();
//     setCookiesStyle(newBackColor);
//     setCakeStyle();
//   };

//   let [imgg, setImg] = useState("");
//   let [titlee, setTitle] = useState("");
//   let [descc, setDesc] = useState("");
//   let [pricee, setPrice] = useState("");
//   let [weightt, setWeight] = useState("");
//   let [quantity, setQuantity] = useState("");
//   const [isItemAdded, setIsItemAdded] = useState(false);

//   const handleAddTocart = () => {
//     setIsItemAdded(true);
//     const inCartPrds = JSON.parse(localStorage.getItem("ProductInCart")) || [];

//     const userPrd = { imgg, titlee, descc, pricee, weightt, quantity };
//     inCartPrds.push(userPrd);
//     localStorage.setItem("ProductInCart", JSON.stringify(inCartPrds));

//     setImg("");
//     setDesc("");
//     setPrice("");
//     setTitle("");
//     setWeight("");
//     setQuantity("");
//   };

//   return (
//     <>
//       {/* Page Header Start */}
//       <div className="container-fluid page-header py-6 d-flex flex-column-reverse justify-content-center ">
//         <div className="container text-center py-5">
//           <h1 className="display-4 mb-3" style={{ color: "#FFD966" }}>
//             Raw Materials
//           </h1>
//           <div className="d-flex justify-content-center">
//             <Breadcrumbs aria-label="breadcrumb" separator={<WhiteSeparator />}>
//               <StyledBreadcrumb
//                 component="a"
//                 href="/"
//                 label="Home"
//                 icon={<HomeIcon fontSize="small" color="#8B4403" />}
//               />
//               <StyledBreadcrumb component="a" label="Raw Materials" />
//             </Breadcrumbs>
//           </div>
//         </div>
//       </div>
//       {/* Page Header End */}
//       <main className="mx-4">
//         <div className="container-fluid main-container w-100 pb-5">
//           <img className="logo" src={pageLogo} alt="#" />
//           <div
//             className="text-center prdHdCon mx-auto mb-2"
//             style={{ maxWidth: "700px" }}
//           >
//             <h6 className="text-uppercase mb-2">Bakery-Solutions Products</h6>
//             <h1 className="display-6 mb-4">
//               Explore The Categories Of Our Products
//             </h1>
//           </div>
//           <div className="row g-4 mainPro">
//             <div className="col-lg-4 col-md-6">
//               <div
//                 className="product-item d-flex flex-column rounded-4 overflow-hidden h-100"
//                 style={cakeStyle}
//               >
//                 <div className="text-center p-4">
//                   <h3 className="mb-3">Cake</h3>
//                   <span>
//                     We are committed to providing our customers with amazing
//                     cakes recipes, exceptional value and a customer service
//                     experience that is second to none.
//                   </span>
//                 </div>
//                 <div className="position-relative mt-auto">
//                   <img className="img-fluid" src={prd1} alt="" />
//                   <div className="product-overlay">
//                     <a
//                       className="btn eyeBtn btn-lg-square btn-outline-light rounded-circle"
//                       href=""
//                       onClick={handleCakeClick}
//                     >
//                       <i className="fa fa-eye" style={{ color: "#8b4403" }} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-4 col-md-6">
//               <div
//                 className="product-item d-flex flex-column rounded-4 overflow-hidden h-100"
//                 style={breadStyle}
//               >
//                 <div className="text-center p-4">
//                   <h3 className="mb-3">Bread</h3>
//                   <span>
//                     Our passion is reflected in our breads that fall apart in
//                     your mouth, equally flavorful and simply incomparable to
//                     anything you have had before.
//                   </span>
//                 </div>
//                 <div className="position-relative mt-auto">
//                   <img className="img-fluid" src={prd2} alt="" />
//                   <div className="product-overlay">
//                     <a
//                       className="btn eyeBtn btn-lg-square btn-outline-light rounded-circle"
//                       href=""
//                       onClick={handleBreadClick}
//                     >
//                       <i className="fa fa-eye" style={{ color: "#8b4403" }} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-4 col-md-6">
//               <div
//                 className="product-item d-flex flex-column rounded-4 overflow-hidden h-100"
//                 style={CookiesStyle}
//               >
//                 <div className="text-center p-4">
//                   <h3 className="mb-3">Cookies</h3>
//                   <span>
//                     Tempor erat elitr rebum at clita dolor diam ipsum sit diam
//                     amet diam et eos
//                   </span>
//                 </div>
//                 <div className="position-relative mt-auto">
//                   <img className="img-fluid" src={prd3} alt="" />
//                   <div className="product-overlay">
//                     <a
//                       className="btn eyeBtn btn-lg-square btn-outline-light rounded-circle"
//                       href=""
//                       onClick={handleCookiesClick}
//                     >
//                       <i className="fa fa-eye" style={{ color: "#8b4403" }} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* ??? */}
//           {/* {showCakeList && <CakeList />} */}
//           <div id="tab-1" className="tab-pane fade p-0 active show mb-5 ">
//             <div className="row g-3">
//               <>
//                 {Products === "cakeProds" ? (
//                   <>
//                     {CakeProds.map((e, i) => {
//                       return (
//                         <div className="col-lg-6" key={i}>
//                           <div className="d-flex h-100">
//                             <div className="flex-shrink-0">
//                               <img
//                                 className="img-fluid"
//                                 src={e.img}
//                                 alt=""
//                                 style={{ width: 150, height: 180 }}
//                               />
//                               <h4 className="bg-dark text-primary p-2 m-0">{`$ ${e.price}`}</h4>
//                             </div>
//                             <div className="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
//                               <h5 className="text-uppercase">{e.title}</h5>
//                               <h5 className="text-uppercase">{`${e.weigth} Kg`}</h5>
//                               <span>{e.desc}</span>
//                               <div className="d-flex flex-row justify-content-end">
//                                 <HashLink smooth>
//                                   <button
//                                     className="btn btn-outline-dark flex-shrink-0"
//                                     type="button"
//                                     onClick={handleAddTocart}
//                                   >
//                                     Add to cart
//                                   </button>
//                                 </HashLink>
//                               </div>
//                               <div className="d-none">
//                                 {" "}
//                                 {
//                                   ((imgg = e.img),
//                                   (titlee = e.title),
//                                   (descc = e.desc),
//                                   (pricee = e.price),
//                                   (weightt = e.weigth),
//                                   (quantity = 1))
//                                 }
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </>
//               <>
//                 {Products === "breadProds" ? (
//                   <>
//                     {BreadProds.map((e, i) => {
//                       return (
//                         <div className="col-lg-6" key={i}>
//                           <div className="d-flex h-100">
//                             <div className="flex-shrink-0">
//                               <img
//                                 className="img-fluid"
//                                 src={e.img}
//                                 alt=""
//                                 style={{ width: 150, height: 180 }}
//                               />
//                               <h4 className="bg-dark text-primary p-2 m-0">{`$ ${e.price}`}</h4>
//                             </div>
//                             <div className="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
//                               <h5 className="text-uppercase">{e.title}</h5>
//                               <h5 className="text-uppercase">{`${e.weigth} Kg`}</h5>
//                               <span>{e.desc}</span>
//                               <div className="d-flex flex-row justify-content-end">
//                                 <HashLink smooth to="">
//                                   <button
//                                     className="btn btn-outline-dark flex-shrink-0"
//                                     type="button"
//                                     onClick={handleAddTocart}
//                                   >
//                                     Add to cart
//                                   </button>
//                                 </HashLink>
//                               </div>
//                               <div className="d-none">
//                                 {
//                                   ((imgg = e.img),
//                                   (titlee = e.title),
//                                   (descc = e.desc),
//                                   (pricee = e.price),
//                                   (weightt = e.weigth),
//                                   (quantity = 1))
//                                 }
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </>
//               <>
//                 {Products === "cookiesProds" ? (
//                   <>
//                     {CookiesProds.map((e, i) => {
//                       return (
//                         <div className="col-lg-6" key={i}>
//                           <div className="d-flex h-100">
//                             <div className="flex-shrink-0">
//                               <img
//                                 className="img-fluid"
//                                 src={e.img}
//                                 alt=""
//                                 style={{ width: 150, height: 180 }}
//                               />
//                               <h4 className="bg-dark text-primary p-2 m-0">{`$ ${e.price}`}</h4>
//                             </div>
//                             <div className="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
//                               <h5 className="text-uppercase">{e.title}</h5>
//                               <h5 className="text-uppercase">{`${e.weigth} Kg`}</h5>
//                               <span>{e.desc}</span>
//                               <div className="d-flex flex-row justify-content-end">
//                                 <HashLink smooth to="">
//                                   <button
//                                     className="btn btn-outline-dark flex-shrink-0"
//                                     type="button"
//                                     onClick={handleAddTocart}
//                                   >
//                                     Add to cart
//                                   </button>
//                                 </HashLink>
//                               </div>
//                               <div className="d-none">
//                                 {
//                                   ((imgg = e.img),
//                                   (titlee = e.title),
//                                   (descc = e.desc),
//                                   (pricee = e.price),
//                                   (weightt = e.weigth),
//                                   (quantity = 1))
//                                 }
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </>
//             </div>
//           </div>
//           {/* //////////// */}
//         </div>
//         {/* Cart */}
//         {isItemAdded && (
//           <HashLink
//             smooth
//             to="/cart/#"
//             className="btn btn-lg btn-lg-square rounded-circle back-to-top"
//             style={{ backgroundColor: "#8b4403" }}
//           >
//             <i
//               className="fa fa-shopping-cart"
//               style={{ color: "#fff2cc", fontSize: "1.5rem" }}
//             />
//           </HashLink>
//         )}
//       </main>
//     </>
//   );
// }

// export default Raw;
