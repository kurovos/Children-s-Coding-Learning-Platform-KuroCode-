import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Table } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ManageQuiz = ()=>{
    const chapterID = localStorage.getItem('chapterID');
    const [quizList, setQuizList] = useState([]);
    let count = 1;

    const navigate = useNavigate();

    useEffect(()=>{
        const getQuiz = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/getquiz/${chapterID}`);
                setQuizList(res.data);
                console.log(res.data);
                return res.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getQuiz();
    },[])

    const refreshPage = () =>{
        window.location.reload();
    }

    const deleteQuiz = ()=>{
        const quizID = localStorage.getItem('quizID');
        axios.delete(`http://localhost:3001/quiz/${quizID}`)
        .then( ()=>{
            console.log(quizList);
            setQuizList(quizList.filter((val)=>{
                return val.id !== quizID;
            }));
            refreshPage();
        }).catch((err)=>{
            console.log(err);
        });
    }


    return(
        <div className="container mt-2">
            <h1 className="text-center mt-2">Quiz Management</h1>
            <div className="text-end">
                <Button variant="primary"><NavLink to="/addquiz" className="text-decoration-none text-light">Add Quiz</NavLink></Button>
            </div><br/><br/>
            <Table bordered hover style={{width: "100%", fontSize: "20px"}}>
                <thead className="thead-dark">
                    <tr>
                    <th style={{width: "5%"}}>No</th>
                    <th style={{width: "80%"}}>Quiz Question</th>
                    <th style={{width: "15%"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {quizList.map((props, index)=>{
                    return(
                        <tr key={index} onMouseOver = {()=>{localStorage.setItem('quizID', props.quiz_ID)}}>
                        <th scope="row">{count++}</th>
                        <td>{props.quiz_question}</td>
                        <td>
                            <AiFillEdit title="Edit" style={{width: "30px", height: "30px", marginRight: "10px"}} onClick={(e)=>{navigate("/updatequiz");}}/>
                            <AiFillDelete title="Delete" style={{width: "30px", height: "30px"}} onClick={(e)=>{deleteQuiz();}} />
                        </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default ManageQuiz;