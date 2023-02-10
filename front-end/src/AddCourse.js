import React, { useState } from "react";
import Axios from "axios";
//import { Form } from "react-router-dom";
import { Button, Form, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddCourse = ()=>{
    
    const [cName, setCName] = useState("");
    const [cDescription, setCDescription] = useState("");
    const [cFile,setCFile] = useState("");
    const teacherID = localStorage.getItem('userID');

    const navigate = useNavigate();

    const addCourseData = async(e)=>{
        e.preventDefault();

        if (!cFile.type.startsWith("image/")) {
            window.alert("Please select an image file to upload");
            return;
        }

        var formData =new FormData();
        formData.append("course_name",cName);
        formData.append("course_description",cDescription);
        formData.append("course_img",cFile);
        formData.append("teacher_ID", teacherID);

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        
        try{
            const res = await Axios.post("http://localhost:3001/addcourse",formData,config);
            if(res.data.status == 201){
                navigate("/course");
            }
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className='container mt-3'>
            <Breadcrumb style={{ marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item active>Add Course</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-center mt-2" style={{fontFamily: 'poppins-bold'}}>Add Course</h1>
            <Form>
                <Form.Group className='mb-3' controlId='formCourseName'>
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control type="text" name="course_name" placeholder="Course Name" 
                        onChange = {(e)=> {
                            setCName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formCourseDescription">
                    <Form.Label>Course Description</Form.Label>
                    <Form.Control 
                        // type="text" 
                        as="textarea" 
                        row={3}
                        name="course_description" 
                        placeholder="Description"
                        onChange = {(e)=> {
                            setCDescription(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formCourseImage">
                    <Form.Label>Upload Course Image</Form.Label>
                    <Form.Control type="file" name="course_img" accept="image/*"
                        onChange = {(e)=> {
                            setCFile(e.target.files[0]);
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={addCourseData}>
                    Confirm
                </Button>
            </Form>
        </div>
    )
    
}

export { AddCourse };