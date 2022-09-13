
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function RowAndColumnSpacing() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        
        

      }));
      
  return (
     <div id='setting'>
    <Box sx={{ width: '100%', }}>
      <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Item sx={{bgcolor:'#f5f5f5',}} >
          
            <h1 id='deal'>We collaborate with <span id='change'>200+ leading universities and companies</span></h1>
          <div id='image-adjsutment'>
          <span id='maintain'><img id='brand-logo' src='illinois.png' alt="illinois image"/></span>
          <span id='maintain'><img id='brand-logo' src='duke.png' alt="duke image"/></span>
          <span id='maintain'><img id='brand-logo' src='google.png' alt="google image"/></span>
          <span id='maintain'><img id='brand-logo' src='IBM.png' alt="illinois image"/></span>
          <span id='maintain'><img id='brand-logo' src='imperial.png' alt="illinois image"/></span>
          <span id='maintain'><img id='brand-logo' src='stanford.png' alt="stanford image"/></span>
          <span id='maintain'><img id='brand-logo' src='penn.png' alt="penn image"/></span>
          </div>
  
          </Item>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}