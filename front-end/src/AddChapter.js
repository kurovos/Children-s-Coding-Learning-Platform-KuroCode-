import React, { useState } from "react";
import Axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FormContainer } from "./style/Form.style"
import { useNavigate } from "react-router-dom";


const AddChapter = () =>{
    const[chpName, setChpName] = useState("");
    const courseID = localStorage.getItem('courseID');

    const navigate = useNavigate();

    const refreshPage = () =>{
        window.location.reload();
    }

    Axios.defaults.withCredentials = true;

    const submitChapter = () =>{
        if (!chpName) {
            window.alert("Please enter a chapter name");
            return; // Stop the function from running
        }

        Axios.post('http://localhost:3001/addchapter',{
                chapter_name : chpName,
                course_ID : courseID
                }).then((response)=>{
                    console.log(response);
        });
        refreshPage();
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return(
        <div>
        <FormContainer className= "bg-light rounded">
            <Form className="addChapter">
                <Form.Group className="mb-3 px-3">
                    <h1>Add Chapter</h1>
                    <Form.Label>Chapter Name</Form.Label>
                    <Form.Control 
                        type = "text" 
                        placeholder = "Chapter Name" 
                        onChange = {(e)=> {
                            setChpName(e.target.value);
                        }}
                        onKeyDown = {(e)=>{handleKeyPress(e)}}
                    />
                    <br/>
                    
                    <Button className= "m-3" 
                        onClick = {submitChapter}
                    >Submit</Button>
                    <Button className= "m-3" variant="danger" onClick={(e)=>{navigate(-1)}}>Back</Button>
                </Form.Group>
            </Form>
        </FormContainer>
        </div>
    );
}


export default AddChapter;