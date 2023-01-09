import { default as React } from "react";
import Header from "../../components/header";
import Projects from "../../components/projects";
import MiniBio from "../../components/minibio";
import { Col, Row } from "antd";

function Homepage(props) {
  return (
    <div>
      <Header {...props} />
      <Row style={{ justifyContent: "center" }}>
        <Col sm={24} md={24} lg={6} style={{ width: "100%" }}>
          <MiniBio />
        </Col>
        <Col sm={24} md={24} lg={16}>
          <Projects />
        </Col>
      </Row>
    </div>
  );
}

export default Homepage;
