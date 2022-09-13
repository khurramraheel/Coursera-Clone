import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Avatar,Button,Modal} from '@mui/material';
import {useState} from 'react';
import {useSelector} from "react-redux";
import { Link,useNavigate } from 'react-router-dom';
import store from '../../Store/Store'
import  SignUp  from '../Signup/Signup';
import  LogIn  from '../Login/Login';
const drawerWidth = 240;


function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let navigate=useNavigate();
  let user = useSelector((store)=>{
      return store.userReducer.currentUser;
    })

    let state = useSelector((store)=>{
      return store.userReducer.state;
    })

    console.log(state)
        const [anchorEl, setAnchorEl] = React.useState(null);
        
        const isMenuOpen = Boolean(anchorEl);
        
        const handleProfileMenuOpen = (event) => {
          setAnchorEl(event.currentTarget);
        };


        const handleMenuClose = () => {
          setAnchorEl(null);
                   
        }; 
 
        const [open, setOpen] = useState(false);
        const [open1, setOpen1] = useState(false);
  
                 const handleOpen1 = () => {
                    setOpen1(true);
                 };
  
                 const handleOpen = () => {
                    setOpen(true);
                 };



                function Login(){
                  handleOpen1();
                }  
                
                function Signup(){
                  handleOpen()
                }  

                function Logout(){

                  store.dispatch({
                    type:"USER_LOGGED_OUT"
                  })
                  navigate("/")
                }  
                  
                function Admin(){

                  navigate(`/AdminDashboard${user._id}`)
                  }
                  function Teacher(){

                  navigate(`/TeacherDashboard${user._id}`)
                  }    

                  function Student(){

                  navigate(`/StudentDashboard${user._id}`)

                }  

                let customCss={
                  marginBottom:"3px",
                  height: "75px",
                }
        
                let LButton={
                      margin:"7px",
                      padding:"5px",
                      height:"50px",
                      marginTop:"12px",
                    }
                  
                let SButton={
                      margin:"7px",
                      padding:"5px",
                      height:"50px",
                      marginTop:"12px",
                }      

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2,textDecoration:'none' }}>
      <Link id='lnk' to='/'><h3 id='logo-heading'>couresra</h3></Link>
      </Typography>
      <Divider />
      <List>
      {  user.userType == "Student"  ?<Button  style={SButton} onClick={Student} variant="contained">
                 My Course
          </Button>
          :user.userType == "Teacher"  ? <Button  style={SButton} onClick={Teacher} variant="contained">
                <strong>  Upload Course </strong>
          </Button>:user.userType == "Admin" ?
          <Button  style={SButton} onClick={Admin} variant="contained">
             <strong>Admin Dashboard  </strong>
          </Button> :null
          } 
          
          { !user.userType &&
            <Button  style={SButton} onClick={Signup} variant="contained">
             <strong> Join For Free  </strong>
          </Button> 
          }
          
          { user.userType && <Button  style={LButton} onClick={Logout} variant="contained">
              <strong> Logout </strong>
          </Button>  }

           
        { !user.userType &&
          <Button  style={LButton} onClick={Login} variant="contained"> 
              <strong> Login </strong>
          </Button> 
        }

      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (<>
    <Box  sx={{ mb:15,display: 'flex' }}>
      <AppBar component="nav" sx={{bgcolor:"white" ,mb:23}}>
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
                        <Link   id='lnk' to='/'><h3 id='logo-heading' >couresra</h3></Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

          {  user.userType == "Student"  ?<Button  style={SButton} onClick={Student} variant="contained">
                 My Course
          </Button>
          :user.userType == "Teacher"  ? <Button  style={SButton} onClick={Teacher} variant="contained">
                <strong>  Upload Course </strong>
          </Button>:user.userType == "Admin" ?
          <Button  style={SButton} onClick={Admin} variant="contained">
             <strong>Admin Dashboard  </strong>
          </Button> :null
          } 
          
          { !user.userType &&
            <Button  style={SButton} onClick={Signup} variant="contained">
             <strong> Join For Free  </strong>
          </Button> 
          }
          
          { user.userType && <Button  style={LButton} onClick={Logout} variant="contained">
              <strong> Logout </strong>
          </Button>  }

           
        { !user.userType &&
          <Button  style={LButton} onClick={Login} variant="contained"> 
              <strong> Login </strong>
          </Button> 
        }
         <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             { user.userType  && 
             <Avatar  sx={{ width: 56, height: 56 }} alt={user.name} src={user.userImage} /> 
             }


            </IconButton>
           
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
    <SignUp open={open} setOpen={setOpen} />
    <LogIn open1={open1} setOpen1={setOpen1} />
    </>
  );
}

DrawerAppBar.propTypes = {
  
  window: PropTypes.func,
};

export default DrawerAppBar;