import React, { useState } from "react";
import Axios from "axios";
import { Button, Form } from "react-bootstrap";
import validator from "validator";
import { useNavigate } from "react-router-dom";


const AddVideo = () =>{
    const[vName, setVName] = useState("");
    const[vDescription, setVDescription] = useState("");
    const[vUrl, setVUrl] = useState("");
    const[chapterID, setchapterID] = useState(localStorage.getItem('chapterID'));

    const navigate = useNavigate();

    const validateVideo = (value) => {
        if (validator.isURL(value)) {
          return true;
        } else {
          alert('Is Not Valid Video URL');
          return false;
        }
    }

    const addVideo = async () =>{
        // preventDefault();
        Axios.defaults.withCredentials = true;

        if(validateVideo(vUrl)){
            Axios.post("http://localhost:3001/addvideo",{
                video_name : vName,
                video_description : vDescription,
                video_url : vUrl,
                chapter_ID : chapterID
            }).then((response) =>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            });
            navigate("/lesson");
        }else{
            return;
        }
    }

    return(
        <div>
            <Form className="container mt-3">
                <h1>Add Video</h1>
                <Form.Group className='mb-3' controlId='formVideoName'>
                    <Form.Label>Video Title</Form.Label>
                    <Form.Control type="text" name="video_name" placeholder="Video Title" 
                        onChange = {(e)=> {
                            setVName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formVideoDescription">
                    <Form.Label>Video Description</Form.Label>
                    <Form.Control as="textarea" row={3} name="video_description" placeholder="Video Description"
                        onChange = {(e)=> {
                            setVDescription(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formVideoUrl">
                    <Form.Label>Video URL</Form.Label>
                    <Form.Control type="text" name="video_url" placeholder="Video Url"
                        onChange = {(e)=> {
                            setVUrl(e.target.value);
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={ addVideo }>
                    Confirm
                </Button>
            </Form>
        </div>
    );
}

export { AddVideo };