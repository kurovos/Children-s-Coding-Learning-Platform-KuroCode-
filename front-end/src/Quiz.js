import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Row, Col, Breadcrumb } from 'react-bootstrap';
import Background from "./picture/quizbackground.jpg";
import { useNavigate } from "react-router-dom";

const Quiz = ()=>{
    const chapterID = localStorage.getItem('chapterID');
    const userID = localStorage.getItem('userID');
    const courseID = localStorage.getItem('courseID');
    const userType = localStorage.getItem('userType');
    const [quizList, setQuizList] = useState([]);
    const [quizLength, setQuizLength] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionCurrent, setQuestionCurrent] = useState(false);
    const [isAnswer, setIsAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [checkpoint, setCheckPoint] = useState(false);
    const [quizVisible, setQuizVisible] = useState(false);
    const[cname, setCName] = useState("");

    const navigate = useNavigate();

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
        const getActivity = async()=>{
            if(userType === "student"){
                try{
                    //check acitvity
                    const res = await axios.get(`http://localhost:3001/getactivity/${userID}/${chapterID}`);
                    console.log(res.data);
                    console.log(res.data[0].activity_file);
                    console.log(res.data[0].activity_video);
                    console.log(res.data.length);
                    if(res.data.length !== 0 ){
                        // setCheckPoint(false);
                        // console.log(checkpoint);
                        // //create new activity
                        // axios.post("http://localhost:3001/activity",{
                        //     activity_video : checkpoint,
                        //     chapter_ID : chapterID,
                        //     stu_ID : userID
                        // }).then((response) =>{
                        //         console.log(response);
                        //     }
                        // ).catch((error)=>{
                        //         console.log(error);
                        //     }
                        // );

                        //*block the user to do quiz
                        console.log(res.data[0].activity_file);
                        console.log(res.data[0].activity_video);
                        if(res.data[0].activity_quiz !== 1){
                            if(res.data[0].activity_video === 1 || res.data[0].activity_file === 1){
                                setQuizVisible(true);
                                console.log(quizVisible);
                            }else{
                                setQuizVisible(false);
                                console.log(quizVisible);
                            }
                        }else if(res.data[0].activity_quiz === 1){
                            setQuizVisible(true);
                        }
                        // console.log(x);
                        
                    }else{
                        //if got data set the quiz activity into checkpoint *(need?)
                        setCheckPoint(res.data.activity_quiz);
                    }

                }catch(err){
                    console.log(err);
                    return err;
                }
            }
        };
        const getScore = async()=>{
            try{
                const res2 = await axios.get(`http://localhost:3001/score/${userID}`);
                console.log(res2.data);
                if(userType === "student"){
                    if(res2.data.length !== 0){
                        res2.data.forEach((props)=>{
                            if(props.chapter_ID == chapterID){
                                setScore(props.score_score);
                                setQuestionCurrent(true);
                            }
                        });
                    }
                }
            }catch(err){
                console.log(err);
                return err;
            }
        };
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
        getActivity();
        getQuiz();
        getScore();
    },[quizVisible])

    const checkAnswer = (ansValue)=>{
        if(ansValue === quizList[questionNumber].quiz_answer && !isAnswer){
            setIsAnswer(true);
            setScore(score+1);
            alert("Correct Answer!");
        }else if(ansValue !== quizList[questionNumber].quiz_answer && !isAnswer){
            setIsAnswer(true);
            alert("False Answer");
        }else{
            alert("You have already answered this question");
        }
    }

    const postScore = ()=>{
        if(userType === "student"){
            axios.post("http://localhost:3001/score",{
                chapter_ID : chapterID,
                score_score : score,
                stu_ID : userID,
                course_ID : courseID
            }).then((response) =>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            });

            setCheckPoint(true);
            try{
                axios.put(`http://localhost:3001/ua_quiz/${chapterID}`,{
                    activity_quiz : true,
                    stu_ID : userID
                }).then((response) =>{
                    console.log(response);
                }).catch((error)=>{
                    console.log(error);
                });
            }catch(err){
                console.log(err);
                return err;
            }
            console.log(checkpoint);
        }else if(userType === "teacher"){
            return;
        }
        console.log(checkpoint);
    }

    const checkCurrent = async(num)=>{
        if((num+1) === quizLength){
            setQuestionCurrent(true);
            postScore();
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
            <Breadcrumb style={{marginLeft: "150px", marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item href="/courseinfo">{cname}</Breadcrumb.Item>
                <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
            </Breadcrumb>
            {/* <Button style={{position: 'absolute', marginLeft: "80px", marginTop: "-80px"}} variant="danger" onClick={(e)=>{navigate(-1)}}>Back</Button> */}
            {quizVisible === false?
                <div style={{ width: '1000px', height:'600px', textAlign:'center', margin:"auto", marginTop:"100px"}} className= "border border-primary bg-light rounded">
                <div style={{ width: '50%', height:'50%', margin:"auto", borderRadius: '50%', marginTop:'20%'}}>
                    <h1>Please complete other lesson in this chapter!</h1>
                </div></div>:<>
            {questionCurrent?
                <div style={{ width: '1000px', height:'600px', textAlign:'center', margin:"auto", marginTop:"100px"}} className= "border border-primary bg-light rounded">
                <div style={{ width: '50%', height:'50%', margin:"auto", borderRadius: '50%', marginTop:'20%'}}>
                    <h1>Complete Quiz</h1>
                    <p>Your Score: {score} / {quizLength}</p>
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
            </>}
            {questionCurrent?
            <div style={{ marginTop: "50px", marginLeft: "1160px" }}>
                    <Button variant="danger" onClick={(e)=>{navigate("/file")}}>Back</Button> 
                    <Button style = {{ marginLeft: "50px"}} onClick={(e)=>{navigate("/courseinfo")}}>Complete</Button>
            </div>:<></>}
            
        </div>
        
    );
}

export default Quiz;