import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


export default function RowAndColumnSpacing() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (
    // distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo 
    <Box sx={{ width: '100%',mt:8 }}>
      <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Item sx={{bgcolor:'#f5f5f5',}} >
          <div id='mainFlex'>
            <div id='a' >
            <p id='one'>Coursera</p>
            <Link className='text' to='/'>About</Link>
            <p className='only-txt'>Leadership</p>
            <p className='only-txt'>Careers</p>
            <p className='only-txt'>Catalog</p>
            <p className='only-txt'>Coursera Plus</p>
            <p className='only-txt'>Professional Certificates</p>
            <p className='only-txt'>MasterTrack® Certificates</p>
            <p className='only-txt'>Degrees</p>
            <p className='only-txt'>For Enterprise</p>

           </div>
           <div id='b'>
            <p id='two'>Browse popular topics</p>
            <p className='only-tx'>Free Courses</p>
            <p className='only-tx'>Catalog</p>
            <p className='only-tx'>Coursera Plus</p>
            <p className='only-tx'>Professional</p>
            <p className='only-tx'>Degrees</p>
            <p className='only-tx'>For Enterprise</p>
           </div>
           <div id='b'>
            <p id='two'>More </p>
            <p className='only-tx'>Press</p>
            <p className='only-tx'>Investors</p>
            <p className='only-tx'>Terms</p>
            <p className='only-tx'>Privacy</p>
            <p className='only-tx'>Help</p>
            <p className='only-tx'>Accessibility</p>
            <p className='only-tx'>Contact</p>
            <p className='only-tx'>Articles</p>
            
           </div>
           <div id='maintaining-distance'>
           <div>
           <img id='img_adj' src='en.svg' alt='this is apple image'/>
           <div><img id='img_adj' src='45.png' alt='this is apple image'/></div> 
           <div><img id='imageArrange' src='B.png' alt="Just an image"/></div>
           </div>
           </div>
          </div>
         
          
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}