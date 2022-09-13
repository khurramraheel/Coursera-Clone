import React ,{useState} from "react"
import {CssBaseline} from "@mui/material";
import {TextField} from "@mui/material";
import {Grid} from "@mui/material";
import {Typography} from "@mui/material";
import  makeStyles  from '@emotion/styled';
import {Container,Modal,Box } from "@mui/material"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
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
            width: "100%", 
            marginTop: theme.spacing(3)
         },
         submit: {
            margin: theme.spacing(3, 0, 2)
         }
         }));

         const style = {
          position: 'absolute',
          top: '41%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 480,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        };
       let  customCss={
          left:"45%",
          position:"relative", 
       }


export default function  AddModules(props) {
  let courseid=props.courseid
  let setOpen=props.setOpen
  let setXyz=props.setXyz
        let [moduleName, setModuleName] = useState("");
      
        let [file, setFile] = useState([]);
        
        let [open1, setOpen1] = useState(false);

        const handleClose1= () => {
          setOpen1(false);
        };

        // const handleOpen = () => {
        //   setOpen1(true);
        // };

        let handleFileChange = (event) => {
       
          setFile(event.target.files)

          console.log(file)
        }
        async function uploadModule(e){
          e.preventDefault(); 
          setOpen1(true);
          
          let  module=[
            moduleName,
            file,
          ]
          console.log(module)
          
          let form = new FormData();        
          form.append("moduleName",moduleName)
          for (let i = 0; i < file.length; i++) {
            form.append('videos', file[i])
          }
          
          
          try{
            let resp = await axios.post(`/course/${courseid}/AddModules`, form);
            setModuleName("");
            setFile("");
            setOpen(false);
            setOpen1(false);
            toast.success("Module Added Succesfully");
            setXyz("xyz")
            
            // console.log(resp.data)
             }
             catch(e){
             toast.error("Something Went Wrong")
             console.log(e);
           }      
     
             }

       const classes = useStyles();     

   return(
        <> 
      <Container   sx={{ mt: 2 }}  component="main" maxWidth="xs">
      <CssBaseline />
      <div  className={classes.paper}>
        <Typography sx={{ mb: 1 , ml:16}}   component="h1" variant="h5">
              <p className="Head"> Add Modules  </p>
         </Typography>
        <form className={classes.form} onSubmit={e =>{uploadModule(e)}} >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name=" Module Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Module Name"
                type="text"
                autoFocus
                value={moduleName}
                onChange={(evt) =>setModuleName(evt.target.value)}
              />
            </Grid>
  
            <Grid  item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                    Upload Videos of this Module
                    <input required onChange={handleFileChange} multiple  hidden accept="video/*" type="file" />
                </Button>
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
            Upload Module
          </Button>

        </form>
      </div>
    </Container>         
            <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                      <CircularProgress style={customCss} color="success" />
                       <Typography sx={{ textAlign: 'center'}} > <strong> Please Wait </strong>  </Typography>
                </Box>
            </Modal>
         </>
   )

}