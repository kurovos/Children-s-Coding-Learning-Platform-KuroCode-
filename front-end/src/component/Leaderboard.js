import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

const Leaderboard = ()=>{
    const userID = localStorage.getItem('userID');
    const userType = localStorage.getItem('userType');
    const courseID = localStorage.getItem('courseID');
    const [courselist, setCourseList] = useState([]);
    const [totalScore, setScore] = useState(0);
    const [list, setList] = useState([]);
    let stu = '';
    let score = [];
    let stuList = [];
    let counter = 1;
    let temp = 0;
    useEffect(()=>{
        const getScore = async()=>{
            try{
                // const res = await axios.get(`http://localhost:3001/leaderboard/${courseID}`);
                const res = await axios.get(`http://localhost:3001/lboard`);
                console.log(res.data);
                setList(res.data);
                if(userType === "student"){
                    if(res.data.length !== 0){
                        // res.data.forEach((props)=>{
                        //     if(courseID === props.course_ID){
                        //         setScore(totalScore + props.score_score);
                        //         stu = props.stu_ID;
                        //     }
                        // });
                        stuList.push(stu);
                        console.log(totalScore);
                        console.log(stu);
                        console.log(score);
                        temp = totalScore;
                        score.push(temp);
                        stuList.push(stu);
                        totalScore=0;
                    }
                }
            }catch(err){
                console.log(err);
                return err;
            }
        };
        const getCourse = async()=>{
            try{
                if(userType === "teacher" && userID === "1"){
                    const res = await axios.get("http://localhost:3001/course");
                    console.log(res);
                    setCourseList(res.data);
                    return res.data;
                }else if(userType === "teacher" && userID !== "1"){
                    const res = await axios.get(`http://localhost:3001/course/${userID}`);
                    console.log(res);
                    setCourseList(res.data);
                    return res.data;
                }else{
                    const res = await axios.get(`http://localhost:3001/getenrollcourse/${userID}`);
                    console.log(res);
                    setCourseList(res.data);
                    return res.data;
                }
                
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getCourse();
        getScore();
    },[])

    // const setData = () =>{
    //     if(userType === "student"){
    //         if(list.length !== 0){
    //             list.reduce((acc, curr) => {
    //                 if (!acc[curr.stu_ID]) {
    //                   acc[curr.stu_ID] = curr.score_score;
    //                 } else {
    //                   acc[curr.stu_ID] += curr.score_score;
    //                 }
    //                 return acc;
    //             }, {});
    //             console.log(list);
    //         }
    //     }
    // }

    return(
        <div style={{backgroundColor: '#E6E6FA', width: '100%', minHeight: '100vh', height: '100vh', paddingTop: '5px'}}>
            <h1 className="text-center m-3">Leaderboard</h1>
            <Table bordered hover style={{width: "80%", fontSize: "20px", marginTop: "50px", marginLeft: "10%", marginRight: "10%"}}>
                <thead className="thead-dark">
                    <tr>
                        <th style={{width: "5%"}}>Rank</th>
                        <th style={{width: "40%"}}>Student First Name</th>
                        <th style={{width: "40%"}}>Student Last Name</th>
                        <th style={{width: "15%"}}>Marks</th>
                    </tr>
                </thead>
                <tbody>
                {list.map((props, index)=>{
                    return(
                        <tr key={index}>
                            <th scope="row">{counter++}</th>
                            <td>{props.stu_fname}</td>
                            <td>{props.stu_lname}</td>
                            <td>{props.score}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default Leaderboard;