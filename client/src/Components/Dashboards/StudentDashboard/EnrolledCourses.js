import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea ,Button } from '@mui/material';
import axios from "axios";
import {useSelector} from  'react-redux';
import {useState ,useEffect} from "react";
import {Link} from "react-router-dom"


export default function  StudentDashboard({id}) {
   
   
    let [enrollCourses ,setEnrollCourses] = useState([])
    let [xyz,setXyz] = useState("")
   
       useEffect( ()=>{
        fetchUsers();
           async function fetchUsers() {    
              let resp = await axios.get(`/CurrentUser/${id}`);
              console.log(resp.data);
              setEnrollCourses(resp.data.enrolledCourses);
           }
          },[xyz])
    

        let user = useSelector((store)=>{
          return store.userReducer.currentUser;
        })
          
        let state = useSelector((store)=>{
          return store.userReducer.state;
        });
    
                
    return(
        state =="loaded" ? 
        <div  className="MyCourses" > 
        {enrollCourses.map(course => {
              return (
                <div  >
          <Card   sx={{ maxWidth: 280 ,marginBottom:3, }}>
            <CardActionArea  >
              <Link  to={`/CourseDetail${course._id}`}>
              <CardMedia
                component="img"
                height="140"
                image={course.courseImage}
                alt="green iguana"
              />
              </Link>


              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description.slice(0,135)}
                </Typography>
              </CardContent>
            </CardActionArea>
              <Button variant="contained" onClick={async()=>{
                let resp = await axios.post(`/unenrolledCourses/${course._id}/user/${user._id}` );
                 setXyz('xyz')
                }}>UnEnroll</Button>
          </Card>
                </div>
              );
            })}
            </div>
   : null      

    )
}