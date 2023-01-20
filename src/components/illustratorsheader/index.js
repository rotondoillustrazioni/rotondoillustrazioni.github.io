import { Col, Menu, Row } from "antd";
import style from "./style.module.scss";
import { useHistory } from "react-router";
import React from "react";
import { logout } from "../../redux/reducers";
import { useDispatch } from "react-redux";

function IllustratorsHeader(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectKey = () => {
    if (Object.keys(props).length === 0) {
      return "";
    } else {
      return props.location.pathname.split("/")[1] || "home";
    }
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Menu
            className={style.menu}
            style={{ display: "flex", justifyContent: "center" }}
            mode="horizontal"
            selectedKeys={[`${selectKey()}`]}
          >
            <Menu.Item
              key="i-projects"
              onClick={() => {
                history.push("i-projects");
              }}
            >
              PROGETTI
            </Menu.Item>
            <Menu.Item
              key="notifications"
              onClick={() => {
                history.push("notifications");
              }}
            >
              NOTIFICHE
            </Menu.Item>
            <Menu.Item
              key="profile"
              onClick={() => {
                history.push("profile");
              }}
            >
              PROFILO
            </Menu.Item>
            <Menu.Item
              className={style.rightSideMenuItem}
              key="logout"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
export default IllustratorsHeader;
