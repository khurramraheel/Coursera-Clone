import React,{useState,useEffect} from "react"
import { useParams } from "react-router-dom";
import UploadCourses from "./UploadCourses"
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {Typography ,Box ,Grid} from '@mui/material';
import  EnrolledCourses from "./EnrolledCourses";
import {Link} from "react-router-dom";


export default function  UserProfile() {

    let {userid} = useParams()

    let [users, setUsers] = useState([]);
    let [courses, setCourses] = useState([])
    
        useEffect( ()=>{
            
            async function fetchUsers() {
                let resp = await axios.get('/allUsers');
                setUsers(resp.data);
            }
            fetchUsers();
            
        }, []);

        useEffect(()=>{
            async function loadCourses(){
                let resp = await axios.get('/allCourses');
                setCourses(resp.data);
              }
              loadCourses();
            }, [])
     
    let   user = users.filter( user=> user._id == userid) ;

    let   course = courses.filter( course=> course.userID == userid) ;
    


     let customCss={
        marginLeft: "15px",
        marginTop: "40px",

     }
   return(
        <>
        {
            user.map((user) =>{
               return(
                <>
              <div className="UserProfile" >
            <Box   m={"0px"} >
            <Stack direction="row" spacing={2}>
              <Avatar
                    alt="Remy Sharp"
                    src={user.userImage}
                    sx={{ width: 300, height: 300 }}
                />
                <Grid style ={customCss} >

                <Typography  variant="h4" component ="h2"  >
                 <h4  >Name   </h4> 
                </Typography>     
                <Typography  color="primary" variant="h4" component ="h2"  >
                 <p  > {user.name}  </p> 
                </Typography> 
                </Grid>
       
            <Grid style ={customCss}>
                <Typography  variant="h4" component ="h2"  >
                 <h4 >UserType </h4> 
                </Typography>     
                <Typography  color="primary" variant="h4" component ="h2"  >
                 <p > {user.userType}  </p> 
                </Typography>  
             </Grid>

             <Grid style ={customCss}>
                <Typography  variant="h4" component ="h2"  >
                 <h4  >Email</h4> 
                </Typography>     
                <Typography  color="primary" variant="h4" component ="h2"  >
                 <p  > {user.email}  </p> 
                </Typography>  
             </Grid>

               </Stack>
     
            </Box>

         </div>
            { user.userType=="Teacher"? <UploadCourses  userid={userid}/> :
             <EnrolledCourses userid={userid} />}
            </>

               ) 
        })
        }
      </>

);
}
