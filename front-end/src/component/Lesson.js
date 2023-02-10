import React, { useState,useEffect } from "react";
import AddChapter from "../AddChapter";
import Axios from "axios";
import { ChapterSection } from "../ChapterSection";
import { Breadcrumb } from "react-bootstrap";


const Testing = ()=>{
    const[name, setName] = useState("");
    const courseID = localStorage.getItem('courseID');

    useEffect(()=>{
        const getCourse = async()=>{
            try{
                const res = await Axios.get(`http://localhost:3001/getcourse/${courseID}`);
                setName(res.data[0].course_name);
                return res.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getCourse();
    },[])

    return(
        <div style={{backgroundColor: "#FFF5EE", width: '100%', minHeight: '100vh', height: '100%', paddingTop: '5px'}}>
            <Breadcrumb style={{marginLeft: "150px", marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item active>Edit Course Content ({name})</Breadcrumb.Item>
            </Breadcrumb>
            <AddChapter/>
            <br/>
            <ChapterSection/>
        </div>
    )
}

export default Testing;