import React,{ useState} from "react"
import {useNavigate} from 'react-router-dom'
import {CssBaseline} from "@mui/material";
import {TextField} from "@mui/material";
import {InputLabel} from "@mui/material";
import {Grid} from "@mui/material";
import {Typography} from "@mui/material";
import  makeStyles  from '@emotion/styled';
import {Container } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {useSelector} from 'react-redux'
import axios from "axios";
import {toast} from 'react-toastify'

          const useStyles = makeStyles(theme => ({
              "@global": {
              body: {
                backgroundColor: theme.palette.common.white
              }
            },
            paper: {
                marginTop: theme.spacing(8),
              display: "flex",
              flexDirection: "column",
              alignItems: "center" 
            },
            avatar: {
              margin: theme.spacing(1),
              backgroundColor: theme.palette.secondary.main
            },
            form: {
              width: "100%", // Fix IE 11 issue.
              marginTop: theme.spacing(3)
            },
            submit: {
              margin: theme.spacing(3, 0, 2)
            }
          }));


          const TexteraCSS = {
            width:"395px",  
              marginBottom :"10px",
          }
          // const FormCss={
          //   marginTop: "120px"
          // }

export default  function AddCourse({setOpen1}){

          let navigate=useNavigate()

        const [open, setOpen] = useState(false);
        

        const handleClose = () => {
          setOpen(false);
        };

        const handleOpen = () => {
          setOpen(true);
        };

        const handleChange = (event) => {
          setCategory(event.target.value);
        };

        
        let [courseName, setCourseName] = useState("");
        let [category, setCategory] = useState("");
        let [description, setDescription] = useState("");
        let [file, setFile] = useState("");
        
        let user = useSelector((store)=>{
          return store.userReducer.currentUser;
        })
       console.log(user)
        let handleFileChange = (event) => {
          // let imgUrl =URL.createObjectURL(event.target.files[0])
          // setFile(imgUrl);
          setFile(event.target.files[0])
          console.log(file)
        }
        async function uploadCourse(e){
          e.preventDefault(); 
          let  course=[
              courseName,
              category,
              description,
              file,
              user._id
            ]
            console.log(course)
          let form = new FormData();        
          form.append("courseName",courseName)
          form.append("description",description)
          form.append("category",category)
          form.append('courseImage',file) 
          form.append("userID",user._id);    
          
          try{
            let resp = await axios.post(`/user/${user._id}/AddCourse`, form);
            setCourseName('')
            setDescription('')
            setCategory('')
            setFile('')
            setOpen1(false)
            toast.success("Course Created Succesfully");
            console.log(resp)
                  }
                  catch(e){
                    toast.error("Something Went Wrong")
                  console.log(e);
                }      
             
                  }
            const classes = useStyles();
    return(
    <div>
  
      <Container  sx={{ mt: 2 }}  component="main" maxWidth="xs">
      <CssBaseline />
      <div  className={classes.paper}>
        <Typography sx={{ mb: 1 , ml:16}}   component="h1" variant="h5">
              <p className="Head"> Add Course  </p>
         </Typography>
        <form className={classes.form} onSubmit={e =>{uploadCourse(e)}} >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name=" Course Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Course Name"
                type="text"
                autoFocus
                value={courseName}
                onChange={(evt) =>setCourseName(evt.target.value)}
              />
            </Grid>
        
        <Grid item xs={12}>
    <FormControl sx={{  minWidth:390 }}>
      <InputLabel id="demo-controlled-open-select-label">Course Category</InputLabel>
       <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          label="Course Category"
          onChange={handleChange}
        >
          <MenuItem value=""> <em>Select Category</em> </MenuItem>
          <MenuItem value ="Data Science" > Data Science  </MenuItem>
          <MenuItem value ="IT & Computer Sciences" > IT & Computer Sciences  </MenuItem>
          <MenuItem value ="Business & Management" > Business & Management </MenuItem>
          <MenuItem value ="Arts & Sciences"> Arts & Sciences </MenuItem>
          <MenuItem value ="Medical Sciences"> Medical Sciences </MenuItem>
          <MenuItem value ="Others"> Others</MenuItem>
       </Select>
    </FormControl>
            </Grid>

            <Grid item xs={12.1}>
               <TextField 
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}     
                style={TexteraCSS}   
                value={description}
                onChange={(evt) => setDescription(evt.target.value)}        
                />    
            </Grid>
            </Grid>
            <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                    Upload Cover Image
                    <input required  onChange={handleFileChange}   hidden accept="image/*" type="file" />
                </Button>
                {/* <IconButton color="primary" aria-label="upload picture" component="label">
                    <input  onChange={handleFileChange}  hidden accept="image/*" type="file" />
                    <PhotoCamera />
                </IconButton> */}
            </Stack>
            </Grid>  

          <Button sx={{ mt: 1}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Upload  Course
          </Button>
        </form>
      </div>
    </Container>    
      
        </div>
    )
}