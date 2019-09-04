
module.exports = function(shipping,knex){

shipping.get('/',(req,res,next)=>{
    console.log('9999999999999999999')
    knex('shipping_region').then((data)=>{
        return res.send(data)
    })
})


shipping.get('/res',(req,res,next)=>{
    knex('shipping').then((data)=>{
        res.send(data)
    })
})

}

