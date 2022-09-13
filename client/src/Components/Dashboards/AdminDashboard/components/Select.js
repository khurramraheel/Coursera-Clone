import React,{useState} from "react"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {InputLabel} from "@mui/material";
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

export default function  Option( {setCategory1} ,{category1} ) {
   
        
   let user = useSelector((store)=>{
      return store.userReducer.currentUser;
    })

    let navigate = useNavigate();
      
    const [open, setOpen] = React.useState(false);

    let [category, setCategory] = useState();

            const handleChange = (event) => {
                setCategory(event.target.value)
                 if(event.target.value=="Teacher"){
                    navigate("/AdminDashboard/TeacherTable")
                 }
                 if(event.target.value=="Student"){
                    navigate("/AdminDashboard/StudentTable")
                 }
                 if(event.target.value=="All Users"){
                    navigate(`/AdminDashboard${user._id}`)
                 }
                 
            };

            const handleClose = () => {
            setOpen(false);
            };
            const handleOpen = () => {
            setOpen(true);
            };
    
   return(
        <>  
        <FormControl sx={{  minWidth:398 }}>
      <InputLabel id="demo-controlled-open-select-label"> Select User Type</InputLabel>
       <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          label="Select User Type"
          onChange={handleChange}
        >
          <MenuItem value=""> <strong> User Type </strong> </MenuItem>
          <MenuItem value ="Student" > Student </MenuItem>
          <MenuItem value ="Teacher" > Teacher  </MenuItem>
          <MenuItem value ="All Users" > All Users  </MenuItem>
          
       </Select>
    </FormControl>
        
        </>
   )

}