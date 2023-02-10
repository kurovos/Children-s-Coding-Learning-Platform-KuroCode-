import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from 'axios';
import { Button, Form, Breadcrumb } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const UpdateFile = ()=>{
    const chapterID = localStorage.getItem("chapterID");
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const[path, setPath] = useState("");
    const[change, setChange] = useState(false);
    const[fileID, setFileID] = useState("");
    const baseUrl = "http://localhost:3001/uploads/";
    const chpID = localStorage.getItem('chapterID');
    const userID = localStorage.getItem('userID');
    const userType = localStorage.getItem('userType');

    const navigate = useNavigate();

    useEffect(()=>{
        const getFile = async() =>{
            const res = await axios.get(`http://localhost:3001/getfile/${chapterID}`);
            console.log(res.data);
            setFileID(res.data[0].file_ID);
            setName(res.data[0].file_name);
            setDescription(res.data[0].file_description);
            // console.log(res.data[0].file_path.replace(baseUrl,""));
            // const file = res.data[0].file_path.replace(baseUrl,"");
            // setPath(file);
            // console.log(path);
            setPath(res.data[0].file_path);
            return res.data;
        };
        getFile();
    },[])

    const docs = [{ uri: path }];

    const updateFile = () =>{
        if(change === false){
            window.alert("Upload Failed, please check your file is valid or not!");
            return;
        }
        axios.defaults.withCredentials = true;

        var formData =new FormData();
        formData.append("file_name",name);
        formData.append("file_description",description);
        formData.append("file_path",path);
        formData.append("file_ID", fileID);

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        };

        axios.put(`http://localhost:3001/updatefile/${fileID}`,formData,config)
        .then((response) =>{
            console.log(response);
        }
        ).catch((error)=>{
                console.log(error);
            }
        );
        
    }

    return(
            <div className='container mt-3'>
            {/* <Button style={{marginLeft:"-80px"}} variant="danger" onClick={(e)=>{navigate(-1)}}>Back</Button> */}
            <Breadcrumb style={{ marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item href="/lesson">Lesson</Breadcrumb.Item>
                <Breadcrumb.Item active>Update File</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Update File</h1>
            <Form>
                <Form.Group className='mb-3' controlId='formFileName'>
                    <Form.Label>File Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="file_name" 
                        placeholder="File Name" 
                        value = {name}
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
                        value={description}
                        onChange = {(e)=> {
                            setDescription(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="formFileImage">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control 
                        type="file" 
                        name="file_path" 
                        accept=".pdf"
                    //     value = {"document-1672213966837.PendaftaranKursus.pdf"
                    // }
                        onChange = {(e)=> {
                            setChange(true);
                            setPath(e.target.files[0]);
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={updateFile}>
                    Confirm
                </Button>
            </Form>
            </div>
    );
}

export default UpdateFile;