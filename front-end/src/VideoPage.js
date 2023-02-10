import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useNavigate } from "react-router-dom";
import { Button, Breadcrumb } from "react-bootstrap";

const VideoPage = ()=>{
    const [videoName, setVideoName] = useState("");
    const[cname, setCName] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const chpID = localStorage.getItem('chapterID');
    const userID = localStorage.getItem('userID');
    const userType = localStorage.getItem('userType');
    const courseID = localStorage.getItem('courseID');
    const [checkpoint, setCheckPoint] = useState(false);


    const navigate = useNavigate();

    useEffect(()=>{
        const getActivity = async()=>{
            if(userType === "student"){
                try{
                    //check acitvity
                    const res = await axios.get(`http://localhost:3001/getactivity/${userID}/${chpID}`);
                    console.log(res.data.length);
                    if(res.data.length === 0 ){
                        // setCheckPoint(false);
                        console.log(checkpoint);
                        //create new activity
                        axios.post("http://localhost:3001/activity",{
                            activity_video : checkpoint,
                            chapter_ID : chpID,
                            stu_ID : userID
                        }).then((response) =>{
                                console.log(response);
                            }
                        ).catch((error)=>{
                                console.log(error);
                            }
                        );
                    }else{
                        //if got data set the video activity into checkpoint *(need?)
                        setCheckPoint(res.data.activity_video);
                    }
                    console.log(checkpoint);
                }catch(err){
                    console.log(err);
                    return err;
                }
            }
        };
        const getVideo = async()=>{
            try{
                const res2 = await axios.get(`http://localhost:3001/getvideo/${chpID}`);
                console.log(res2);
                setVideoName(res2.data[0].video_name);
                setVideoDescription(res2.data[0].video_description);
                setVideoUrl(res2.data[0].video_url);
                return res2.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        const getCourse = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/getcourse/${courseID}`);
                setCName(res.data[0].course_name);
                return res.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getCourse();
        getActivity();
        getVideo();
    },[]);


    const completeVideo = async() =>{
        setCheckPoint(true);
        try{
            axios.put(`http://localhost:3001/ua_video/${chpID}`,{
                activity_video : checkpoint,
                stu_ID : userID
            }).then((response) =>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            });
        }catch(err){
            console.log(err);
            return err;
        }
        console.log(checkpoint);
        return true;
    }


    return(
        <section style={{ width: '50%', height:'50%', textAlign:'center', margin:"auto", borderRadius: '50%', marginTop:"100px", backgroundColor: "#FFE4C4"}}>
            {/* <div className="text-start" style={{marginLeft: "-100px"}}>
                <Button variant="danger" onClick={(e)=>{navigate(-1)}}>Back</Button>
            </div> */}
            <Breadcrumb style={{marginLeft: "-200px",fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item href="/courseinfo">{cname}</Breadcrumb.Item>
                <Breadcrumb.Item active>{videoName}</Breadcrumb.Item>
            </Breadcrumb>
            <h1>{videoName}</h1><br/>
            <p style={{fontStyle: "italic"}}>Video Description: {videoDescription}</p><br/>
            <ReactPlayer 
                className='react-player'
                style={{marginLeft:"15%", width: "600px", height: "500px"}}
                url={videoUrl}
                playing={true}
                muted={true}
                controls={true}
                onEnded={completeVideo}
                scale={0.5}
                config={{
                    facebook: {
                        appId: "your-facebook-app-id",
                        embed: {
                            width: 600,
                            height: 500
                        }
                    }
                }}
            />
            <div style={{ marginTop: "50px", marginLeft: "500px" }}>
                <Button variant="danger" onClick={(e)=>{navigate("/courseinfo")}}>Back</Button> 
                <Button style = {{ marginLeft: "50px"}} onClick={(e)=>{navigate("/file")}}>Next</Button>
            </div>
        </section>
    );
}

export default VideoPage;