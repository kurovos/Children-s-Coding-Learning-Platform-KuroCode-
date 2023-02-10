import React, { useState, useMemo } from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import About from './component/About';
import Home from './component/Home';
import Leaderboard from './component/Leaderboard';
import Course from './component/Course';
import Navbar from './Navbar';
import { AddCourse } from './AddCourse';
import { AddVideo } from './AddVideo';
import { RegForm, LogForm } from './Form';
import 'bootstrap/dist/css/bootstrap.css';
import { ChapterSection } from './ChapterSection';
import Lesson from "./component/Lesson";
import UpdateVideo from "./UpdateVideo";
import CourseInfo from "./CourseInfo";
import VideoPage from "./VideoPage";
import GetEnrolmentList from "./GetEnrolmentList";
import AddQuiz from "./AddQuiz";
import Quiz from "./Quiz";
import ManageQuiz from "./ManageQuiz";
import UpdateQuiz from "./UpdateQuiz";
import AddFile from "./AddFile";
import File from "./File";
import LeaderboardCourse from "./LeaderboardCourse";
import UpdateFile from "./UpdateFile";
import Feedback from "./Feedback";
import Profile from "./Profile";
import FeedbackResult from "./FeedbackResult";

function App() {
  // const [user, setUser ] = useState(null);
  // const value = useMemo(()=> ({ user, setUser }), [user, setUser]);
  
  const checkValidateTeacher = (path) =>{
    const userType = localStorage.getItem('userType');
    if(userType === "student"){
        return; 
    }else if(userType === "teacher"){
        return path;
    }else{
        return;
    }
  }

  return (
    <Router>
      <nav>
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/course" element={<Course />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/register" element={<RegForm />}/>
        <Route path="/login" element={<LogForm />}/>
        <Route path= {checkValidateTeacher("/addcourse")} element={<AddCourse />}/>
        <Route path= {checkValidateTeacher("/addvideo")} element={<AddVideo />}/>
        <Route path= {checkValidateTeacher("/updatevideo")} element={<UpdateVideo />}/>
        <Route path="/chaptersection" element={<ChapterSection />}/>
        <Route path="/lesson" element={<Lesson />}/>
        <Route path="/courseinfo" element={<CourseInfo />}/>
        <Route path="/videopage" element={<VideoPage />}/>
        <Route path= {checkValidateTeacher("/enrolmentlist")} element={<GetEnrolmentList />}/>
        <Route path= {checkValidateTeacher("/addquiz")} element={<AddQuiz />}/>
        <Route path="/quiz" element={<Quiz />}/>
        <Route path= {checkValidateTeacher("/managequiz")} element={<ManageQuiz />} />
        <Route path= {checkValidateTeacher("/updatequiz")} element={<UpdateQuiz />} />
        <Route path= {checkValidateTeacher("/addfile")} element={<AddFile />} />
        <Route path= {checkValidateTeacher("/updatefile")} element={<UpdateFile />} />
        <Route path= {checkValidateTeacher("/feedbackresult")} element={<FeedbackResult />} />
        <Route path="/file" element={<File />} />
        <Route path="/leaderboardcourse" element={<LeaderboardCourse/>} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    
  );
}

export default App;
