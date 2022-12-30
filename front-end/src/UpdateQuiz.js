import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from 'axios';


const UpdateQuiz = ()=>{
    const quizID = localStorage.getItem('quizID');
    const [option, setOption] = useState("");
    const [question, setQuestion] = useState(""); 
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");

    useEffect(()=>{
        const getQuiz = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/quiz/${quizID}`);
                setOption(res.data[0].quiz_answer);
                setQuestion(res.data[0].quiz_question);
                setOption1(res.data[0].quiz_option1);
                setOption2(res.data[0].quiz_option2);
                setOption3(res.data[0].quiz_option3);
                setOption4(res.data[0].quiz_option4);
                console.log(res.data);
                return res.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getQuiz();
    },[])

    const updateQuiz = async (event) =>{
        const quizID = localStorage.getItem('quizID');
        axios.defaults.withCredentials = true;

        await axios.post(`http://localhost:3001/quiz/${quizID}`,{
            quiz_question: question,
            quiz_option1: option1,
            quiz_option2: option2,
            quiz_option3: option3,
            quiz_option4: option4,
            quiz_answer: option,
        }).then((response) =>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });

    }

    return (
        <div>
            <Form className = "container mb-3">
                <h1 className="text-center m-3">Edit Quiz</h1>
                <Form.Group className='mb-3' controlId='quizQuestion'>
                    <Form.Label>
                        Quiz Question
                    </Form.Label>
                    <Form.Control 
                        //type="text"  
                        as="textarea"
                        row={10}
                        style = {{height: "200px"}}
                        name="quiz_question" 
                        placeholder="Quiz Question" 
                        value = {question}
                        onChange = {(e)=> {
                            setQuestion(e.target.value);
                        }}
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} className='mb-3' controlId='quizOption1'>
                        <Form.Label>
                            Quiz Option 1
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            row={3}
                            name="quiz_option1"
                            placeholder="Quiz Option 1"
                            value = {option1}
                            onChange = {(e)=> {
                                setOption1(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3' controlId='quizOption2'>
                        <Form.Label>
                            Quiz Option 2
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            row={3}
                            name="quiz_option2"
                            placeholder="Quiz Option 2"
                            value = {option2}
                            onChange = {(e)=> {
                                setOption2(e.target.value);
                            }}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} className='mb-3' controlId='quizOption3'>
                        <Form.Label>
                            Quiz Option 3
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            row={3}
                            name="quiz_option1"
                            placeholder="Quiz Option 3"
                            value = {option3}
                            onChange = {(e)=> {
                                setOption3(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3' controlId='quizOption4'>
                        <Form.Label>
                            Quiz Option 4
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            row={3}
                            name="quiz_option4"
                            placeholder="Quiz Option 4"
                            value = {option4}
                            onChange = {(e)=> {
                                setOption4(e.target.value);
                            }}
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="selectAnswer">
                    <Form.Label>
                        Answer
                    </Form.Label>
                    <Form.Select 
                        value = {option}
                        onChange = {(e)=>{setOption(e.currentTarget.value)}}
                    >
                        <option value="option1">
                            Option 1
                        </option>
                        <option value="option2">
                            Option 2
                        </option>
                        <option value="option3">
                            Option 3
                        </option>
                        <option value="option4">
                            Option 4
                        </option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={ updateQuiz }>
                    Confirm
                </Button>
            </Form>
        </div>
    );
}

export default UpdateQuiz;