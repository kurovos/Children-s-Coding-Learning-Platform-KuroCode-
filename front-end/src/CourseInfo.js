import React, { useEffect, useState } from "react";
import './style/Course.css'
import axios from "axios";
import { Link } from "react-router-dom";
import Enrolment from "./Enrolment";

const CourseInfo = ()=>{
    const courseID = localStorage.getItem('courseID');
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [ImageUrl, setImageUrl] = useState("");
    const [chapterList, setChapterList] = useState([]);
    const [videoData, setVideoData] = useState(false);
    const [quizData, setQuizData] = useState(false);
    const [visible, setVisible] = useState(false);
    const [video, setVideoName] = useState("");
    const userType = localStorage.getItem('userType');
    const userID = localStorage.getItem('userID');
    const [unenrollVisible,setUnenrollVisible] = useState(false);
    const [stuEList, setStuEList] = useState([]);

    useEffect(()=>{
        const getCourse = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/getcourse/${courseID}`);
                setCourseName(res.data[0].course_name);
                setCourseDescription(res.data[0].course_description);
                setImageUrl(res.data[0].course_img);
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
                            if(props.course_ID === courseID){
                                const ckey1 = courseID + userID;
                                const ckey2 = props.course_ID + userID;
                                console.log(ckey1);
                                console.log(ckey2);
                                if(ckey1 === ckey2){
                                    setVisible(false);
                                }else{
                                    setVisible(true);
                                }
                            }
                        });
                    }else{
                        setVisible(true);
                    }
                    
                }else{
                    setVisible(false);
                }
                // console.log(res3.data);
                // res3.data.forEach((props)=>{
                //     // const stu_ID = props.stu_ID;
                //     console.log(props.stu_ID);
                //     console.log(userID);
                //     if(userType === "student" && props.stu_ID === userID){
                //         setVisible(false);
                //     }else if(userType === "teacher"){
                //         setVisible(false);
                //     }else{
                //         setVisible(true);
                //     }
                // });
                // setStuEList(res3.data);
                return res3.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getCourse();
        getchapter();
        getenrolment();
    },[])

    // const getVideoName = async(id)=>{
    //     const res3 = await axios.get(`http://localhost:3001/getvideo/${id}`);
    //     const isDataAvailable = res3.data && res3.data.length;
    //     if (!isDataAvailable) {
    //         setVideoData(false);
    //     }else{
    //         setVideoData(true);
    //     }
    //     return res3[0].data.video_name;
    // }

    const refreshPage = () =>{
        window.location.reload();
    }

    const unenrolmentSubmit = async(id)=>{
        if(userType === "student" && !visible){
            axios.delete(`http://localhost:3001/enrolment/${id}`);
            refreshPage();
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
    }



    return(
        <div>
            <section style={{ width: '400px', height:'400px', marginLeft: "5%", marginTop: "2%"}} className="d-inline-block"><img src={ImageUrl} alt="courseimage" className="image m-5" style={{width: '50%', height:'50%', borderRadius: '50%', margin:"auto", objectFit: 'cover'}}/></section>
            <section className="d-inline-block">
                <h1>{courseName}</h1>
                <p>Course Description: {courseDescription}</p>
            </section>
            {/* {chapterList.map((props, index)=>{
                const chapterVisible = false;
                return(
                    <section key={index} style ={{marginBottom:'8%'}}>
                        <button 
                            className = "course-btn"
                            onClick={async() => {
                            setVisible(!visible);
                            // const res2 = await axios.get(`http://localhost:3001/getvideo/${props.chapter_ID}`);
                            // const isDataAvailable = res2.data && res2.data.length;
                            // if (!isDataAvailable) {
                            //     setVideoData(false);
                            // }else{
                            //     setVideoData(true);
                            // }
                            getVideoName(props.chapter_ID);
                            }}>
                            {props.chapter_name}
                        </button>
                        {visible?
                        <div className="lesson-container d-flex flex-column">
                            {videoData?<Link to="/about">{getVideoName(props.chapter_ID)}</Link>:<></>}
                            <Link to="#">Link 2</Link>
                            <Link to="#">Link 3</Link>
                        </div>:<></>}
                    </section>
                );
            })} */}
            <br/>
            {/* student enrolment button */}
            {userType==="student"&&!visible?<button style={{float:"right", backgroundColor: "red", marginRight:"10px", marginBottom:"10px"}} onClick={()=>{
                unenrolmentSubmit(userID);
                setVisible(true);
            }}>Unenroll</button>:<></>}
            {/* enrolment list button */}
            {userType==="teacher"&&!visible?<Link to="/enrolmentlist"><button style={{float:"right", backgroundColor: "green", marginRight:"10px", marginBottom:"10px"}} >
                Enrolment List
            </button></Link>:<></>}
            
            {visible?<Enrolment/>:chapterList.map((props, index)=>{
                return(
                    <section key={index}>
                        {/* mt-xl-5 */}
                        <div className ="dropdown">
                            <button 
                                className="dropbtn"
                                onClick = {(e)=>{
                                    localStorage.setItem('chapterID', props.chapter_ID);
                                    // handleClick();
                                }}
                                onMouseOver = {async()=>{
                                    switchContent(props.chapter_ID);
                                    // localStorage.setItem('chapterID', props.chapter_ID);
                                    // const res2 =await axios.get(`http://localhost:3001/getvideo/${props.chapter_ID}`);
                                    // const isDataAvailable = res2.data && res2.data.length;
                                    // if (!isDataAvailable) {
                                    //     setVideoData(false);
                                    // }else{
                                    //     setVideoData(true);
                                    //     setVideoName(res2.data[0].video_name);
                                    // }
                                    // console.log(videoData);
                                    // console.log(res2.data);
                                }}
                                
                            >{props.chapter_name}</button>
                            <section style ={{marginBottom:'10%'}}>
                            <div className="dropdown-content" 
                                    onMouseOver = {async()=>{
                                    switchContent(props.chapter_ID);
                            }}>
                                    {videoData?<Link to="/videopage">{video}</Link>:<></>}
                                    {/* <Link to="/addvideo">Video</Link> */}
                                    <Link to="#">File Lesson</Link>
                                    {quizData?<Link to="/quiz">Quiz</Link>:<></>}
                                    {/* <Link to="#">Quiz</Link> */}
                            </div></section>
                        </div>
                    </section>
                    
                    
                );
            })}
        </div>
    );
}

export default CourseInfo;