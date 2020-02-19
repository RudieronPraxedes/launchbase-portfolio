const express = require ('express')

const nunjucks = require('nunjucks')

const server = express()

const videos = require("./data")

server.use (express.static('public'))

server.set ("view engine","njk")

nunjucks.configure("views",{    
    express: server,
    autoescape: false,
    noCache:true
})
server.get("/", function (req, res) {

    const about = {
        avatar_url : "https://avatars2.githubusercontent.com/u/42855373?s=400&v=4",
        name:        "Rudieron Praxedes",
        role:        "Analista de Suporte - Tubominas",
        description: "Trabalhador,estudante de programação, com 11 anos de experiência em suporte de TI.",

        links: [
            { name:   "Github",   url: "https://www.github.com/rudieronpraxedes/"},
            { name:   "Twiter",   url: "https://twitter.com/Rudieron/"},
            { name:   "Linkedin", url: "https://www.linkedin.com/in/rudieron-praxedes/"}
        ]
    }
    return res.render ("about" , {about})
})

server.get("/portfolio", function (req, res) {
    return res.render ("portfolio", {items: videos})
})


server.get("/video", function(req, res){
    
    const id = req.query.id;

    const video = videos.find (function(video){

        return video.id == id
        
    })

    if (!video){
        return res.send("video not found")
    }

   return res.render ("video", {item: video })
})

server.listen (5000, function(){
    console.log("server is running")
})

