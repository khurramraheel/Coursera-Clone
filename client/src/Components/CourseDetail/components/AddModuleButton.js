import React,{useEffect,useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {Button ,Modal ,Box} from "@mui/material" 
import AddModule  from  "../../AddModules/AddModules";


            const style = {
                position: 'absolute',
                top: '41%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 480,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            };

export default function  AddModuleButton(props) {
let courseDetails=props.courseDetails
let setXyz=props.setXyz

    const [open, setOpen] = useState(false);
     
    let [courses, setCourses] = useState([])
   
    let {courseid} = useParams();
      
    // useEffect(()=>{
    //         async function loadCourses(){
    //             let resp = await axios.get('/allCourses');
    //             setCourses(resp.data);
    //             console.log(resp.data);
    //           }
    //           loadCourses();
    //         }, [])
                         
        // let   courseDetails = courses.filter( course => course._id == courseid) ;
        //    console.log(courseDetails)   
           
           
           const handleClose = () => {
            setOpen(false);
         };

         const handleOpen = () => {
            setOpen(true);
         };

   return(
        <div div> 
        <Button variant="contained" onClick={handleOpen}>Add Module </Button> 
        {
            courseDetails.map((course) =>{
                return(
                    <>
              
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                            >
                        <Box sx={style}>
                                <AddModule setXyz={setXyz} setOpen={setOpen}  courseid={course._id} />
                        </Box>
                    </Modal>
                    
                    </>
                   )
                }) }    
                </div>
                )       
            }


            // {
            //     courseDetails.map((course) =>{
            //         return(
            //             <>  
            //             </>
            // )
            // }) }    