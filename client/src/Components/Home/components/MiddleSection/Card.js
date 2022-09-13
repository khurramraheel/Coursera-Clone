import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', }}>
      <CardMedia
        component="img"
        sx={{ width: 140,height:140 ,mt:1,ml:1}}
        image="Success1.avif"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column',}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
          <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y .</p>
        </CardContent>
      </Box>
      
      
    </Card>
  );
}
