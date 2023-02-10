import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Button, Table, Breadcrumb } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

const GetEnrolmentList = ()=>{
    const courseID = localStorage.getItem('courseID');
    const stuID = localStorage.getItem('stuID');
    const [enrolmentList, setEnrolmentList] = useState([]);
    const[cname, setCName] = useState("");
    let count = 1;

    //get enrolment data
    useEffect(()=>{
        const getEnrolment = async() =>{
            const res = await axios.get(`http://localhost:3001/getenrolment/${courseID}`);
            setEnrolmentList(res.data);
            return res.data;
        }
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
        getEnrolment();
    },[])

    // const getStudent = async() => {
    //     const id = localStorage.getItem('stuID');
    //     const res2 = await axios.get(`http://localhost:3001/getstudent/${id}`);
    //     const studentname = Object.values(res2.data[0]);
    //     const name = studentname[0] + " " + studentname[1];
    //     setName(name);
    //     sname = name;
    //     return (JSON.stringify(kname));
    // };

    const refreshPage = () =>{
        window.location.reload();
    }
    
    //Delete enrolment
    const deleteEnrolment = async(id) =>{
        try{
            await axios.delete(`http://localhost:3001/enrolment/${stuID}`,
        {data: {
            course_ID: courseID
        }}
        )
        .then( ()=>{
            console.log(enrolmentList);
            setEnrolmentList(enrolmentList.filter((val)=>{
                return val.id !== id;
            }));
            refreshPage();
        });
        }catch(err){
            console.log(err);
            return err;
        }
    }

    return(
        <div className="container mt-2">
            <Breadcrumb style={{marginLeft: "50px", marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item href="/courseinfo">{cname}</Breadcrumb.Item>
                <Breadcrumb.Item active>{cname} (Enrolment List)</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-center m-3">Enrolment List</h1>
            <Table bordered hover style={{width: "100%", fontSize: "20px", margin: "50px"}}>
                <thead className="thead-dark">
                    <tr>
                        <th style={{width: "5%"}}>No</th>
                        <th style={{width: "20%"}}>Student ID</th>
                        <th style={{width: "60%"}}>Student Name</th>
                        <th style={{width: "10%"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {enrolmentList.map((props, index)=>{
                    // getStudent(props.stu_ID);
                    return(
                        <tr key={index} onMouseOver = {()=>{localStorage.setItem('stuID', props.stu_ID);
                        }}>
                            <th scope="row">{count++}</th>
                            <td>{props.stu_ID}</td>
                            <td >{props.stu_fname} {" "} {props.stu_lname}</td>
                            <td>
                                <AiFillDelete title="Delete" style={{width: "30px", height: "30px"}} onClick={(e)=>{deleteEnrolment(props.enrolment_ID)}} />
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default GetEnrolmentList;