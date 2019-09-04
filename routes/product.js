module.exports = function(product,knex){
product.get('/products',(re,res,next)=>{
    knex('product').then((data)=>{
        console.log(data);
        res.send(data)
    })
})

product.get('/products/:search_value',(req,res,next)=>{
    var search_value  = req.params.search_value;
    if(search_value.length<3){
        res.send("can't search")
    }else{knex.select('*').from('product').where('name','like',  '%' +  search_value + '%').where('description','like',  '%' +search_value + '%').where('image','like',  '%' +search_value + '%').then((data)=>{
    res.send(data)
    })}
})

product.get('/products/:product_id',(req,res,next)=>{
    var product_id = parseInt(req.params.product_id)
    knex.select('*').from('product').where(product_id,product_id).then((data)=>{
        
        res.send(data[product_id-1])
    })
})


product.get('/products/inCategory/:category_id',(req,res,next)=>{
    var category_id = parseInt(req.params.category_id);
    knex.select('*').from('product').join('category','category.category_id','product.product_id').then((data)=>{
        
        res.send(data[category_id-1])
    })
})

//GET ALL PRODUCTS IN A DEPARTMENT
product.get('/products/inDepartment/:department_id',(req,res,next)=>{
    var department_id = parseInt(req.params.department_id);
    knex.select('*').from('product').join('department','department.department_id','product.product_id').then((data)=>{
        console.log(data)
        res.send(data[department_id-1])
    })
})

//GET REVIEWS OF A PRODUCT

product.get('/products/:product_id/reviews',(req,res,next)=>{
    var product_id = parseInt(req.params.product_id);
    knex.select('*').from('product').join('product_review','product_review.id','product.product_id').then((data)=>{
        res.send(data[product_id-1])
    })

    });

//GET REVIEWS OF A PRODUCT[POST]
// .............................................................................

product.post('/products/:product_id/reviews', (req, res, next) => {
    console.log("I am coming from the post endpoint......:)");
    var review_data = {
        review: req.body.review,
        rating: req.body.rating,
        product_id: req.body.product_id,
        name:req.body.name
    }
    knex('product_review').insert(review_data).then((data)=> {
        var name = verify();
        console.log(name)
        res.send(data);
    })
});

}