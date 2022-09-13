import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import {useState,useEffect} from "react";
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'

export  default function EnrollButton({courseDetails}) {
                
      let [users, setUsers] = useState([]);
      let [abc, setAbc] = useState();
      let [xyz, setXyz] = useState();
      let [enrollCourses ,setEnrollCourses] = useState([])

          let  courseid = courseDetails.map((course) =>{
                        return course._id  
                  })    
        
                let  course= courseDetails[0]
              
              let user = useSelector((store)=>{
                return store.userReducer.currentUser;
              })
              
            useEffect( ()=>{
                
                async function fetchUsers() {    
                  let resp = await axios.get('/allUsers');
                  setUsers(resp.data);
                }
                fetchUsers();
            }, [abc,xyz]);
            
        
            
            let   User = users.filter( xyz=> xyz._id == user._id) ;

             useEffect( ()=>{
             User.map((user)=>setEnrollCourses(user.enrolledCourses) )
            
            }, [User]);
         
      
              let thisCourse =enrollCourses.filter( thisCourse=>  thisCourse._id == courseid )
          
             
             function enrollCourse(){
              enrollCourse1()
              async  function enrollCourse1(){
                let resp = await axios.post(`/enrolledCourses/${courseid}/user/${user._id}`,course );
                 toast.success("Enrolled Succesfully");
                setXyz("xyz")
                console.log(resp.data)
              } 
            }
            
            
            function unEnrollCourse(){
              enrollCourse1()
              async  function enrollCourse1(){
                let resp = await axios.post(`/unenrolledCourses/${courseid}/user/${user._id}`);
                 toast.success("UnEnrolled Succesfully");
                setAbc("Abc")
                console.log(resp.data)
              } 
            }
            
    return (
      <Stack spacing={2} direction="row">

      
      { user.userType =="Student" & thisCourse.length==0?
       <Button onClick={enrollCourse}  sx={{mt:5, width:140,height:60}}  variant="contained">Enroll Now</Button>    
       : user.userType =="Student"?
      <Button onClick={unEnrollCourse}  sx={{mt:5, width:140,height:60}}  variant="contained">UnEnroll</Button>  :
      null
      }
     
      </Stack>
    );
  }