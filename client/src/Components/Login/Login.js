import React,{ useState} from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {Avatar} from "@mui/material";
import {Button} from "@mui/material";
import {CssBaseline} from "@mui/material";
import {TextField} from "@mui/material";
import {FormControlLabel} from "@mui/material";
import {Checkbox }from "@mui/material";
import {Grid,Modal,Box} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Typography} from "@mui/material";
import  makeStyles  from '@emotion/styled';
import axios from "axios";
import store from "../../Store/Store";
import {toast} from 'react-toastify'
      const useStyles = makeStyles(theme => ({
        root: {
          height: "100vh"
        },
        image: {
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        },
        paper: {
          margin: theme.spacing(8, 4),
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
          marginTop: theme.spacing(1)
        },
        submit: {
          margin: theme.spacing(3, 0, 2)
        }
      }));

      const style = {
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 390,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


  const SignInSide = (props) => {
    let  setOpen1=props.setOpen1
    let  open1=props.open1
     let navigate=useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

  
  async function loginUser(e){
    
    e.preventDefault(); 

    let milgyUser = await axios.post('/login', {
        email,
        password,
        })
        // console.log("milgya user");
        console.log(milgyUser.data); 
        if(milgyUser.data!=="User Not Found"){
          let userType=milgyUser.data.user.userType; 
          let user=milgyUser.data.user
          setEmail("");
          setPassword("");
          setOpen1(false)
          if(userType=="Student"){

            navigate(`/StudentDashboard${user._id}`)
          }
         else if(userType=="Teacher"){

            navigate(`/TeacherDashboard${user._id}`)
          }
          else if(userType=="Admin"){

            navigate(`/AdminDashboard${user._id}`)
          }
          localStorage.setItem("someToken", milgyUser.data.token);
          store.dispatch({
            type:"USER_LOGGED_IN",
            payload:milgyUser.data.user
          });
          toast.success(" Succesfully Login");
           
            console.log("milgya user");
        } else{
            toast.error("user nahi mila")
            console.log('N')
        }
        
    }
    const handleClose1 = () => {
                        setOpen1(false);
                    };
  const classes = useStyles();

  return (
    <Modal
    open={open1}
    onClose={handleClose1}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
   <Box sx={style}>
    <Grid   component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={10}   sm={5} md={3.5} elevation={6} >
        <div className={classes.paper}>
          <Avatar sx={{ mb: 0.5, ml:"40%"}} className={classes.avatar}>
          <AccountCircleIcon/>
      
          </Avatar>
          <Typography sx={{ mb: 0.5 , ml:"35%"}}  component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}  noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(evt) =>setEmail(evt.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(evt) =>setPassword(evt.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginUser}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
      </Grid>
    </Grid>
  </Box>
</Modal>
  );
};

export default SignInSide;
