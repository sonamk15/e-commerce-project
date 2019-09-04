module.exports = function(department,knex){
department.get('/depart',(req,res,next)=>{
    knex('department').then((data)=>{
        res.send(data)
    })
})


department.get('/departments/:department_id',(req,res,next)=>{
    var department_id = parseInt(req.params.department_id)
    knex.select('*').from('department').where(department_id,department_id).then((data)=>{
        
        res.send(data[department_id-1])
    })
})
}
