import EnrollButton from "./EnrollButton";

export default ({courseDetails})=>{

 return (
   <>
   <div id='enroll'>
     <div>
      <p className="adjustment">Start Learning Today</p>
      {/* <EnrollButton courseDetails ={courseDetails} /> */}
      <p className="adjustment1">4,046,972 already enrolled</p>
     </div>

     <div id="ytyty">
     <p id="txt1">Shareable on <img src='Linkedin.png'/></p>     <p id="tr">You can share your Course Certificates in the Certifications section of your LinkedIn profile, on printed resumes, CVs, or other documents.</p>
     </div>

     <div>
     <img id='ghq' src='Certificate.jpg' alt="This is the image" />
     </div>

   </div>
   
   </>

 )

}