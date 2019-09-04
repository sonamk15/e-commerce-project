module.exports = function(tax,knex){
tax.get('/tax/:tax_id',(req,res,next)=>{
    var tax_id = parseInt(req.params.tax_id)
    knex.select('*').from('tax').where(tax_id,tax_id).then((data)=>{
        
        res.send(data[tax_id-1])
    })
})
}



