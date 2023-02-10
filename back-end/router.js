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
    const course_ID = req.body.course_ID;
    // const stu_ID = req.body.stu_ID;
    const id = req.params.id;
    db.query(
        "DELETE FROM enrolment WHERE stu_ID = ? AND course_ID = ?",
        [id, course_ID],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                console.log(course_ID);
                console.log(id);
                console.log("data added");
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

//get file by chapter ID
router.get("/getfile/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM file WHERE chapter_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//update file
router.put("/updatefile/:id", uploadFile.single("file_path"),(req,res)=>{
    const file_name = req.body.file_name;
    const file_description = req.body.file_description;
    const id = req.params.id;
    const chapter_ID = req.body.chapter_ID;

    try{
        if(!req.file){
            console.log("No file upload");
        }else{
            console.log(req.file.filename);
            var file_path = "http://localhost:3001/uploads/" + req.file.filename;
            db.query("UPDATE file SET file_name = ?, file_description = ?,  file_path = ? WHERE file_ID =" + id,
            [file_name, file_description, file_path],
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

//post student score
router.post("/score", (req, res)=>{
    const stu_ID = req.body.stu_ID;
    const chapter_ID = req.body.chapter_ID;
    const course_ID = req.body.course_ID;
    const score_score = req.body.score_score;

    db.query("INSERT INTO score(score_score, chapter_ID, stu_ID, course_ID) VALUES (?,?,?,?)",
        [score_score, chapter_ID, stu_ID, course_ID],(err, result)=>{
            console.log(err);
        }
    )
});

//get score by student ID
router.get("/score/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM score WHERE stu_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//get score by course ID
router.get("/rankscore/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
    "SELECT * FROM score WHERE course_ID =" + id, (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//get leaderboard by score
router.get("/leaderboard/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
        
        "SELECT score_ID , stu_fname, stu_lname, score_score, course_ID FROM student, score WHERE score.course_ID =" + id + " AND score.stu_ID = student.stu_ID ORDER BY score_score DESC" , (err, data) =>{
                // console.log(err, data);
                if(err){
                    console.log(err);
                }else{
                    return res.send(data);
                }
            }
        );
});

//get whole leaderboard
router.get("/lboard", (req, res)=>{
    db.query(
        "SELECT student.stu_fname, student.stu_lname, sum(score.score_score) AS score FROM score, student WHERE score.stu_ID = student.stu_ID GROUP BY student.stu_ID ORDER BY sum(score.score_score) DESC;", (err,data)=>{
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});


//get enrolment course by student
router.get("/getenrollcourse/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
        "SELECT enrolment.course_ID, course_name, course_img FROM course, enrolment WHERE course.course_ID = enrolment.course_ID AND stu_ID ="+ id + " ORDER BY enrolment.course_ID" , (err, data) =>{
                // console.log(err, data);
                if(err){
                    console.log(err);
                }else{
                    return res.send(data);
                }
            }
        );
});

//get activity progress
router.get("/getactivity/:stu_id/:chp_id", (req, res)=>{
    const stu_id = req.params.stu_id;
    const chp_id = req.params.chp_id;
    db.query(
        "SELECT * FROM activity WHERE stu_ID ="+ stu_id + " AND chp_ID =" + chp_id, (err, data) =>{
                // console.log(err, data);
                if(err){
                    console.log(err);
                }else{
                    return res.send(data);
                }
            }
        );
});

//post the activity progress
router.post("/activity", (req, res)=>{
    const stu_ID = req.body.stu_ID;
    const chapter_ID = req.body.chapter_ID;
    const activity_video = req.body.activity_video;
    const activity_file = req.body.activity_file;
    const activity_quiz = req.body.activity_quiz;

    db.query("INSERT INTO activity(activity_video, activity_file, activity_quiz, chp_ID, stu_ID) VALUES (?,?,?,?,?)",
        [activity_video, activity_file, activity_quiz, chapter_ID, stu_ID],(err, result)=>{
            console.log(err);
        }
    )
});

//update the activity progress (video)
router.put("/ua_video/:id",(req,res)=>{
    const activity_video = req.body.activity_video;
    const stu_ID = req.body.stu_ID;
    const id = req.params.id;
    db.query(
    "UPDATE activity SET activity_video = ? WHERE stu_ID = ? AND chp_ID = " + id ,[activity_video, stu_ID], (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//update the activity progress (file)
router.put("/ua_file/:id",(req,res)=>{
    const activity_file = req.body.activity_file;
    const stu_ID = req.body.stu_ID;
    const id = req.params.id;
    db.query(
    "UPDATE activity SET activity_file = ? WHERE stu_ID = ? AND chp_ID =" + id ,[activity_file, stu_ID], (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//update the activity progress (video)
router.put("/ua_quiz/:id",(req,res)=>{
    const activity_quiz = req.body.activity_quiz;
    const stu_ID = req.body.stu_ID;
    const id = req.params.id;
    db.query(
    "UPDATE activity SET activity_quiz = ? WHERE stu_ID = ? AND chp_ID =" + id ,[activity_quiz, stu_ID], (err, data) =>{
            // console.log(err, data);
            if(err){
                console.log(err);
            }else{
                return res.send(data);
            }
        }
    );
});

//get the activity progress for a course
router.get("/getprogress/:stu_id/:course_id", (req, res)=>{
    const stu_id = req.params.stu_id;
    const course_id = req.params.course_id;
    db.query(
        "SELECT activity.activity_video, activity.activity_file, activity.activity_quiz FROM activity, chapter WHERE activity.chp_ID = chapter.chapter_ID AND activity.stu_ID ="+ stu_id +"AND chapter.course_ID = " + course_id, (err, data) =>{
                // console.log(err, data);
                if(err){
                    console.log(err);
                }else{
                    return res.send(data);
                }
            }
        );
});

//create the feedback
router.post("/submitfeedback", (req, res)=>{
    const stu_ID = req.body.stu_ID;
    const course_ID = req.body.course_ID;
    const feedback_one = req.body.feedback_one;
    const feedback_two = req.body.feedback_two;

    db.query("INSERT INTO feedback(feedback_one, feedback_two, course_ID, stu_ID) VALUES (?,?,?,?)",
        [feedback_one, feedback_two, course_ID, stu_ID],(err, result)=>{
            console.log(err);
        }
    )
});

//get the feedback
router.get("/getfeedback/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
        "SELECT * FROM feedback WHERE course_ID ="+ id, (err, data) =>{
                // console.log(err, data);
                if(err){
                    console.log(err);
                }else{
                    return res.send(data);
                }
            }
        );
});

//get teacher
router.get("/teacherprofile/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
        "SELECT * FROM teacher WHERE teacher_ID ="+ id, (err, data) =>{
                // console.log(err, data);
                if(err){
                    console.log(err);
                }else{
                    return res.send(data);
                }
            }
        );
});

//get student
router.get("/studentprofile/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
        "SELECT * FROM student WHERE stu_ID ="+ id, (err, data) =>{
                // console.log(err, data);
                if(err){
                    console.log(err);
                }else{
                    return res.send(data);
                }
            }
        );
});

//update user img
router.put("/updateavatar", upload.single("user_img"),(req,res)=>{
    // const user_img = req.body.user_img;
    const user_type = req.body.user_type;
    const user_ID = req.body.user_ID;

    // if(!course_name || !course_description || !course_img){
    //     return res.status(422).json({status:422,message:"fill all the details"});
    // }

    try{
        if(!req.file){
            console.log("No file upload");
        }else{
            console.log(req.file.filename);
            var user_img = "http://localhost:3001/uploads/" + req.file.filename;
            if(user_type === "student"){
                db.query("UPDATE student SET  stu_img = ? WHERE stu_ID =" + user_ID,
                [user_img],
                (err,result)=>{
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        console.log("data added");
                        return res.status(201).json({status:201,data:req.body});
                    }
                })
            }else if(user_type === "teacher"){
                db.query("UPDATE teacher SET  teacher_img = ? WHERE teacher_ID =" + user_ID,
                [user_img],
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
        }
        
    } catch(err){
        console.log(err);
        return res.status(422).json({status:422,err});
    }
});

//update user information expect password
router.put("/updateprofile/:id",(req,res)=>{
    const user_type = req.body.user_type;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const id = req.params.id;
    if(user_type === "teacher"){
        db.query(
            "UPDATE teacher SET teacher_email = ?, teacher_fname = ?, teacher_lname = ? WHERE teacher_ID = " + id ,[email, fname, lname], (err, data) =>{
                    // console.log(err, data);
                    if(err){
                        console.log(err);
                    }else{
                        return res.send(data);
                    }
                }
            );
    }else if(user_type === "student"){
        db.query(
            "UPDATE student SET stu_email = ?, stu_fname = ?, stu_lname = ?  WHERE stu_ID = " + id ,[email, fname, lname], (err, data) =>{
                    // console.log(err, data);
                    if(err){
                        console.log(err);
                    }else{
                        return res.send(data);
                    }
                }
            );
    }
});

module.exports = router;