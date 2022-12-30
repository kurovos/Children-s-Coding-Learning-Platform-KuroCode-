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

function App() {
  // const [user, setUser ] = useState(null);
  // const value = useMemo(()=> ({ user, setUser }), [user, setUser]);

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
        <Route path="/addcourse" element={<AddCourse />}/>
        <Route path="/addvideo" element={<AddVideo />}/>
        <Route path="/updatevideo" element={<UpdateVideo />}/>
        <Route path="/chaptersection" element={<ChapterSection />}/>
        <Route path="/lesson" element={<Lesson />}/>
        <Route path="/courseinfo" element={<CourseInfo />}/>
        <Route path="/videopage" element={<VideoPage />}/>
        <Route path="/enrolmentlist" element={<GetEnrolmentList />}/>
        <Route path="/addquiz" element={<AddQuiz />}/>
        <Route path="/quiz" element={<Quiz />}/>
        <Route path="/managequiz" element={<ManageQuiz />} />
        <Route path="/updatequiz" element={<UpdateQuiz />} />
        <Route path="/addfile" element={<AddFile />} />
      </Routes>
    </Router>
    
  );
}

export default App;
