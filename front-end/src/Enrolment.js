import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Button} from "react-bootstrap";

const Enrolment = ()=>{
    const courseID = localStorage.getItem('courseID');
    const stuID = localStorage.getItem('userID');
    const userType = localStorage.getItem('userType');
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    axios.defaults.withCredentials = true;

    const refreshPage = () =>{
        window.location.reload();
    }

    useEffect(()=>{
        const getStudent = async() => {
            try{
                const res2 = await axios.get(`http://localhost:3001/getstudent/${stuID}`);
                console.log(res2.data);
                const studentname = Object.values(res2.data[0]);
                setFname(res2.data[0].stu_fname);
                setLname(res2.data[0].stu_lname);
                console.log(fname);
                return (JSON.stringify(studentname));
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getStudent();
    },[]);

    const submitEnrolment = ()=>{
        if(userType === "student"){
            axios.post('http://localhost:3001/enrolment',{
            course_ID: courseID,
            stu_ID: stuID,
            stu_fname: fname,
            stu_lname: lname
            }).then((response)=>{
                console.log(response);
            })
        }
        refreshPage();
    }
    
    return(
        <section className="mx-auto text-center align-items-center" style={{backgroundColor: "rgba(50, 115, 220, 0.3)", height: "400px", width: "100%", border: "1px solid #000000"}}>
            <div style={{marginTop:"100px"}}>
                <h2>Start Enroll to Learn!</h2>
                <Button className="btn btn-lg btn-success" onClick={submitEnrolment}>Enroll</Button>
            </div>
        </section>
    );

}

export default Enrolment;