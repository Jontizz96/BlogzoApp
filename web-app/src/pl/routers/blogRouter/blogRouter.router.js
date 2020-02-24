const express = require('express')
const router = express.Router()
const multer = require('multer')
const blogManager = require('../../../bll/blog-manager')
const blogRepo = require('../../../dal/blog-repository')
var upload = multer({ dest: './pl/public/blogpost-img' })

const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, __dirname + '../../../public/blogpost-img')
    },
    filename: function(request, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
})
var upload = multer({ storage: storage}).single('imageFile')

router.get("/", function(request, response){

    blogManager.getAllBlogposts(function(errors, blogposts){
        const model = {
            errors: errors,
            blogposts: blogposts
        }
        response.render("blogposts.hbs", model)
    })
})

router.get("/create", function(request, response){

    response.render("create-blogpost.hbs")
})

router.post('/create', upload.single('imageFile'), function(request, response, next){
    const file = request.body.file

    if(!file){
        const error = new Error("please upload a file")
        error.httpStatusCode = 400
        return next(error)
    }
    response.send(file)
})

router.get("/:blogId", function(request, response){

    const blogId = request.params.blogId
    blogRepo.getBlogpostId(blogId, function(errors, blogpost){
        const values = blogpost[0]
        const title = blogpost[0]
        const content = blogpost[2]
        const posted = blogpost[3]
        const imageFile = blogpost[4]
        const userId = blogpost[5]

        const model = {
            errors: errors,
            blogpost: blogpost[0]
        }
        console.log("model:", model)
        response.render("blogpost.hbs", model)
    })
})


router.post("/create", upload, function(request, response, next){

    const title = request.body.title
    const content = request.body.content
    const posted = request.body.posted
    const userId = 1
    const file = request.file.originalname

    if(!file){
        const error = new Error("please upload a file")
        error.httpStatusCode = 400
        return next(error)
    }
   
    blogRepo.createBlogpost(title, content, posted, file, userId, function(error, blogId){

        if(error){
            response.send(
                '<h1><b>Something went wrong</b></h1>'
            )
        }else{
            response.redirect("/blogposts/"+blogId)
        }
    })
})


module.exports = router