
module.exports = function({accountManager}){
	
	const express = require('express')
	const router = express.Router()

	router.get("/", function(request, response){

		response.render("login.hbs")
	})

	router.post("/", function(request, response){

		const username = request.body.username
		const userPassword = request.body.password
		const validationErrors = []
		if (username && userPassword) {
			accountManager.getAccount(username, userPassword, function(errors, account){
				if(errors != ""){
					response.send("<h1><b>Something went wrong</b></h1>")
					return
				}
				else if(account.length != ""){
					request.session.isLoggedIn = true
					request.session.username = username
					response.redirect("/blogposts")
				}else{
					validationErrors.push("Wrong username/password!")
					const model = {
						validationErrors
					}
					response.render("login.hbs", model)
				}
			})
		}	
	})
	return router 
}