import React, { useState } from "react";
import Axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";


const AddQuiz = ()=>{
    const [option, setOption] = useState("");
    const [question, setQuestion] = useState(""); 
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");

    
    const addQuiz = async (event) =>{
        const chapterID = localStorage.getItem('chapterID');
        Axios.defaults.withCredentials = true;

        await Axios.post("http://localhost:3001/addquiz",{
            quiz_question: question,
            quiz_option1: option1,
            quiz_option2: option2,
            quiz_option3: option3,
            quiz_option4: option4,
            quiz_answer: option,
            chapter_ID: chapterID
        }).then((response) =>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });

    }


    return(
        <div>
            <Form className = "container mb-3">
                <h1 className="text-center m-3">Add Quiz</h1>
                <Form.Group className='mb-3' controlId='quizQuestion'>
                    <Form.Label>
                        Quiz Question
                    </Form.Label>
                    <Form.Control 
                        //type="text"  
                        as="textarea"
                        row={5}
                        maxLength="200"
                        name="quiz_question" 
                        placeholder="Quiz Question" 
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
                <Button variant="primary" type="submit" onClick={ addQuiz }>
                    Confirm
                </Button>
            </Form>
        </div>
    );
}

export default AddQuiz;