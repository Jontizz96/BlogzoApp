
module.exports = function({toDoRepository}){

    return {

        getValidationErrors: function(name, isLoggedIn){

            const errors = []

            if(name.length == 0){
                errors.push("Need to write something!")
            }
            else if(name.length < 5){
                errors.push("Name to short!")
            }
            else if(name.length > 20){
                errors.push("Name to long!")
            }
            else if(!isLoggedIn){
                errors.push("Need to be logged in!")
            }
            return errors

        },

        getAllToDos: function(userId, isLoggedIn, callback){
            
            const errors = this.getValidationErrors(0, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{
                toDoRepository.getAllToDos(userId, function(errors, toDos){
                    
                    callback(errors, toDos)
                })
            }
        },

        getToDoId: function(todoId, isLoggedIn, callback){
            
            const errors = this.getValidationErrors(0, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{
                toDoRepository.getToDoId(todoId, function(errors, todo){
                   
                    callback(errors, todo)
                })
            }   
        },

        createTodo: function(userId, newTodo, isLoggedIn, callback){

            const errors = this.getValidationErrors(newTodo, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{
                toDoRepository.createTodo(userId, newTodo, function(errors, todo){
                    
                    callback(errors, todo)
                })
            }
        },

        deleteTodo: function(todoId, isLoggedIn, callback){

            const errors = this.getValidationErrors(0, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{
                toDoRepository.deleteTodo(todoId, function(errors, todo){
                    
                    callback(errors, todo)
                })
            }
        },

        updateTodo: function(todoId, updateTodo, isLoggedIn, callback){
            
            const errors = this.getValidationErrors(updateTodo, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
            }else{
                toDoRepository.updateTodo(todoId, updateTodo, function(errors, todo){
                    
                    callback(errors, todo)
                })
            }
        }
    }
}

