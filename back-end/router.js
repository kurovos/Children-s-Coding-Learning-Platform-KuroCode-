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
    const teacher_ID = req.body.teacher_ID;

    // if(!course_name || !course_description || !course_img){
    //     return res.status(422).json({status:422,message:"fill all the details"});
    // }

    try{
        if(!req.file){
            console.log("No file upload");
        }else{
            console.log(req.file.filename);
            var course_img = "http://localhost:3001/uploads/" + req.file.filename;
            db.query("INSERT INTO course(course_name, course_description, course_img, teacher_ID) VALUES(?,?,?,?)",
            [course_name, course_description, course_img, teacher_ID],
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

//get course by course ID
router.get("/getcourse/:id",(req,res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM course WHERE course_ID = ?", id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//get course list by teacher own
router.get("/course/:id",(req,res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM course WHERE teacher_ID = ?", id, (err, data) =>{
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

//post enrolment
router.post("/enrolment", (req, res)=>{
    const course_ID = req.body.course_ID;
    const stu_ID = req.body.stu_ID;
    const stu_fname = req.body.stu_fname;
    const stu_lname = req.body.stu_lname;

    db.query("INSERT INTO enrolment(course_ID, stu_ID, stu_fname, stu_lname) VALUES (?,?,?,?)",
        [course_ID, stu_ID, stu_fname, stu_lname],(err, result)=>{
            console.log(err);
        }
    )
});

//get enrolment by student
router.get("/enrolment/:id",(req,res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM enrolment WHERE stu_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//get enrolment list by course
router.get("/getenrolment/:id",(req,res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM enrolment WHERE course_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//delete enrolment
router.delete("/enrolment/:id", (req,res) =>{
    const id = req.params.id;
    db.query(
        "DELETE FROM enrolment WHERE stu_ID = ?",
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

//get student
router.get("/getstudent/:id", (req,res)=>{
    const id = req.params.id;
    db.query(
        "SELECT stu_fname, stu_lname FROM student WHERE stu_ID = ?",
        id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                return res.send(result);
            }
        }
    )
})

//add quiz
router.post("/addquiz", (req,res) =>{
    const quiz_question = req.body.quiz_question;
    const quiz_option1 = req.body.quiz_option1;
    const quiz_option2 = req.body.quiz_option2;
    const quiz_option3 = req.body.quiz_option3;
    const quiz_option4 = req.body.quiz_option4;
    const quiz_answer = req.body.quiz_answer;
    const chapter_ID = req.body.chapter_ID;

    db.query(
        "INSERT INTO quiz(quiz_question, quiz_option1, quiz_option2, quiz_option3, quiz_option4, quiz_answer, chapter_ID) VALUES (?,?,?,?,?,?,?)",
        [quiz_question, quiz_option1, quiz_option2, quiz_option3, quiz_option4, quiz_answer, chapter_ID], (err, res) =>{
            if(err){
                console.log(err);
            }
        }
    )
});

//get quiz by chapter id
router.get("/getquiz/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM quiz WHERE chapter_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//delete quiz
router.delete("/quiz/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
        "DELETE FROM quiz WHERE quiz_ID = ?",
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

//update quiz
router.put("/updatequiz/:id",(req,res)=>{
    const quiz_question = req.body.quiz_question;
    const quiz_option1 = req.body.quiz_option1;
    const quiz_option2 = req.body.quiz_option2;
    const quiz_option3 = req.body.quiz_option3;
    const quiz_option4 = req.body.quiz_option4;
    const quiz_answer = req.body.quiz_answer;
    const id = req.params.id;
    db.query(
    "UPDATE video SET quiz_question = ?, quiz_option1 = ?, quiz_option2 = ?, quiz_option3 = ?, quiz_option4 = ?, quiz_answer = ? WHERE video_ID =" + id,[quiz_question, quiz_option1, quiz_option2, quiz_option3, quiz_option4, quiz_answer], (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//get quiz by quiz ID
router.get("/quiz/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM quiz WHERE quiz_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//file storage
var configFile = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,`document-${Date.now()}.${file.originalname}`)
    }
});

//file filter
const checkFile = (req, file, callback)=>{
    if(file.mimetype == "application/pdf"){
        callback(null,true)
    }else{
        callback(null,Error("Please uplaod an document"))
    }
};

// upload file multer
var uploadFile = multer({
    storage: configFile,
    fileFilter: checkFile
});

//add file(not complete)
router.post("/addfile", uploadFile.single("file_path"),(req,res)=>{
    const file_name = req.body.file_name;
    const file_description = req.body.file_description;
    const chapter_ID = req.body.chapter_ID;

    try{
        if(!req.file){
            console.log("No file upload");
        }else{
            console.log(req.file.filename);
            var file_path = "http://localhost:3001/uploads/" + req.file.filename;
            db.query("INSERT INTO file(file_name, file_description, file_path, chapter_ID) VALUES(?,?,?,?)",
            [file_name, file_description, file_path, chapter_ID],
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

module.exports = router;