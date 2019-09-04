module.exports = function(attribute,knex){

// 1
attribute.get('/attributes',(req,res,next)=>{
    knex('attribute').then((data)=>{
        res.send(data)
    })
})

// 2
attribute.get('/attributes/:attribute_id',(req,res,next)=>{
    var attribute_id = parseInt(req.params.attribute_id)
    knex.select('*').from('attribute').where(attribute_id,attribute_id).then((data)=>{
        
        res.send(data[attribute_id-1])
    })
})

// 3
attribute.get('/value/:attribute_id',(req,res,next)=>{
    var attribute_id = parseInt(req.params.attribute_id)
    knex.select('attribute_value_id','value').from('attribute_value').where(attribute_id,attribute_id).then((data)=>{
        res.send(data)
    })
})

// 4
attribute.get('/inproduct/:product_id',(req,res,next)=>{
    var product_id = parseInt(req.params.product_id)
    if (product_id==0){
        return res.json([]);
    }
    knex('attribute')
    .join('attribute_value','attribute.attribute_id','=','attribute_value.attribute_id')
    .join('product_attribute','attribute_value.attribute_value_id','=', 'product_attribute.attribute_value_id')
    .select("attribute_value.attribute_value_id","name","value").where('product_id',product_id)
    .then(attb => {
      res.send(attb)
    })
})

}