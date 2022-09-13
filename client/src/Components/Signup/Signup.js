import React,{ useState} from "react";
import {Link} from 'react-router-dom'
import {Avatar} from "@mui/material";
import {CssBaseline} from "@mui/material";
import {TextField} from "@mui/material";
import {InputLabel} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import {FormControlLabel} from "@mui/material";
import {Checkbox }from "@mui/material";
import {Grid} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Typography} from "@mui/material";
import  makeStyles  from '@emotion/styled';
import {Container,Modal,Box } from "@mui/material";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'
// import {useForm, } from 'react-hook-form';

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
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%', 
  transform: 'translate(-50%, -50%)',
  width: 390,
  // height:420,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0.5,
};

export default function SignUp(props) {
       let  setOpen=props.setOpen
       let  open=props.open
  
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [experties, setExperties] = useState("");
  let [type, setType] = useState("");
  let [file, setFile] = useState("");
  
  let [checked, setChecked] = useState(false)
  let [checked1, setChecked1] = useState(false)

        function handleChange(e){
          setType(e.target.value)
          setChecked(true)
          setChecked1(false)
        }
        function handleChange1(e){
          setType(e.target.value)
          setChecked1(true)
          setChecked(false)
        }
          
        let navigate = useNavigate();
       
  let handleFileChange = (event) => {
    // let imgUrl =URL.createObjectURL(event.target.files[0])
    // setFile(imgUrl);
    setFile(event.target.files[0])
    console.log(file)
  }
    async function saveUser(e){
        e.preventDefault(); 
        let form = new FormData();        
        form.append("name",name)
        form.append("email",email)
        form.append("password",password)
        form.append("userType",type)
        form.append("profession",experties)
        form.append('userImage',file) 
            // console.log(form)
           
        try{
               let resp = await axios.post('/signup', form);
               if(resp.data=="User Already Exists"){
                toast.error("Email Already Exist "); 
                setEmail("")
               }else{
                setName("")
                setEmail("")
                setPassword("")
                setExperties("")
                setType("")
                setChecked1(false)
                setChecked(false)
                setFile("")
                navigate("/")
                setOpen(false)
               toast.success("User Created Succesfully ")
               }
            }
            catch(e){
            toast.error("User already exist")
            console.log(e);
          }
              
            }
            const handleClose = () => {
              setOpen(false);
           };
  const classes = useStyles();

  return (
    
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
   <Box sx={style}>
    <Container sx={{ mt: 0}}  component="main" maxWidth="xs">
      <CssBaseline />
      <div  className={classes.paper}>
        <Avatar  sx={{ mb: 0.5 , ml:"40%"}} className={classes.avatar}>
          <AccountCircleIcon  />
        </Avatar>
        <Typography sx={{ mb: 0.5 , ml:"35%"}}   component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={e =>{saveUser(e)}} >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label=" Name"
                type="text"
                autoFocus
                value={name}
                onChange={(evt) =>setName(evt.target.value)}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(evt) =>setEmail(evt.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(evt) =>setPassword(evt.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name=" Experties"
                label=" Experties"
                type="text"
                id=" Experties"
                autoComplete="current-Experties"
                value={experties}
                onChange={(evt) =>setExperties(evt.target.value)}
              />
            </Grid>

             <Grid item xs={12}>
               <InputLabel htmlFor="CheckBox">Select One</InputLabel>
               <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={checked1}  onChange={handleChange1} value="Teacher" color="primary" />}
                label="Teacher"
              />
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} value="Student" color="primary" />}
                label="Student"
              />
               </FormGroup>  
            </Grid>

            <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                    Upload
                    <input required onChange={handleFileChange}  hidden accept="image/*" type="file" />
                </Button>
                {/* <IconButton color="primary" aria-label="upload picture" component="label">
                    <input required onChange={handleFileChange} hidden accept="image/*" type="file" />
                    <PhotoCamera />
                </IconButton> */}
            </Stack>
            </Grid>
          </Grid>

          <Button sx={{ mt: 1}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
         </Grid>

        </form>
      </div>
    </Container>
    </Box>
   </Modal>   
  );
}

      
    