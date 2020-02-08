var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    compg       = require("./models/camp");
    // compg       = require("./models/camp");
    // compg       = require("./models/camp");
    
    
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

// compg.create({
//     name:"Its different",
//     image:"https://cdn.pixabay.com/photo/2019/06/01/20/22/flash-4244923__340.jpg",
//     description: "You never know what yyou come for this is just a lorem ipsum maybe"
// },function(err,compg){
//     if(err){
//         console.logp("Galti hogi shab");
//     }else{
//         console.log("Sab first class hai");
//         console.log(compg);
//     }
// });
    
// var comp = [
//         {name:"Kalavantin",image:"https://image.shutterstock.com/image-photo/man-hiking-sunset-mountains-heavy-600w-723981925.jpg"},
//         {name:"Prabalgad",image:"https://image.shutterstock.com/image-photo/hiker-on-mountain-top-sport-260nw-1348496765.jpg"},
//         {name:"Sandhan",image:"https://image.shutterstock.com/image-photo/group-hikers-walking-on-mountain-600w-1385977739.jpg"},
//         {name:"random",image:"https://image.shutterstock.com/image-photo/group-hikers-walking-on-mountain-600w-1385970551.jpg"},
//     ];
    
app.get("/",function(req,res){
    res.render("home");
});
//Index route -show all data 
app.get("/compounds",function(req,res){
    compg.find({},function(err,allcompg){
        if(err){
            console.log("Error hai");
        }else{
            // console.log("completedat ="+allcompg);
            res.render("index",{compound:allcompg});
        }
    });
    
});

// New - to add new data for 
app.get("/compounds/new",function(req,res){
    res.render("new");
});

// Show - Display info about a specific item
app.get("/compounds/:id",function(req,res){
    compg.findById(req.params.id, function(err,additionaldata){
        if(err){
            console.log(err);
        }else{
            console.log("data="+additionaldata);
            console.log("params-"+req.params.id);
            res.render("itsshowtime",{mydata:additionaldata});
        }
    });
});

//create - add new dogs to db
app.post("/compounds",function(req,res){
    var name  = req.body.name,
     imageurl = req.body.image,
     desc     = req.body.description,
     newcomp  = {name:name ,image:imageurl, description:desc};
    console.log(newcomp);
    
    compg.create(newcomp,function(err,compg){
            if(err){
                console.log("Galti hogi shab");
            }else{
                console.log("Sab first class hai");
                console.log(compg);
                res.redirect("/compounds");
            }
   });
//   comp.push(newcomp);

});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The Game begins");
});