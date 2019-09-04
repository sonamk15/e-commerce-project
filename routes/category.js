
module.exports = function(category,knex){
category.get('/categories',(re,res,next)=>{
    knex('category').then((data)=>{
        res.send(data)
    })
})

category.get('/categories/:category_id',(req,res,next)=>{
    var category_id = parseInt(req.params.category_id)
    knex.select('*').from('category').where(category_id,category_id).then((data)=>{
        
        res.send(data[category_id-1])
    })
})



category.get('/inDepartment/:department_id',(req,res,next)=>{
    var department_id = parseInt(req.params.department_id)
    knex.select('*').from('category').where(department_id,department_id).then((data)=>{
        
        res.send(data)
    })
})
}