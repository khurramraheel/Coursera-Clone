import SignpostIcon from '@mui/icons-material/Signpost';
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SmsIcon from '@mui/icons-material/Sms';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import LayersIcon from '@mui/icons-material/Layers';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import { fontSize } from '@mui/system';

export default({courseDetails})=>{
   return (<>

{courseDetails.map((course) =>{
           return(
     <div>  

    <div id="aboutMain">
      <div id="textabout">
        <p id='work'>About this Course</p>

        <p id='work1'>10,000,000 recent views</p>

        <div id='arg'>

        <p className="paraabout">
         {course.description}
        </p>
      
        </div>
         {/* <div id="boxabout">
            <p className='aboutheading'>SKILLS YOU WILL GAIN</p>
            <div id='sameAdj'>
              <span className='same'>Gratitude</span>
              <span className='same'>Happiness</span>
              <span className='same'>Meditation</span>
              <span className='same'>Savoring</span>
            </div>
         </div> */}
      </div>
      <div>
        <div id='box'>
        <div className='round-about1'>
        <div className='round2' ><AccountCircleIcon /></div>
        <div><p id='texttop'>Learner Career Outcomes</p></div>
        </div>
        <div className='round-about1'>
        <div className='round2s' ><SignpostIcon/></div>
        <div><p id='differ'>14%</p></div>
        <div><p id='simple'>started a new career after completing these courses</p></div>
        </div>
        <div className='round-about1'>
        <div className='round2s2' ><WorkIcon/></div>
        <div><p id='differ'>20%</p></div>
        <div> <p id='simple'>got a tangible career benefit from this course</p></div>
        </div>
        </div>
        
        <div id='multipleIcon'>
         <div className='round-about'>
        <div className='round'><LanguageIcon sx={{fontSize:30}}/></div>
        <div><p className='adjust_text'>100% online courses</p></div>
        </div>
        
        {/* <div className='round-about'>
        <div className='round'><MonetizationOnIcon sx={{fontSize:30}}/></div>
        <div><p className='adjust_text'>Four payments of $750</p></div>
            
        </div> */}
        <p id='onlyone'>Or pay all at once and save 5%</p>
        <div className='round-about'>
        <div className='round'><SignalCellularAltIcon sx={{fontSize:24}}/></div>
        <div><p className='adjust_text'>3-4 months</p></div>
        </div>

        <div className='round-about'>
        <div className='round'><AccessTimeIcon sx={{fontSize:30}}/></div>
        <div><p className='adjust_text'>Intermediate Level</p></div>
        </div>

        {/* <div className='round-about'>
        <div className='round1'><LayersIcon sx={{fontSize:24}}/></div>
        <div><p className='adjust_text'>4 hands-on projects</p></div> 
        </div>
          */}
        
       </div>
      </div>
      
    </div>
    
     </div>
                   )
                })   
    }  
   
    </>
    )
}