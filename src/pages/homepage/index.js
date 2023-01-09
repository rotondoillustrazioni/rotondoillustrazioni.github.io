import { default as React } from "react";
import Header from "../../components/header";
import Projects from "../../components/projects";

function Homepage(props) {
  return (
    <div>
      <Header {...props} />
      <Projects />
    </div>
  );
}

export default Homepage;
