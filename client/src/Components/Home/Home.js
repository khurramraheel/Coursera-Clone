import HeroSection from './components/HeroSection/Herosection'
import LogoSection from './components/MiddleSection/Mainsection1'
import Middle from './components/Bottom/bottom'
import Bottom from './components/MiddleSection/JoinFree'
import CourseSilderAll from '../../Components/CourseSlider/CourseSliderAll'
import {useEffect} from 'react';
export default()=>{
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return(
    <>
     <HeroSection />
     <LogoSection/>
     <CourseSilderAll/>
     <Middle/>
     <Bottom/>
    </>
    )
}