import AddModuleButton from "./AddModuleButton"
import {useSelector} from 'react-redux';
import {useState,useEffect} from 'react';
import {Link} from "react-router-dom"
import axios from "axios";

export default(props)=>{
     let courseDetails=props.courseDetails
     let id=props.courseId
  let [moduleSeries , setModuleSeries] =useState([])
  let [userID , setUserID] =useState('')
  let [xyz ,setXyz]=useState("")
  let [courses, setCourses] = useState([])
  let [course, setCourse] = useState([]);

  // function display(){
  //   let element = document.getElementById("ele");
  //     var x = document.getElementById("btn");
  //     if (x.innerHTML === "See All") {
  //       element.classList.remove("displayNone");
  //       x.innerHTML = "See less";
  //     } 
  //     else {
  //       x.innerHTML = "See All";
  //       element.classList.add("displayNone");
  //     }   
  //   }
  
        let user = useSelector((store)=>{
          return store.userReducer.currentUser;
        })


      useEffect( ()=>{
        fetchUsers();
           async function fetchUsers() {    
              let resp = await axios.get('/CurrentCourse?id='+id);
              console.log(resp.data);
              setModuleSeries(resp.data.ModulesSeries);
             setUserID(resp.data.userID)
           }
          },[xyz])
      

    return(<>
     
    <hr id='myRule'/>
      <p className="sy-txt">Syllabus-What you will learn from this course</p>
      <div id='md-main'>
         {  user.userType == "Teacher" & userID == user._id ? <AddModuleButton setXyz={setXyz} courseDetails={courseDetails} /> : (moduleSeries.length) == 0 ? <h2> Coming Soon </h2>  :null }
       
        { moduleSeries.map((module ,index)=>{
              return(
            <>    
              <div class="week" > 
                <p  id='module_hit'>Week</p>
                <p  id='number'>{index+1}</p>
                  </div>
                  <div id='textdiv'>
                      <p className="last">{module.moduleName}</p>
                      {/* <p className="last1">Why take this course ?</p> */}
                      <span><div className='round2s1' ><i id='cul'  class="fa-solid fa-book-open">

                      </i></div><span id="space">{(module.videos).length} videos </span>
                      {/* <button id="btn">See All</button>  */}
                    </span>
                        <div  >
                        <div id="hite1">
                        <i class="fa-solid fa-circle-play"></i>
                        <span id="hite">{(module.videos).length} videos</span>
                 {(module.videos).map((video ,vIndex)=>{
                            let def = video.split('-');
                              let h = def[def.length-1];
                              let Title = h.split('+').join(' ');
                      return(
                          <Link className="Link" to={`/Course${id}/Module${module._id}/Videos${vIndex}`}>
                            <p> {Title} </p> </Link>
                      )
                 })  } 
                        </div>
                          
                      </div>
           
                    {/* <div className="displayNone" id='ele'> */}
                  </div>
              <hr/>
           </>
          );
        }
        )
        }
 
      </div>
      <hr id='myRule'/>
    </>)
}