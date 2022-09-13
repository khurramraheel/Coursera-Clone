import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from "axios";
import {useState,useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function RowAndColumnSpacing() {
                     
 let    [totalUsers , setTotalUsers] =useState("")
    let [totalCourses , setTotalCourses] =useState("")

            useEffect( ()=>{
                    
                async function fetchUsers() {
                    let resp = await axios.get('/totalUsers');
                    setTotalUsers(resp.data);
                  
                }
                fetchUsers();
                
            });

            useEffect( ()=>{
            
                async function fetchUsers() {
                    let resp = await axios.get('/totalCourses');
                    setTotalCourses(resp.data);
                    
                }
                fetchUsers();
                
            });
            let customCss={
              position: "relative",
              left: "16%",
              marginTop: "27px",
              marginBottom: "25px",
              
            }
          
            
            let cardColor={
              backgroundColor:"#ddd9d9",
            }  
            const theme = useTheme();   
            // let cardColor=useMediaQuery('(min-width:600px)', {display:"none"})
            // const cardColor = useMediaQuery( theme.breakpoints.up('min-width:600px'), {display:"hide"});
        // [theme.breakpoints.up(780)]: {
        //  display:"none"
        // }
    
    let textCss={
       textAlign:"center",
      
    }
  return (
    <Box style={customCss} sx={{ width: '100%', }}>
      <Grid  container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid  item xs={4}>
        <Card style={cardColor} sx={{ maxWidth: "100%" }}>
      <CardContent>
        <Typography style={textCss} gutterBottom variant="h5" component="div" sx={{color:'#2196f3'}}>
          Total users
        </Typography>
        <Typography style={textCss} variant="body2" sx={{fontSize:22,}} color="text.secondary" >
         {totalUsers} 
           
        </Typography> 
        <Typography style={textCss} sx={{fontSize:14,fontWeight:700}}>
        total enrolled student
          </Typography>
      </CardContent>
      <CardActions sx={{ml:"34%",}} >
      <PeopleAltIcon sx={{color:'#2196f3',fontSize:72}}/>
         
      </CardActions>
    </Card>
        </Grid>
        <Grid  item xs={4}>
        <Card  style={cardColor} sx={{ maxWidth: "100%" }}>
      <CardContent>
        <Typography style={textCss}  gutterBottom variant="h5" component="div" sx={{color:'#2196f3'}}>
          Total Courses
        </Typography>
        <Typography variant="body2" style={textCss} color="text.secondary" sx={{fontSize:22,}}>
       {totalCourses}
          
        </Typography>
        <Typography style={textCss} sx={{fontSize:14,fontWeight:700}}>
        total upload course
          </Typography>
      </CardContent>
      <CardActions sx={{ml:"34%",}} >
      <MenuBookIcon sx={{color:'#2196f3',fontSize:72}}/>
      </CardActions>
    </Card>
        </Grid>
        
        
      </Grid>
    </Box>
  );
}