import React, { Fragment, useEffect } from "react";
import './Home.css';
import {TfiMouse} from 'react-icons/tfi'
import ProductCard from "./ProductCard.js";
import MetaData from "../MetaData";
import {clearErrors, getProduct} from "../../../redux/actions/productActions";
import {useSelector, useDispatch} from 'react-redux'
import Loader from "../Loader/Loader";


// const product = {
//     name:"jdnv shirt",
//     images:[{url:'https://m.media-amazon.com/images/I/51l0IKLDJCL._UL1100_.jpg'}],
//     price:"3000Rs",
//     _id:"moksha"
// }

const Home =()=>{
    const dispatch = useDispatch();
    const {loading,error, products, productsCount} =  useSelector(state=>state.products)

    useEffect(()=>{
        if(error){
            alert(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    },[dispatch, error]);

    return(
        <Fragment>
            {loading?
            <Loader/>
            :(<Fragment>
                <MetaData title="MOKSHA"/>
                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

                    <a href="#container">
                        <button>Scroll <TfiMouse/> </button>
                    </a>
                </div>
                <h2 className="homeHeading">Featured Products</h2>
                <div className="container" id="container">
                    {/* <Product product={product}/> */}
                    {products&& products.map(product=>(
                        <ProductCard product={product} key={product._id}/>
                    ))}
                    
                </div>
            </Fragment>
            )

            }
        </Fragment>
    )
}

export default Home