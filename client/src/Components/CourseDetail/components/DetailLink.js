import About from './About'
import Instructor from './Instructors'
import Syllabus from './Syllabus'
import Enroll from './Enroll'

export default (props )=>{
      
   let courseDetails=props.courseDetails;
   let courseId=props.courseId
    return(
        <>
        <div className="main_Links">
            <a className="my_links1" href="#about">About</a>
            <a className="my_links2" href="#instructor">Instuctor</a>
            <a className="my_links3" href="#syllabus">Syllabus</a>
            <a className="my_links4" href="#Enrollment">Enrollment</a>
        </div>

        <div id='another' className='newtask'>
            <div id='about'>
            <About courseDetails={courseDetails} />
            </div>
            <div id='instructor'>
              <Instructor courseDetails={courseDetails} />
            </div>
            <div id='syllabus'>
              <Syllabus  courseId={courseId} courseDetails={courseDetails} />
            </div>
            <div id='Enrollment'>
              <Enroll courseDetails={courseDetails} />
            </div>
        </div>
      
    </>)
}