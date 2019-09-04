module.exports = function(shopping_cart,knex,jwt,config){
shopping_cart.get('/generateUniqueId',(req,res,next)=>{
    knex('shopping_cart').then((data)=>{
        function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;   
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
    }

        console.log(data);
        res.send(create_UUID(data))
    })
})

// add in cart
shopping_cart.post('/shoppingcart/add', (req, res, next) => {
    console.log("I am coming from the post endpoint......:)");
    var cart_id = req.body.cart_id
    console.log(cart_id)
  
    var cart_data = {
        cart_id: req.body.cart_id,
        product_id: req.body.product_id,
        attributes:req.body.attributes,
        quantity : req.body.quantity,
        buy_now:req.body.buy_now
        
    }
    var date = new Date()
    cart_data['added_on'] = date


    knex('product').select('product.name','product.price').where('product_id',cart_data.product_id).then((data)=>{
        console.log(data);

            cart_data['name'] = data[0].name;
            cart_data['price'] = data[0].price;
        knex('shopping_cart').insert(cart_data).then(()=>{
            console.log('data inserted in the shipping cart table!')
        })
        res.send('data inserted in the shipping cart table!')
    });

});


shopping_cart.get('/shoppingcart/:cart_id',(req,res,next)=>{
    var cart_id = req.params.cart_id
    knex.select('*').from('shopping_cart').where('cart_id',cart_id).then((data)=>{
        
        res.send(data)
    })
})

shopping_cart.put('/shoppingcart/update/:item_id',(req,res,next)=>{
    var item_id = req.params.item_id
    var quantity = req.body.quantity
    knex.select('*').from('shopping_cart').where('item_id',item_id).update('quantity',quantity).then((data)=>{
        
        res.send(data[item_id-1])
    })
})

shopping_cart.delete('/shoppingcart/empty/:cart_id',(req,res,next)=>{
    var cart_id =  req.params.cart_id
    knex('shopping_cart').where('cart_id',cart_id).del().then(()=>{
        res.send("deleted the cart !!!")
    })

})


shopping_cart.get('/shoppingcart/totalAmount/:cart_id',(req,res,next)=>{
    var cart_id = req.params.cart_id;
    knex('shopping_cart').select('shopping_cart.price').where('cart_id',cart_id).then((price)=>{
        console.log(price)
        var totalAmount = 0;
        totalAmount = totalAmount + price
        res.send(totalAmount)
    })

})


shopping_cart.delete('/shoppingcart/removeProduct/:item_id',(req,res,next)=>{
    var item_id =  req.params.item_id
    knex('shopping_cart').where('item_id',item_id).del().then(()=>{
        res.send("Item is removed from the cart !!!")
    })

})


}
