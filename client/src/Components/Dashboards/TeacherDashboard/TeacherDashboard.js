import React,{useEffect,useState} from "react"
import {useNavigate} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MyCourses from "./MyCourses"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddCourseForm  from  "../../AddCourse/AddCourseForm";


      const TeacherDashboardCSS = {
         position:"relative",
         marginLeft:"45%",
         width:'20%',

         top:"-84px",
      }

       
      const style = {
         position: 'absolute',
         top: '35%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         width: 450,
         bgcolor: 'background.paper',
         border: '2px solid #000',
         boxShadow: 24,
         p: 0.7,
       };


export default function TeacherDashboard() {

   const [open, setOpen] = useState(false);
     
  


                
                  const handleClose = () => {
                  setOpen(false);
               };

               const handleOpen = () => {
                  setOpen(true);
               };
               
               useEffect(() => {
                  window.scrollTo(0, 0)
                }, [])


    function AddCourse(){
                   handleOpen()
                  // navigate("/AddCourse")                
              } 
  
           
   return(
      <div>
      <Stack style={TeacherDashboardCSS}  spacing={2} direction="row">
            <Button  onClick={AddCourse} variant="contained" sx={{mt:10}}>Add Course</Button>
       </Stack>

       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
    <Box sx={style}>
            <AddCourseForm setOpen1={setOpen} />
    </Box>
    </Modal>


     <div className="Addcourse"> 
        <h1>My Courses </h1>
           <MyCourses/>
      </div>
   
       </div>             
   )

}