import { Col, Layout, Menu, Row } from "antd";
import React from "react";
import logo from "../../images/LOGO.jpg";

const { Header, Footer, Sider, Content } = Layout;

function Homepage() {
  return (
    <>
      <Row>
        <Col md={6} sm={24}>
          <img
            src={logo}
            alt="logo"
            style={{ height: "300px", width: "300px" }}
          />
        </Col>
        <Col md={18} sm={24}>
          <Menu
            mode="horizontal"
            style={{ textAlign: "right", paddingRight: "50px" }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Contact</Menu.Item>
          </Menu>
        </Col>
      </Row>
    </>
  );
}

export default Homepage;
