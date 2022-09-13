import React,{useEffect,useState} from "react"
import Hero from './components/Description';
import DetailPage from './components/DetailLink';
import {Modal,Box,Typography,Button } from "@mui/material"
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux"
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };

export default function  Detail() {
        let [open, setOpen] = useState(false);
        let navigate =useNavigate();

                const handleClose= () => {
                    setOpen(false);
                };
                let currentUser = useSelector((store)=>{
                    return store.userReducer.currentUser;
                  })
                  
                  useEffect(() => {
                      window.scrollTo(0, 0)
                    }, [])
    
        let {courseid} = useParams();

        let [users, setUsers] = useState([]);
        
        let [courseDetail,setCourseDetail] = useState([]);
        let courseDetails=[]


     useEffect( ()=>{
         fetchUsers();
         async function fetchUsers() {    
             let resp = await axios.get('/CurrentCourse?id='+courseid);
             console.log(resp.data);
             if(resp.data!=null){
                 setCourseDetail(resp.data)
             }
             if(resp.data==null ){
                setOpen(true);                  
              } 
              else {
                setOpen(false)
              }
          
            }
        },[])
        courseDetails.push(courseDetail)

        function unEnrollCourse(){
            enrollCourse1()
            async  function enrollCourse1(){
              let resp = await axios.post(`/unenrolledCourses/${courseid}/user/${currentUser._id}` );
               toast.success("UnEnrolled Succesfully");
               navigate(`/StudentDashboard${currentUser._id}`)
            //   setAbc("Abc")
              console.log(resp.data)
            } 
          }

    useEffect( ()=>{
            async function fetchCourse() {
            let resp = await axios.get('/allUsers');
            console.log(resp.data);
            setUsers(resp.data);
        }
        fetchCourse();
            }, []);
    
    
            console.log(courseDetails)   
           

    let  userID = courseDetails.map((course) =>{
        return   course.userID  
    })        
    let  user = users.filter( user => user._id == userID)
    
   return(
        <>  
            <Hero  user={user} courseDetails={courseDetails} />
            <DetailPage courseId={courseid} courseDetails={courseDetails} />

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                            <Typography>
                             This Course is not Available Any More Please Unenroll
                          </Typography>        
                          <Button variant="contained" onClick={unEnrollCourse}> UnEnroll </Button>             
                </Box>
            </Modal>
            
        </>
   )

}