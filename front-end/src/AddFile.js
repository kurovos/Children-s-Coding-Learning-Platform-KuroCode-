import React, { useState } from "react";
import Axios from "axios";
import { Button, Form, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddFile = ()=>{
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file,setFile] = useState("");
    const chapterID = localStorage.getItem('chapterID');

    const navigate = useNavigate();

    const addFile = async(e)=>{
        e.preventDefault();

        var formData =new FormData();
        formData.append("file_name",name);
        formData.append("file_description",description);
        formData.append("file_path",file);
        formData.append("chapter_ID", chapterID);

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        };
        
        try{
            const res = await Axios.post("http://localhost:3001/addfile",formData,config);
            if(res.data.status == 201){
                navigate("/lesson");
            }
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className='container mt-3'>
            {/* <Button style={{marginLeft:"-80px"}} variant="danger" onClick={(e)=>{navigate(-1)}}>Back</Button> */}
            <Breadcrumb style={{ marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item href="/lesson">Lesson</Breadcrumb.Item>
                <Breadcrumb.Item active>Add File</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Add File</h1>
            <Form>
                <Form.Group className='mb-3' controlId='formFileName'>
                    <Form.Label>File Name</Form.Label>
                    <Form.Control type="text" name="file_name" placeholder="File Name" 
                        onChange = {(e)=> {
                            setName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formFileDescription">
                    <Form.Label>File Description</Form.Label>
                    <Form.Control 
                        // type="text" 
                        as="textarea" 
                        row={3}
                        name="file_description" 
                        placeholder="Description"
                        onChange = {(e)=> {
                            setDescription(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formFileImage">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control type="file" name="file_path" accept=".pdf"
                        onChange = {(e)=> {
                            setFile(e.target.files[0]);
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={addFile}>
                    Confirm
                </Button>
            </Form>
        </div>
    )   
}

export default AddFile;