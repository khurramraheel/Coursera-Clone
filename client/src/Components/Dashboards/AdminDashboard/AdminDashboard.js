import React ,{ useState,useEffect}  from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import {Stack,Grid,Typography} from '@mui/material';
import axios from 'axios';
import  makeStyles  from '@emotion/styled';
import {Link,useNavigate} from "react-router-dom";
import Option from "./components/Select";
import Stats from "./components/Stats";

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

const columns = [
   { id: 'name', label: 'Name', minWidth: 100 },
   { id: 'password', label: 'Password', minWidth: 100 },
   { id: 'email', label: 'Email', minWidth: 80,  },
   { id: 'User Type', label: 'User Type', minWidth: 80,  },
   { id: 'Full Profile', label: 'Profile Link', minWidth: 80,  },
   { id: 'Delete Profile', label: ' Delete User', minWidth: 80,  },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

export default function AdminDashboard() {
 let resp ;
     let navigate= useNavigate();
    const classes = useStyles();   

    let [users, setUsers] = useState([]);
    let [abc, setAbc] = useState("");
   
      useEffect( ()=>{
         
         async function fetchUsers() {    
            let resp = await axios.get('/allUsers');
            console.log(resp.data);
            setUsers(resp.data);
         }
         fetchUsers();
         
      },[abc]);

        
            const [page, setPage] = React.useState(0);
            const [rowsPerPage, setRowsPerPage] = React.useState(10);

         const handleChangePage = (event, newPage) => {
            setPage(newPage);
         };

         const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
         };

  return (
      <div className="Table-Container" >
     <Stats/> 
    <Option/>
           <h1>  All Users Data </h1>
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer   component={Paper} sx={{ maxHeight: 440 }}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow  >
              {columns.map((column) => (
                <TableCell
                 className={classes.tableHeaderCell}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                   <strong> {column.label} </strong> 
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user,index) =>user.userType!=="Admin"? (
            <TableRow hover role="checkbox" tabIndex={-1} key={user.code}>
            <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt="userImage" src={user.userImage} className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography  className={classes.name}> <strong>{user.name} </strong></Typography>
                          <Typography color="textSecondary" variant="body2">{user.profession}</Typography> 
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="error.main" variant="body2">{user.password}</Typography>    
           </TableCell>
            <TableCell > <Typography color="primary" variant="subtitle2">{user.email}</Typography></TableCell>       
            <TableCell > <Typography color="success.dark" variant="subtitle2">{user.userType}</Typography></TableCell>                
            <TableCell > 
              <Typography color="success.dark" variant="subtitle2"> 
               <Link  to={`/user${user._id}`} >View Profile </Link>
             </Typography>
            </TableCell>      

              <TableCell >
               <Typography color="success.dark" variant="subtitle2">
               <button onClick={async()=>{

                      resp = await axios.delete(`/delete-user/${user._id}`)
                       setAbc(resp.data)           
                       
                      }}>Delete User</button>
              </Typography>
               </TableCell>  
              
          </TableRow>
               
              ):null
            )} 
          </TableBody>
         
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   </div>
   
  );
}







