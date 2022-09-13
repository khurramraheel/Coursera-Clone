// import {useSelector} from "react-redux";
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import {useState ,useEffect} from 'react';

export default({courseDetails})=>{

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

         let  user = users.filter( user => user._id == userID)
    

  return (<>
  
  {
     user.map((user) =>{
          return(
         <>  
          <div id="inst">
            <p id="yo">Instructor</p>
            <div id='instuctorMain'>
              <div id="teacher_image">
              {/* <img id="my-image" src={user.userImage} alt="Teachers Image"/> */}
              <Avatar   sx={{ width: 100, height: 100 }} id="my-image" src={user.userImage} alt="Teachers Image" />
              </div>
              <div id="teacher_detail">
                  <p id="teacherPara">
                      {user.name}
                  </p>
                  <p className="adj1">Professor</p>
                  <p className="adj">{user.profession}</p>
                  <div className="adj2">
                  <span>
                  <i id='cu' class="fa-solid fa-user-group">
                  </i>
                  </span>
                    1000000 learners
                  </div>
                  <div className="adj3"><span><i id='cu'  class="fa-solid fa-book-open">         
                  </i></span>1 course</div>
              </div>
            </div>
            </div>
           </>
                   )
                }) }  
   
  </>)
}