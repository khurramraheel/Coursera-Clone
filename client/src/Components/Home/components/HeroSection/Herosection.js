import  React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SignUp from "../../../Signup/Signup";
import {useSelector} from "react-redux";
  const Img = styled('img')({
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export default function ComplexGrid() {

        let user = useSelector((store)=>{
          return store.userReducer.currentUser;
        })

          const [open, setOpen] = useState(false);
          
          const handleOpen = () => {
            setOpen(true);
        };

        function Signup(){
          handleOpen()
        }  


  return (
    <>
     
      <Grid item sx={{ml:10}} >
          
            <Grid item  xs width={570}  >
              <Typography gutterBottom variant="subtitle1" component="div">
              <p id='font-adjustment'>Learn without limits</p>
              </Typography>
              <Typography sx={{mt:3}} variant="body2" gutterBottom>
               <p id='small-text'>Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.</p>
              </Typography>
            </Grid>
            <Grid item>
           <Stack sx={{ cursor: 'pointer' }} direction="row" mt={1} mb={2} spacing={4}>
          <div className='set1'>
           {user.userType ? <Typography> <h1> Welcome <strong> {user.name} </strong> </h1>  </Typography> : 
           <Button  onClick={Signup} id="joinbtn" variant="contained" sx={{width:238,height:72}}><span className= "cds-button-label" >
             Join for free  </span></Button>}
             </div>
             </Stack>
            </Grid>
          </Grid>
        
        
        <Grid item   xs={12} sm container >
          
          <img id='firstImage' src='CourseraLearners.png' alt=""/>
         
        </Grid>
        
           <SignUp open={open} setOpen={setOpen} />
    </>
  );
}