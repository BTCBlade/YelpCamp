var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-m3rR9euBfjREfXUmnZFPj0e9_Fm6OOZPVZQNdKULzJxmIXLIg"},
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else 
//         {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     } )

//  var campgrounds = [
//         {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-m3rR9euBfjREfXUmnZFPj0e9_Fm6OOZPVZQNdKULzJxmIXLIg"},
//         {name: "Stone Hill", image: "https://vignette.wikia.nocookie.net/fallout/images/6/6c/Wastelander_Tent_and_Sniper_Vista.jpg/revision/latest?cb=20090421132031"},
//         {name: "Mountaingoat Palace", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwlqoSFG6BzyvebPd2I9JwrqfYFCK1l1FpSdOroV25CAWbVah"},
//         {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-m3rR9euBfjREfXUmnZFPj0e9_Fm6OOZPVZQNdKULzJxmIXLIg"},
//         {name: "Stone Hill", image: "https://vignette.wikia.nocookie.net/fallout/images/6/6c/Wastelander_Tent_and_Sniper_Vista.jpg/revision/latest?cb=20090421132031"},
//         {name: "Mountaingoat Palace", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwlqoSFG6BzyvebPd2I9JwrqfYFCK1l1FpSdOroV25CAWbVah"}
//     ]
    
    
app.get("/", function(req,res){
    res.render("landing");
})

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
    //get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err)
        {
            console.log(err);
        }else 
        {
            res.render("index", {campgrounds:allCampgrounds})
        }
    })
})


//CREATE - add new campground to DB
app.post("/campgrounds", function(req,res){
   //get data from form and ad to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
 
    Campground.create(newCampground, function(err, newlyCreated){
        if(err)
        {
            
            console.log(err);
        }else
        {
            res.redirect("/campgrounds");
        }
   });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//SHOW - shows more info/description
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID

    Campground.findById(req.params.id, function(err, foundCampground){
        if(err)
        {
            console.log(err);
        }else
        {
            res.render("show", {campground: foundCampground});
        }
    })
    
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Has Started!");
})