import Carousel from "react-multi-carousel";
import { Image } from "semantic-ui-react";
import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from "axios";
import {Link} from "react-router-dom";

      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          paritialVisibilityGutter: 60
        },
        tablet: {
          breakpoint: { max: 999, min: 464 },
          items: 2,
          paritialVisibilityGutter: 50
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          paritialVisibilityGutter: 30
        }
      };

// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
  const Simple = ({Category},{deviceType}  ) => {
                  
      let [courses, setCourses] = useState([])

          useEffect(()=>{
            async function loadCourses(){
                let resp = await axios.get('/allCourses');
                setCourses(resp.data);
                console.log(resp.data)
              }
              loadCourses();
            }, [])
            
       
  return (
      <div className="Category-Container" >  
                       
     {courses.filter(course => {
          return (
            course.category ==Category
          );
           }).slice(0,1).map(course => 
           <h1 className="Slider-Heading" >{course.category}</h1>        
            ) }

        <div className="Category" >
          <Carousel
            className="carousel"
            ssr
            deviceType
            itemClass="image-item"
            responsive={responsive}
          >
            {courses.map(course => course.category==Category?
            (
                <>
                <Card sx={{ maxWidth: 250 }}>
            <CardActionArea>
            <Link  to={`/CourseDetail${course._id}`} > 
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
          </Card>
                </>
              ):null
            )}
            
          </Carousel>
          </div>

            
         
      </div>    
  );
};

export default Simple;
/* <Image
  draggable={false}
  style={{ width: "100%", height: "100%" }}
  src={image}
/> */
