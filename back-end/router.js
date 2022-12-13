const express = require("express");
const router = new express.Router();
const db = require("./db.js");
const multer = require("multer");
const moment = require("moment");




//image storage
var config = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        //callback(null,`image-${Date.now()}.${file.originalname}`)
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});

//image filter
const checkImg = (req, file, callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("Please uplaod an image"))
    }
};

var upload = multer({
    storage: config,
    fileFilter: checkImg
});

//add course data
router.post("/addcourse", upload.single("course_img"),(req,res)=>{
    const course_name = req.body.course_name;
    const course_description = req.body.course_description;

    // if(!course_name || !course_description || !course_img){
    //     return res.status(422).json({status:422,message:"fill all the details"});
    // }

    try{
        if(!req.file){
            console.log("No file upload");
        }else{
            console.log(req.file.filename);
            var course_img = "http://localhost:3001/uploads/" + req.file.filename;
            db.query("INSERT INTO course(course_name, course_description, course_img) VALUES(?,?,?)",
            [course_name, course_description, course_img],
            (err,result)=>{
                if(err){
                    console.log(err);
                    return;
                }else{
                    console.log("data added");
                    return res.status(201).json({status:201,data:req.body});
                }
            })
        }
        
    } catch(err){
        console.log(err);
        return res.status(422).json({status:422,err});
    }
});

//get course list
router.get("/course",(req,res)=>{
    db.query(
    "SELECT * FROM course WHERE course_ID IS NOT NULL", (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//delete course
router.delete("/course/:id", (req,res) =>{
    const id = req.params.id;
    db.query(
        "DELETE FROM course WHERE course_ID = ?",
        id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                return res.send(result);
            }
        }
    )
});

//add video
router.post("/addvideo", (req, res)=>{
    const video_name = req.body.video_name;
    const video_description = req.body.video_description;
    const video_url = req.body.video_url;
    const chapter_ID = req.body.chapter_ID;

    db.query("INSERT INTO video(video_name, video_description, video_url, chapter_ID) VALUES (?,?,?,?)",
        [video_name, video_description, video_url, chapter_ID],(err,result)=>{
            console.log(err);
        }
    )
});

//add chapter
router.post("/addchapter", (req, res)=>{
    const chapter_name = req.body.chapter_name;
    const course_ID = req.body.course_ID;

    db.query("INSERT INTO chapter(chapter_name, course_ID) VALUES (?,?)",
        [chapter_name, course_ID],(err, result)=>{
            console.log(err);
        }
    )
});

//get chapter
router.get("/chapter/:id",(req,res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM chapter WHERE course_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//delete chapter related to course
router.delete("/chapter/:id", (req,res) =>{
    const id = req.params.id;
    db.query(
        "DELETE FROM chapter WHERE course_ID = ?",
        id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                return res.send(result);
            }
        }
    )
});

//delete each chapter
router.delete("/lesson/:id", (req,res) =>{
    const id = req.params.id;
    db.query(
        "DELETE FROM chapter WHERE chapter_ID = ?",
        id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                return res.send(result);
            }
        }
    )
});

//get video
router.get("/getvideo/:id",(req,res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM video WHERE chapter_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//update video
router.put("/updatevideo/:id",(req,res)=>{
    const video_name = req.body.video_name;
    const video_description = req.body.video_description;
    const video_url = req.body.video_url;
    const id = req.params.id;
    db.query(
    "UPDATE video SET video_name = ?, video_description = ?, video_url = ? WHERE video_ID =" + id,[video_name, video_description, video_url], (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//delete video
router.delete("/video/:id", (req,res) =>{
    const id = req.params.id;
    db.query(
        "DELETE FROM video WHERE chapter_ID = ?",
        id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                return res.send(result);
            }
        }
    )
});

module.exports = router;