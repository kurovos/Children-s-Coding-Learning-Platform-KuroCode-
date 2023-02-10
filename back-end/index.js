const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const router = require("./router.js");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const path = require("path");

const bcrypt = require("bcrypt");
const Rounds = 10;

const jwt = require("jsonwebtoken");


const app = express();
const PORT = process.env.PORT || 3001;

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
        })
);
app.use(express.json());

app.use(router);
app.use("/uploads",express.static("./uploads"));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "kurocode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
    },
}));


//Student register
app.post("/studentregister", (req, res)=> {

    const stu_fname = req.body.stu_fname;
    const stu_lname = req.body.stu_lname;
    const stu_email = req.body.stu_email;
    const stu_pwd = req.body.stu_pwd;
    //hash password
    bcrypt.hash(stu_pwd, Rounds, (err, hash)=>{
        if(err){
            console.log(err);
        }
        db.query(
            "INSERT INTO student (stu_fname, stu_lname, stu_email, stu_pwd) VALUES (?,?,?,?)", 
            [stu_fname, stu_lname, stu_email, hash],
            (err,result)=>{
                if(err){
                    res.send({message: "Account exist!"});
                }else{
                    res.send({message: "Register Success"});
                }
                console.log(err);
            }
        );
    });

    // db.query(
    //     "INSERT INTO student (stu_fname, stu_lname, stu_email, stu_pwd) VALUES (?,?,?,?)", 
    //     [stu_fname, stu_lname, stu_email, stu_pwd],
    //     (err,result)=>{
    //         console.log(err);
    //     }
    // );

});

//Teacher Register
app.post("/teacherregister", (req, res)=> {

    const teacher_fname = req.body.teacher_fname;
    const teacher_lname = req.body.teacher_lname;
    const teacher_email = req.body.teacher_email;
    const teacher_pwd = req.body.teacher_pwd;

    bcrypt.hash(teacher_pwd, Rounds, (err, hash)=>{
        if(err){
            console.log(err);
        }

        db.query(
            "INSERT INTO teacher (teacher_fname, teacher_lname, teacher_email, teacher_pwd) VALUES (?,?,?,?)", 
            [teacher_fname, teacher_lname, teacher_email, hash],
            (err,result)=>{
                if(err){
                    res.send({message: "Account exist!"});
                }else{
                    res.send({message: "Register Success"});
                }
                console.log(err);
            }
        );
    })

    // db.query(
    //     "INSERT INTO teacher (teacher_fname, teacher_lname, teacher_email, teacher_pwd) VALUES (?,?,?,?)", 
    //     [teacher_fname, teacher_lname, teacher_email, teacher_pwd],
    //     (err,result)=>{
    //         console.log(err);
    //     }
    //     );
});

//jwt auth
const verifyJWT = (req, res, next) =>{
    const token = req.headers("x-access-token");

    if(!token){
        res.send("Token is needed");
    }else{
        jwt.verify(token, "jwtSecret", (err, decoded) =>{
            if(err){
                res.json({ auth: false, message: "Failed to authenticate!"});
            }else{
                req.course_ID = decoded.id;
                next();
            }
        })
    }
};


//get session student login
app.get("/studentlogin",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user });
    }else{
        res.send({ loggedIn: false });
    }
});

//Student Login
app.post("/studentlogin", (req, res)=> {

    const stu_email = req.body.stu_email;
    const stu_pwd = req.body.stu_pwd;
    
    db.query(
        "SELECT * FROM student WHERE stu_email = ?", 
        [stu_email],
        (err,result)=>{
            if (err){
                req.session.user = result;
                console.log(req.session.user);
                res.send({err: err});
            } 

            if (result.length>0){
                bcrypt.compare(stu_pwd, result[0].stu_pwd,(error, response)=>{
                    if(response){
                        
                        // const id = result[0].id;
                        // const token = jwt.sign({ id }, "jwtSecret", {
                        //     expiresIn: 300,
                        // })
                        // req.session.user = result;

                        // res.json({auth: true, token: token, result: result});
                        res.send(result);
                    }else{
                        return res.send({message: "Wrong email or password!"});
                    }
                })
                
            } else{
                return res.send({message: "Wrong email or password!"});
            }
            
        }
        );
});

//get session teacher login
app.get("/teacherlogin",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user });
    }else{
        res.send({ loggedIn: false });
    }
});

//Teacher Login
app.post("/teacherlogin", (req, res)=> {

    const teacher_email = req.body.teacher_email;
    const teacher_pwd = req.body.teacher_pwd;

    // AND teacher_pwd = ?
    // teacher_pwd

    db.query(
        "SELECT * FROM teacher WHERE teacher_email = ?", 
        [teacher_email],
        (err,result)=>{
            if (err){
                req.session.user = result;
                console.log(req.session.user);
                res.send({err: err});
            } 

            if (result.length>0){
                bcrypt.compare(teacher_pwd, result[0].teacher_pwd,(error, response)=>{
                    if(response){
                        res.send(result);
                        // res.send({message: "True Password"});
                    }else{
                        res.send({message: "Wrong email or password!"});
                    }
                })
                
            } else{
                res.send({message: "Wrong email or password!"});
            }
        }
        );
});

//get current user
app.get("/:id", (req,res) =>{
    const id = req.params.id;
    if(userType==="student"){
        db.query(
            "SELECT FROM student WHERE stu_ID = ?",
            id,
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    return res.send(result[0].stu_fname);
                }
            }
        )
    }else if(userType == "teacher"){
        db.query(
            "SELECT FROM teacher WHERE teacher_ID = ?",
            id,
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    return res.send(result[0].teacher_fname);
                }
            }
        )
    }
});

//update password
app.put("/updatepassword/:id",(req,res)=>{
    const user_type = req.body.user_type;
    const password = req.body.password;
    const id = req.params.id;
    bcrypt.hash(password, Rounds, (err, hash)=>{
        if(err){
            console.log(err);
        }
        if(user_type === "teacher"){
            db.query(
                "UPDATE teacher SET teacher_pwd = ?  WHERE teacher_ID = " + id ,[hash], (err, data) =>{
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
                "UPDATE student SET stu_pwd = ?  WHERE stu_ID = " + id ,[hash], (err, data) =>{
                        // console.log(err, data);
                        if(err){
                            console.log(err);
                        }else{
                            return res.send(data);
                        }
                    }
                );
        }
    })
});

app.listen(PORT,()=>{
    console.log(`running server on ${PORT}`);
});

