module.exports = function(order,knex){
order.post('/orders',(req,res,next)=>{
    var order = { 
        cart_id : req.body.cart_id,
        tax_id:req.body.tax_id,
        shipping_id:req.body.shipping_id,
        status:req.body.status
    }
    var date = new Date()
    order['created_on'] = date
     knex('shopping_cart').where('cart_id',order.cart_id).then((data)=>{
        knex('shopping_cart').select('shopping_cart.price').then((price)=>{
        let totalAmount = 0;
        for (let index = 0; index < price.length; index++) {
            totalAmount+=(price[index].price)
        } 
        order['total_amount']=totalAmount
        knex('orders').insert(order).then(()=>{
        console.log('done!!')
        res.send("done")
        })
        // knex('orders').then((orderID)=>{
        //     res.send(orderID)
        // })

        })
    })

})

var order_item = []
order.get('/order/:order_id',(req,res,next)=>{
    var order_id = parseInt(req.params.order_id)
  
    knex.select('*').from('shopping_cart').then((data)=>{
        // res.send(data)
        var order={
        product_id:data[0].product_id,
        attributes:data[0].attributes,
        product_name:data[0].name,
        quantity:data[0].quantity
        }
        order["unit_cost"]= "14.99"
        order["subtotal"]= "14.99" 
        // res.send(order)
        order_item.push(order)
        var customer = {
            order_id:order_id,
            order_items:order_item
        }
        res.send(customer)
    })

})

order.get('/incustomer',(req,res,next)=>{
    knex('orders').select('total_amount','created_on','shipped_on','status')
    .then((attb) => {
      res.send(attb)
    }) 
})


order.get('/customer/shortDetail/:id',(req,res,next)=>{
    var order_id = req.params.id
  
    knex('orders').select('total_amount','created_on','shipped_on','status').where('order_id',order_id)
    .then((attb) => {
      res.send(attb)
    }) 
})

}