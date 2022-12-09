import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/layout/Home/Home";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import webFont from 'webfontloader'
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products";

export default function App() {

  useEffect(()=>{
    webFont.load({
        google:{
          families:["Roboto", "Droid Sans", "Chilanka"]
        }
    })
  }, [])

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path='/product/:id' exact element={<ProductDetails />}/> 
        <Route path='/products' exact element={<Products />}/>               
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

