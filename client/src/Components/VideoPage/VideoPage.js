import React,{useEffect,useState} from "react"
import {useParams,Link} from "react-router-dom";
import axios from "axios";

export default function VideoPage() {
  let [courses, setCourses] = useState([])
  let [moduleSeries , setModuleSeries] =useState([])
    
    let {courseId} = useParams();
    let {moduleId} = useParams();
    let {vIndex} = useParams();
     
     console.log(courseId)
     console.log(moduleId)
     console.log(vIndex)
 
     useEffect(()=>{
        async function loadCourses(){
            let resp = await axios.get('/allCourses');
            setCourses(resp.data);
            console.log(resp.data);
        }
        loadCourses();
    }, [])
      
    let   courseDetails = courses.filter( course => course._id == courseId) ;
    console.log(courseDetails)   
  
        useEffect(()=>{
            courseDetails.map((course) =>{
              setModuleSeries(course.ModulesSeries)      
                console.log(course.ModulesSeries)
            })
          })  


    let   moduleDetails = moduleSeries.filter( module => module._id == moduleId) ;
    console.log(moduleDetails)   

    let VideoPath = moduleDetails.map((module) =>{
              return (module.videos[vIndex])     
      })
      console.log( VideoPath)
      

    let VideoArray= moduleDetails.map((module) =>{
                return (module.videos)     
        })
        console.log( VideoArray)
        
        
    return( 
        <> 
                <video src={VideoPath} className='video' controls />
                <div  className="VideoLinksContainer">
               <h1 className="VideoLinksHeading" > Videos of this Module </h1>
              {
                VideoArray.map((videoA ,index) =>{
                    return(
                    videoA.map((video ,index) =>{
                      let def = video.split('-');
                      let h = def[def.length-1];
                      let Title = h.split('+').join(' ');
                return (                                          
                    <li className ="VideoLinks"> 
                     <Link  className="Link" to={`/Course${courseId}/Module${moduleId}/Videos${index}`}> 
                        {Title} </Link> </li>          
                    )
                    })
                    )
             })
              }
              </div>
         </>
   )

}