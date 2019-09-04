// const express = require('express');
// var jwt = require('jsonwebtoken');

// const config = require('./config.js');

// const app = express();
// const knex = require('./server.js')
// app.use(express.json());
module.exports = function(customer,knex,jwt,config){

    customer.get('/',(req,res,next)=>{
        res.send('9999999999999')
    })


    // 1 CREATE A NEW CUSTOMER
customer.post('/customer',(req,res,next)=>{
    var email = req.body.email
    var customer = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    knex('customer').insert(customer).then(()=>{            
        console.log('done!!!!!!!!!!')
    
    })
    knex('customer').where('email',email).select('*').then((customerdetail) => {
        let token = jwt.sign(customer,
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
        console.log(customerdetail[0])
        res.send({customer:customerdetail[0],
            accessToken: "Bearer " + token,
            expires_in: '24h'})
        
    })
    

})

// 2 LOGIN A CUSTOMER
customer.post("/login",(request,response,next)=>{
    var email = request.body.email;
    console.log(email)
    var password = request.body.password;
    console.log(password)
    
    var bearerHeader = request.headers['authorization'];
    var token;
    console.log(bearerHeader);
    request.authenticated = false;
    if (bearerHeader){
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
    knex('customer').where('email',email).select('*').then((loginData) => {
        jwt.verify(token, config.secret, (err, decoded) =>{
            if (err){
                console.log(err);
                request.authenticated = false;
                request.decoded = null;
                next(); 
            } else {
                if (decoded.email==email && decoded.password==password){
                    response.send({customer:loginData[0],
                                    accessToken: "Bearer" +token,
                                    expires_in: '24h'}) 
                }else if(decoded.email === email){
                    response.send("please check your password....!")
                }
                else{
                    response.send("check your email and password","email-"+email,"password-"+password)
                }
            }

        })
        });
    }
});

// 3 GET A CUSTOMER BY ID
customer.get('/get/:customer_id',(req,res,next)=>{
    console.log("pavan")
    var customer_id = parseInt(req.params.customer_id)
    console.log(customer_id);
    knex.select("*").from('customer').where('customer_id',customer_id).then((coustomerdetails)=>{
       return res.send(coustomerdetails[0])
    })
})

// 4 UPDATE CUSTOMER DETAILS

customer.put('/customer/:customer_id',(req,res,next)=>{
    var customer_id = req.params.customer_id;

    var customer={
        day_phone:req.body.day_phone,
        eve_phone:req.body.eve_phone,
        mob_phone:req.body.mob_phone
    }

    var bearerHeader = req.headers['authorization'];
    var token;
    console.log(bearerHeader);
    req.authenticated = false;
    if (bearerHeader){
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
        knex.select("*").from('customer').where('customer_id',customer_id).then((coustomerdetails)=>{
        jwt.verify(token, config.secret, (err, decoded) =>{
                if (decoded.email==coustomerdetails[0].email && decoded.password==coustomerdetails[0].password){
                    console.log("333333333")
                    knex('customer').where({ 'customer_id': customer_id }).update(customer).then(()=>{
                        console.log("done!!!!")
                        res.send("done")
                })

            }
        })
    })
    }  
})

// 5 UPDATE CUSTOMER ADDRESS

customer.put('/customeradd/:customer_id',(req,res,next)=>{
    var customer_id = req.params.customer_id;
    var customerAdd = {
        address_1:req.body.address_1,
        address_2:req.body.address_2,
        city:req.body.city,
        region:req.body.region,
        postal_code:req.body.region,
        shipping_region_id:req.body.shipping_region_id
    }
    
    var bearerHeader = req.headers['authorization'];
    var token;
    console.log(bearerHeader);
    req.authenticated = false;
    if (bearerHeader){
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
        knex.select("*").from('customer').where('customer_id',customer_id).then((coustomerdetails)=>{
        jwt.verify(token, config.secret, (err, decoded) =>{
                if (decoded.email==coustomerdetails[0].email && decoded.password==coustomerdetails[0].password){
                    console.log("333333333")
                    knex('customer').where({ 'customer_id': customer_id }).update(customerAdd).then(()=>{
                        console.log("done!!!!")
                        res.send("done")
                })

            }
        })
    })
    }  
})


// 6 UPDATE CUSTOMER CREDIT CARD

customer.put('/creditCard/:id',(req,res,next)=>{
    var customer_id = req.params.id;
    var customerCard = {
        credit_card : req.body.credit_card
    }
    var bearerHeader = req.headers['authorization'];
    var token;
    console.log(bearerHeader);
    req.authenticated = false;
    if (bearerHeader){
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
        knex.select("*").from('customer').where('customer_id',customer_id).then((coustomerdetails)=>{
        jwt.verify(token, config.secret, (err, decoded) =>{
                if (decoded.email==coustomerdetails[0].email && decoded.password==coustomerdetails[0].password){
                    console.log("333333333")
                    knex('customer').where({ 'customer_id': customer_id }).update(customerCard).then(()=>{
                        console.log("done!!!!")
                        res.send("done")
                })

            }
        })
    })
    }  
})

// 7 FACEBOOK LOGIN

customer.post('facebook',(req,res,next)=>{
    var bearerHeader = req.body.access_token
    var email = req.body.email
    // var bearerHeader = request.headers['authorization'];
    var token;
    console.log(bearerHeader);
    req.authenticated = false;
    if (bearerHeader){
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
    knex('customer').where('email',email).select('*').then((loginData) => {
        var email = loginData[0].email
        var password = loginData[0].password
        jwt.verify(token, config.secret, (err, decoded) =>{
            if (err){
                console.log(err);
                req.authenticated = false;
                req.decoded = null;
                next(); 
            } else {
                if (decoded.email==email && decoded.password==password){
                    res.send(loginData[0]) 
                }else if(decoded.email === email){
                    res.send("please check your password....!")
                }
                else{
                    res.send("check your email and password","email-"+email,"password-"+password)
                }
            }

        })
        });
    }

})
}