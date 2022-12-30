import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';
import Background from "./picture/quizbackground.jpg";

const Quiz = ()=>{
    const chapterID = localStorage.getItem('chapterID');
    const [quizList, setQuizList] = useState([]);
    const [quizLength, setQuizLength] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionCurrent, setQuestionCurrent] = useState(false);
    const [isAnswer, setIsAnswer] = useState(false);

    const myStyle ={
        backgroundImage: `url(${Background})` ,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '90vh'
    }


    useEffect(()=>{
        const getQuiz = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/getquiz/${chapterID}`);
                setQuizList(res.data);
                setQuizLength(res.data.length);
                console.log(res.data);
                console.log(quizList[questionNumber].quiz_question);
                return res.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getQuiz();
    },[])

    const checkAnswer = (ansValue)=>{
        if(ansValue === quizList[questionNumber].quiz_answer && !isAnswer){
            setIsAnswer(true);
            alert("Correct Answer!");
        }else if(ansValue !== quizList[questionNumber].quiz_answer && !isAnswer){
            setIsAnswer(true);
            alert("False Answer");
        }else{
            alert("You have already answered this question");
        }
    }

    const checkCurrent = (num)=>{
        if((num+1) === quizLength){
            setQuestionCurrent(true);
        }else{
            setQuestionCurrent(false);
        }
    }

    const nextQuestion = ()=>{
        setIsAnswer(false);
        setQuestionNumber(questionNumber+1);
        console.log(quizLength);
        console.log(questionNumber);
        checkCurrent(questionNumber);
    }


    return(
        <div style={myStyle}>
            {questionCurrent?
                <div style={{ width: '1000px', height:'600px', textAlign:'center', margin:"auto", marginTop:"100px"}} className= "border border-primary bg-light rounded">
                <div style={{ width: '50%', height:'50%', margin:"auto", borderRadius: '50%', marginTop:'20%'}}>
                    <h1>Complete Quiz</h1>
                </div></div>
                :<div style={{ width: '50%', height:'80%', textAlign:'center', margin:"auto", marginTop:"100px"}} className= "border border-primary bg-light rounded">
                    <div style={{ width: '50%', height:'50%', textAlign:'center', margin:"auto"}}>
                        <h1 style={{ margin: "50px" }}>Question {questionNumber+1}</h1>
                        <h5 className= "mt-3" style={{ whiteSpace: 'pre-wrap', textAlign: 'left'}}>{quizList[questionNumber]?.quiz_question}</h5>
                        <Row className="mb-3">
                            <Button className= "m-3" as={Col} onClick ={(e)=>{checkAnswer("option1")}}>A. {quizList[questionNumber]?.quiz_option1}</Button>
                            <Button className= "m-3" as={Col} onClick ={(e)=>{checkAnswer("option2")}}>B. {quizList[questionNumber]?.quiz_option2}</Button>
                        </Row>
                        <Row className="mb-3">
                            <Button className= "m-3" as={Col} onClick ={(e)=>{checkAnswer("option3")}}>C. {quizList[questionNumber]?.quiz_option3}</Button>
                            <Button className= "m-3" as={Col} onClick ={(e)=>{checkAnswer("option4")}}>D. {quizList[questionNumber]?.quiz_option4}</Button><br/>
                        </Row>
                    {isAnswer?<Button className= "m-3" 
                    onClick={(e)=>{
                        nextQuestion();
                    }}>Next Question</Button>:<></>}</div>
                </div>
            }
        </div>
        
    );
    // return(0);
}

export default Quiz;