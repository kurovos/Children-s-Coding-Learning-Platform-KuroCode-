import React, { useEffect, useState } from "react";
import { Button, Form, Breadcrumb } from "react-bootstrap";
import axios from 'axios';
import validator from "validator";
import { useNavigate } from "react-router-dom";

const UpdateVideo = ()=>{
    const [videoID, setVideoID] = useState("");
    const [videoName, setVideoName] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const chpID = localStorage.getItem('chapterID');

    const navigate = useNavigate();

    useEffect(()=>{
        const getVideo = async()=>{
            try{
                const res2 = await axios.get(`http://localhost:3001/getvideo/${chpID}`);
                console.log(res2);
                setVideoID(res2.data[0].video_ID);
                setVideoName(res2.data[0].video_name);
                setVideoDescription(res2.data[0].video_description);
                setVideoUrl(res2.data[0].video_url);
                return res2.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getVideo();
    },[]);

    //validate video
    const validateVideo = (value) => {
        if (validator.isURL(value)) {
          return true;
        } else {
          alert('Is Not Valid Video URL');
          return false;
        }
    }

    const updateVideo = () =>{
        // preventDefault();
        axios.defaults.withCredentials = true;

        if(validateVideo(videoUrl)){
            axios.put(`http://localhost:3001/updatevideo/${videoID}`,{
                video_name : videoName,
                video_description : videoDescription,
                video_url : videoUrl
                // chapter_ID : chpID
            }).then((response) =>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    return(
        <div>
            <Form className="container mt-3">
                {/* <div className="text-start" style={{marginLeft: "-100px"}}>
                    <Button variant="danger" onClick={(e)=>{navigate(-1)}}>Back</Button>
                </div> */}
                <Breadcrumb style={{ marginTop: "50px", fontSize: "24px"}}>
                    <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                    <Breadcrumb.Item href="/lesson">Lesson</Breadcrumb.Item>
                    <Breadcrumb.Item active>Update Video</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Update Video</h1>
                <Form.Group className='mb-3' controlId='formUpdateName'>
                    <Form.Label>Video Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="video_name" 
                        placeholder="Video Title" 
                        value = {videoName}
                        onChange = {(e)=> {
                            setVideoName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formVideoDescription">
                    <Form.Label>Video Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        row={3}
                        // type="text" 
                        name="video_description" 
                        placeholder="Video Description"
                        value = {videoDescription}
                        onChange = {(e)=> {
                            setVideoDescription(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formVideoUrl">
                    <Form.Label>Video URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="video_url" 
                        placeholder="Video Url"
                        value = {videoUrl}
                        onChange = {(e)=> {
                            setVideoUrl(e.target.value);
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={ updateVideo }>
                    Confirm
                </Button>
            </Form>
        </div>
    );
}

export default UpdateVideo;