var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
})

    var campgrounds = [
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-m3rR9euBfjREfXUmnZFPj0e9_Fm6OOZPVZQNdKULzJxmIXLIg"},
        {name: "Stone Hill", image: "https://vignette.wikia.nocookie.net/fallout/images/6/6c/Wastelander_Tent_and_Sniper_Vista.jpg/revision/latest?cb=20090421132031"},
        {name: "Mountaingoat Palace", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwlqoSFG6BzyvebPd2I9JwrqfYFCK1l1FpSdOroV25CAWbVah"},
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-m3rR9euBfjREfXUmnZFPj0e9_Fm6OOZPVZQNdKULzJxmIXLIg"},
        {name: "Stone Hill", image: "https://vignette.wikia.nocookie.net/fallout/images/6/6c/Wastelander_Tent_and_Sniper_Vista.jpg/revision/latest?cb=20090421132031"},
        {name: "Mountaingoat Palace", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwlqoSFG6BzyvebPd2I9JwrqfYFCK1l1FpSdOroV25CAWbVah"}
    ]

app.get("/campgrounds", function(req,res){

    res.render("campgrounds",{campgrounds:campgrounds});
})

app.post("/campgrounds", function(req,res){
   //get data from form and ad to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);

   //redirect back to campgrounds
   res.redirect("/campgrounds");
   
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Has Started!");
})