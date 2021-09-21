const Blog = require("../model/blog");

module.exports.getAllBlog = async (req, res) => {
  try {
    let blogs = await Blog.find({});

    return res.status(200).json({ 
        msg: "Success", 
        data: blogs 
    });
  } catch (err) {
    console.log("error in getting blog", err);
    return res.status(500).json({ 
        msg: "Internal Server Error" 
    });
  }
};

module.exports.create = async (req, res) => {
  try {
    console.log("inside create", req.body);
    let blogs = await Blog.create({
        content:req.body.content,
        title:req.body.title,
        author:req.user._id,
    });

    return res.status(200).json({ 
        msg: "Success", 
        data: blogs 
    });
  } catch (err) {
    console.log("error in creating blog", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.view = async (req, res) => {
    try{
        let blog = await Blog.findById(req.params.id);
        console.log("view blog", blog);
        return res.status(200).json({
            message:"here is the blog!",
            blog,
        })
    }catch(err){
    console.log("error in creating blog", err);
    return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports.filterblogs = async (req, res) => {
    try{
        let blogs = await Blog.find({title:req.params.title});
        console.log("blogs", blogs);
        return res.status(200).json({
            message:"here is the filter blogs!",
            blogs,
        })
    }catch(err){
    console.log("error in creating blog", err);
    return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports.update = async (req, res) => {
    try{
        let blog = await Blog.findById(req.params.id);
        console.log("blog", blog);
        if(req.body.content){
            blog.content = req.body.content;
        }
        if(req.body.title){
            blog.title = req.body.title;
        }
        blog.save();
        console.log("blog", blog);
        return res.status(200).json({
            message:"Here is your Updated Blog!",
            blog,
        })
    }catch(err){
    console.log("error in creating blog", err);
    return res.status(500).json({ msg: "Internal Server Error" });  
    }
}

module.exports.delete = async (req, res) => {
    try{
       const blog = await Blog.findById(req.params.id);
       console.log("blog", blog);
       console.log("user", req.user);
       let delBlog;
       if(req.user.role == "admin" || req.user.id == blog.author){
            delBlog = await Blog.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                message:"Blg deleted Successfully!",
                delBlog,
            })
       }else{
            return res.status(300).json({
            message:"You cannot delete it!",
        }) 
       }
    }catch(err){
    console.log("error in creating blog", err);
    return res.status(500).json({ msg: "Internal Server Error" });  
    }
}
