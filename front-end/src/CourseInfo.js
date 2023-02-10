import React, { useEffect, useState } from "react";
// import './style/Course.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Breadcrumb, Accordion } from "react-bootstrap";
import Enrolment from "./Enrolment";


const CourseInfo = ()=>{
    const courseID = localStorage.getItem('courseID');
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [ImageUrl, setImageUrl] = useState("");
    const [chapterList, setChapterList] = useState([]);
    const [videoData, setVideoData] = useState(false);
    const [quizData, setQuizData] = useState(false);
    const [fileData, setFileData] = useState(false);
    const [videoname, setVideoName] = useState("");
    const [visible, setVisible] = useState(false);
    const userType = localStorage.getItem('userType');
    const userID = localStorage.getItem('userID');
    const [teacherID, setTeacherID] = useState("");
    const [creator, setCreator] = useState("");
    
    let key = [];
    const navigate = useNavigate();
    let count = 0;
    const[activeKey, setActiveKey] = useState(0);
    

    useEffect(()=>{
        const getCourse = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/getcourse/${courseID}`);
                setCourseName(res.data[0].course_name);
                setCourseDescription(res.data[0].course_description);
                setImageUrl(res.data[0].course_img);
                setTeacherID(res.data[0].teacher_ID);
                const res2 = await axios.get(`http://localhost:3001/teacherprofile/${res.data[0].teacher_ID}`);
                const name = res2.data[0].teacher_fname + " " + res2.data[0].teacher_lname;
                setCreator(name);
                return res.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        const getchapter = async()=>{
            try{
                const res2 = await axios.get(`http://localhost:3001/chapter/${courseID}`);
                console.log(res2.data);
                setChapterList(res2.data);
                return res2.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        const getenrolment = async()=>{
            try{
                const res3 = await axios.get(`http://localhost:3001/enrolment/${userID}`);
                console.log(res3.data);
                if(userType === "student"){
                    if(res3.data.length !== 0){
                        res3.data.forEach((props)=>{
                            console.log(props.course_ID);
                            console.log(courseID);
                            if(props.course_ID == courseID){
                                let ckey1 = courseID + userID;
                                let ckey2 = props.course_ID + "" + props.stu_ID;
                                console.log(ckey1);
                                console.log(ckey2);
                                if(ckey1 === ckey2){
                                    key.push(ckey2);
                                    // setVisible(false);
                                }
                                else{
                                    // key.push(true);
                                    // setVisible(true);
                                }
                            }
                            // else{
                            //     setVisible(true);
                            // }
                        });
                    }
                    }else{
                        // setVisible(true);
                    }
                checkVisible();
            }catch(err){
                console.log(err);
                return err;
            }
        };
        const getprogress = async()=>{
            try{
                const res2 = await axios.get(`http://localhost:3001/chapter/${courseID}`);
                console.log(res2.data);
                setChapterList(res2.data);
                return res2.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        const getTeacher = async()=>{
            try{
                const res2 = await axios.get(`http://localhost:3001/teacherprofile/${teacherID}`);
                const name = res2.data[0].teacher_fname + " " + res2.data[0].teacher_lname;
                setCreator(name);
                return res2.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getCourse();
        getchapter();
        getenrolment();
        getTeacher();
    },[])

    const refreshPage = () =>{
        window.location.reload();
    }

    const unenrolmentSubmit = async()=>{
        if(userType === "student" && !visible){
            const stuID = localStorage.getItem("userID");
            axios.delete(`http://localhost:3001/enrolment/${stuID}`,{
            data:{
                course_ID: courseID
            }
            })
            .then( ()=>{
                // setVisible(true);
                refreshPage();
            });
        }
    }

    const switchContent = async(id)=>{
        localStorage.setItem('chapterID', id);
        const res2 =await axios.get(`http://localhost:3001/getvideo/${id}`);
        const isDataAvailable = res2.data && res2.data.length;
        if (!isDataAvailable) {
            setVideoData(false);
        }else{
            setVideoData(true);
            setVideoName(res2.data[0].video_name);
        }
        const res3 =await axios.get(`http://localhost:3001/getquiz/${id}`);
        const isQuizAvailable = res3.data && res3.data.length;
        if(!isQuizAvailable){
            setQuizData(false);
        }else{
            setQuizData(true);
        }
        const res4 =await axios.get(`http://localhost:3001/getfile/${id}`);
        const isFileAvailable = res4.data && res4.data.length;
        if(!isFileAvailable){
            setFileData(false);
        }else{
            setFileData(true);
        }
    }

    const checkVisible = ()=>{
        if(userType === "student"){
            if(key.includes(courseID + "" + userID)){
                setVisible(false);
                console.log("check 1");
            }else{
                setVisible(true);
                console.log("check 2");
            }
            console.log(key.includes(courseID + "" + userID));
            console.log(key);
        }else if(userType === "teacher"){
            setVisible(false);
        }
    }

    return(
        <div style={{backgroundColor: "#F8F8FF", width: '100%', minHeight: '100vh', height: '100%', paddingTop: '5px'}}>
            <Breadcrumb style={{marginLeft: "150px", marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item active>{courseName}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{margin:"50px", backgroundColor: "#add8e6", display: "flex"}}>
                <div style={{width: "30%", margin: "auto"}}>
                    <section style={{ width: '400px', height:'400px', marginLeft: "5%", marginTop: "2%"}} className="d-inline-block"><img src={ImageUrl} alt="courseimage" className="image m-5 border border-4" style={{width: '50%', height:'50%', borderRadius: '50%', margin:"auto", objectFit: 'cover'}}/></section>
                </div>
                <div style={{width: "70%", margin: "50px"}}>
                    <section className="d-inline-block">
                        <h1>{courseName}</h1>
                        <p style={{fontSize: "18px"}}>Course Description: {courseDescription}</p>
                        <p style={{fontSize: "18px", marginTop:"50px"}}>Created by: <span className="fw-bold">{creator}</span></p>
                    </section>
                </div>
            </div>
           
            <br/>
            {userType==="student"&&!visible?<Button style={{float:"right", backgroundColor: "red", borderRadius: '25px', marginRight:"150px", marginBottom:"50px"}} onClick={()=>{
                unenrolmentSubmit(userID);
            }}>Unenroll</Button>:<></>}
            {userType==="student"&&!visible?<Link to="/feedback"><Button style={{float:"right", backgroundColor: "blue", borderRadius: '25px', marginRight:"20px", marginBottom:"50px"}}>
                Feedback</Button></Link>:<></>}
            {/* enrolment list button */}
            {userType==="teacher"&&!visible?
            <Link to="/enrolmentlist"><Button style={{ float:"left", backgroundColor: '#4caf50', borderRadius: '25px', marginLeft:"220px", marginBottom:"50px" }}>
            Enrolment List</Button></Link>:<></>}
            {userType==="teacher"&&!visible?
            <Link to="/feedbackresult"><Button style={{ float:"left", backgroundColor: '#4caf50', borderRadius: '25px', marginLeft:"30px", marginBottom:"50px" }}>
            Feedback Result</Button></Link>:<></>}<br/>
            {/* <button style={{float:"right", backgroundColor: "green", marginRight:"10px", marginBottom:"10px"}} >
                Enrolment List
            </button> */}

            {visible?<Enrolment/>:
                <Accordion style={{
                    width: "75%",
                    marginLeft: "12.5%",
                    marginRight: "12.5%",
                    marginTop: "70px"
                }}>
                {chapterList.map((props, index)=>{
                return(
                    <section key={index}>
                            <Accordion.Item eventKey={index}
                            style = {{textAlign: "center"}}
                                onClick = {(e)=>{
                                    localStorage.setItem('chapterID', props.chapter_ID);
                                    switchContent(props.chapter_ID);
                                    setActiveKey(index);
                                }}
                                // onMouseOver = {async()=>{
                                //     switchContent(props.chapter_ID);
                                // }}
                            >
                                <Accordion.Header style = {{textAlign: "center"}}>{props.chapter_name}</Accordion.Header>
                                <Accordion.Body >
                                    {videoData?<Link to="/videopage">{videoname}</Link>:<></>}<br/>
                                    {fileData?<Link to="/file">File</Link>:<></>}<br/>
                                    {quizData?<Link to="/quiz">Quiz</Link>:<></>}<br/>
                                </Accordion.Body>
                            </Accordion.Item>
                    </section>
                );
            })}</Accordion>}
        </div>
    );
}

export default CourseInfo;