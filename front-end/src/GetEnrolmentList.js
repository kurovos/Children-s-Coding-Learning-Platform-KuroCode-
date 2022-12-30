import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Button, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

const GetEnrolmentList = ()=>{
    const courseID = localStorage.getItem('courseID');
    const [enrolmentList, setEnrolmentList] = useState([]);
    let count = 1;

    useEffect(()=>{
        const getEnrolment = async() =>{
            const res = await axios.get(`http://localhost:3001/getenrolment/${courseID}`);
            setEnrolmentList(res.data);
            return res.data;
        }
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
    

    return(
        <div>
            <Table bordered hover style={{width: "100%", fontSize: "20px"}}>
                <thead className="thead-dark">
                    <tr>
                    <th style={{width: "5%"}}>No</th>
                    <th style={{width: "20%"}}>Student ID</th>
                    <th style={{width: "60%"}}>Student Name</th>
                    <th style={{width: "15%"}}>Action</th>
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
                                <AiFillDelete title="Delete" style={{width: "30px", height: "30px"}} onClick={(e)=>{}} />
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