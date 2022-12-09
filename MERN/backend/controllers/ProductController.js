const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//create Product --ADMIN

exports.createProduct = catchAsyncErrors(async(req, res, next)=>{

    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    })
}

)
//                          async(req, res, next)=>{
//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success:true,
//         product
//     })
// }


// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async(req, res, next)=>{
    //return next(new ErrorHandler("This is my temp error", 500))
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeatures.query;

    res.status(200).json({
        success:true,
        products,
        productsCount
    })

});

// GET PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors( async(req, res, next)=>{

    let product =await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }

    res.status(200).json({
        success:true,
        product,
    })

    
});


//UPDATE PRODUCT --ADMIN
exports.updateProduct =catchAsyncErrors( async(req, res, next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 500));
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true, 
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product

    })
});


//DELETE PRODUCT

exports.deleteProduct =catchAsyncErrors( async(req, res, next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found", 500));
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }
    await product.remove()
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
});


//create New Review or update the review

exports.createProductReview = catchAsyncErrors(async(req, res, next)=>{

    const {rating, comment, productId} = req.body
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };  

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        rev=>rev.user.toString()===req.user._id.toString()
    );

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating = rating), (rev.comment=comment);
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    
    let avg = 0;

    product.reviews.forEach(rev=>{
        avg += rev.rating
    })
    product.ratings = avg/product.reviews.length;
    
    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })


});

//Get all reviews of a product

exports.getProductReviews = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success:true,
        reviews : product.reviews,
    })
});

// Delete Review

exports.deleteReview = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );
    
    // let avg = 0;

    // reviews.forEach((rev)=>{
    //     avg += rev.rating;
    // });

    // const ratings = avg / reviews.length;

    // console.log(reviews)

    let avg = 0;

    product.reviews.forEach(rev=>{
        avg += rev.rating
    })
    const ratings = avg/product.reviews.length;

    console.log(ratings)

    const numOfReviews = product.reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
    })
});