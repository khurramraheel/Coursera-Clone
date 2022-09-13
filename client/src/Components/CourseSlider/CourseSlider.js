// import "semantic-ui-css/semantic.min.css";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import UAParser from "ua-parser-js";
import React, { Fragment,useEffect } from "react";
import Simple from "./components/Simple";
import WithScrollbar from "./components/WithScrollbar";
// import WithVideo from "./components/WithVideo";
import Section from "./components/Section";

// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
const Index = ({ deviceType }) => {

              let Category={
                DS: "Data Science",
                IT: "IT & Computer Sciences" ,
                BM:"Business & Management",
                AS:"Arts & Sciences",
                MS:"Medical Sciences",
                O:"Others"
              }
              console.log(Category)
              useEffect(() => {
                window.scrollTo(0, 0)
              }, [])
  return (
    <Fragment>
      {/* <Section>
        <WithScrollbar />
      </Section> */}
      <Section>
      <h1 className="Slider-Heading-main" > Courses We are offering   </h1>   
        <Simple deviceType={deviceType} Category={Category.DS} />
        <Simple deviceType={deviceType} Category={Category.IT} />
        <Simple deviceType={deviceType} Category={Category.BM} />
        <Simple deviceType={deviceType} Category={Category.AS} />
        <Simple deviceType={deviceType} Category={Category.MS} />
        <Simple deviceType={deviceType} Category={Category.O} />
      </Section>
    </Fragment>
  );
};
Index.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
  return { deviceType };
};
export default Index;
