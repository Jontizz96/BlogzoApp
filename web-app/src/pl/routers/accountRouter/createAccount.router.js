
module.exports = function({accountManager}){
    
    const express = require('express')
    const router = express.Router()

    router.get("/", function(request, response){

        response.render("create-account.hbs")
    })

    router.post("/", function(request, response){

        const email = request.body.email
        const username = request.body.username
        const userPassword = request.body.userPassword
        const userPassword2 = request.body.userPassword2
           
        accountManager.createAccount(username, email, userPassword, userPassword2, function(errors, account){
            if(errors != ""){
                const model = {
                    errors: errors
                }
                response.render("create-account.hbs", model)
            }            
            else if(account.lenght != ""){
                request.session.userId = account
                response.redirect("/login")
            }
        })
    })
    return router
}