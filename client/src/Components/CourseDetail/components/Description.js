import  React,{useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {Paper,Avatar} from '@mui/material';
import Box from '@mui/material/Box';
import EnrollButton from "./EnrollButton";
import axios from 'axios'

export default function Hero({courseDetails} ) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
      }));
        
      let [users, setUsers] = useState([]);
      
        
      let  userID = courseDetails.map((course) =>{
                return   course.userID  
          })        

         useEffect( ()=>{
           
           async function fetchUsers() {
               
               let resp = await axios.get('/allUsers');
               console.log(resp.data);
               setUsers(resp.data);
           }
           fetchUsers();
           
         }, []);
 
          let  user= users.filter( user => user._id == userID)
         
      //  console.log(user)
  return (
              <Box  sx={{ width: '100%',mt:-6 }}>
                  <div className='dis'>
                  <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                   
      
                {
                  
                   courseDetails.map((course) =>{
                             return(
                     <>
                        <Item sx={{bgcolor:'#00b0ff',}} >
                          <div id='main'>
                    { user.map((user)=>{
                          return(
                        <>
                          <div id='ing'>
                            <h1 id='align-ment2'>{course.courseName}</h1>
                            <div className="Teacher" >
                            <Avatar  sx={{ width: 40, height: 40 }} id='img-adj' alt="Remy Sharp" src={user.userImage} /> 
                             <span id='adj'> {user.name} </span>
                             </div>
                            <EnrollButton  courseDetails={courseDetails} />
                            {/* <div><span id='just-color'>already enrolled by 100000</span></div> */}
                          </div>
                            <div id='distance'>
                              <p id='align-ment1'>Offered by</p> 
                              <h1 id='align-ment'>{user.name}</h1>
                            </div>
                        </>
                          );
                      })}
                        </div>
                          </Item>
                         </>
                               )
                            }) } 
   
                  </Grid>               
                  </Grid>
                  </div>
              
                </Box>
    
  );
}
