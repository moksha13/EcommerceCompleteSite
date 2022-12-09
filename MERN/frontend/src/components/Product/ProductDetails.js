import React, { Fragment, useEffect } from "react";
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import {useSelector, useDispatch} from 'react-redux'
import { clearErrors, getProductDetails } from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import '../../App.css';
import ReviewCard from "./ReviewCard";
import Loader from '../../components/layout/Loader/Loader'


const ProductDetails = () =>{
    const dispatch = useDispatch();
    const {id} = useParams()
    const {product, loading, error} = useSelector((state)=>state.productDetails)
    console.log(id)

    useEffect(()=>{
        if(error){
            alert(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error])

    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?20:25,
        value:product.ratings,
        isHalf:true
    }

    
    return(
        <Fragment>
            {loading?
                <Loader/>:
                <Fragment>
                    <div style={{
                        display:"flex",backgroundColor: '#ffffff', padding: '6vmax', boxSizing: 'border-box', width:'100%',justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                        <div style={{width:'100%', height:'100%',marginLeft:'5%', paddingRight:'5%', backgroundSize:'cover', padding:'5%',border:"1px solid white"}}>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i)=>{
                                        return (<img
                                                //className="CarouselImage"
                                                style={{height:'60vh',width:'50vw', marginTop:'5%'}}
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                                />)
                                        
                                    })
                                }
                            </Carousel>
                        </div>
                        <div style={{width:'100%',borderTop:"1px solid white",borderBottom:"1px solid white", borderRight:"1px solid white", paddingTop:'10%', paddingBottom:'11.5%', paddingLeft:'8%'}}>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options}/>
                                <span>({product.numOfReviewa} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`RS${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button>-</button>
                                        <input value={product.stock}/>
                                        <button>+</button>
                                    </div>{" "}
                                    <button>Add to Cart</button>
                                </div>
                                    <p>
                                        Status:{" "}
                                        <b className={product.stock<1 ? "redColor":"greenColor" }>
                                            {product.stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>
                            <button className="submitReview" >Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewHeading">REVIEWS</h3>
                    {product.reviews && product.reviews[0]?(
                        <div className="reviews">
                            {product.reviews&&
                            product.reviews.map((review)=>
                                <ReviewCard review={review}/>
                            )}
                        </div>
                    ):(
                        <p className="noReview">No Reviews Yet</p>
                    )}
                </Fragment>
            }
        </Fragment>
         
    )
}

export default ProductDetails