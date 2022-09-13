import './App.css';
import axios from 'axios';
import {useEffect,useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import store from './Store/Store';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/Navbar/Appbar'
import VideoPage from './Components/VideoPage/VideoPage';
import CourseDetail from './Components/CourseDetail/Detail'
import AddModules from './Components/AddModules/AddModules';
import AddCourse from './Components/AddCourse/AddCourseForm';
import CourseSliderCategory from './Components/CourseSlider/CourseSlider'
import AdminDashboard from './Components/Dashboards/AdminDashboard/AdminDashboard'
import UserProfile from './Components/Dashboards/AdminDashboard/components/UserProfile';
import TeacherDashboard from './Components/Dashboards/TeacherDashboard/TeacherDashboard';
import StudentDashboard from './Components/Dashboards/StudentDashboard/StudentDashboard';
import StudentTable from './Components/Dashboards/AdminDashboard/components/StudentTable';
import TeacherTable from './Components/Dashboards/AdminDashboard/components/TeacherTable';
import {SecureTeacherRoutes} from './Components/Secure/Secure';
import {SecureAdminRoutes} from './Components/Secure/Secure';
import {SecureStudentRoutes} from './Components/Secure/Secure';

function App() {
     
       
        useEffect( ()=>{
          async function sessionkaro(){
              let resp = await axios.get('/session-check-karo?token='+localStorage.getItem("someToken"))
              if(resp.data){
                store.dispatch({
                  type:"USER_LOGGED_IN",
                  payload:resp.data
                });
              }else{
                store.dispatch({
                  type:"session_failed"            
                }); 
            }          
          }
          sessionkaro();
        }, [])
     
  return (
      
     <Provider store={store}>  
        <Router>
        <NavBar/>
          <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/CourseSliderCategory" element={<CourseSliderCategory/>}/>
          <Route exact path="/TeacherDashboard:id" element={
                  <SecureTeacherRoutes>
                     <TeacherDashboard/>
                  </SecureTeacherRoutes>
          }/>
          <Route exact path="/AddCourse" element={
                  <SecureTeacherRoutes>
                       <AddCourse />
                </SecureTeacherRoutes>
          }/>
          <Route exact path="/StudentDashboard:id" element={
                 <SecureStudentRoutes>
                   <StudentDashboard/>
               </SecureStudentRoutes>
          }/>
          <Route exact path="/AdminDashboard:id" element={
                    <SecureAdminRoutes>
                        <AdminDashboard/>
                    </SecureAdminRoutes>
          }/>
          <Route exact path="AdminDashboard/TeacherTable" element={
                <SecureAdminRoutes>
                    <TeacherTable/>
                </SecureAdminRoutes>     
          }/> 
          <Route exact path="AdminDashboard/StudentTable" element={
                 <SecureAdminRoutes>
                    <StudentTable/>
                </SecureAdminRoutes>
          }/> 
          <Route exact path='/user:userid' element={
                  <SecureAdminRoutes>      
                      <UserProfile/>
                  </SecureAdminRoutes>
          }/> 
          <Route exact path='/AddModules' element={
                <SecureTeacherRoutes>
                    <AddModules/>
                </SecureTeacherRoutes>
          }/> 
          <Route exact path='/CourseDetail:courseid' element={<CourseDetail/>}/> 
          <Route exact path='/Course:courseId/Module:moduleId/Videos:vIndex' element={<VideoPage/>}/> 
        </Routes>
        <Footer/>
        </Router>
        <ToastContainer/>          
      </Provider>
  );
}

export default App;
