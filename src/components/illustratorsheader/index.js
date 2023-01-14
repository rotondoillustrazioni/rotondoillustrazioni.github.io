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
            mode="horizontal"
            style={{ display: "flex", justifyContent: "center" }}
            selectedKeys={[`${selectKey()}`]}
          >
            <Menu.Item
              className={style.menu}
              key="i-projects"
              onClick={() => {
                history.push("i-projects");
              }}
            >
              PROGETTI
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="notifications"
              onClick={() => {
                history.push("notifications");
              }}
            >
              NOTIFICHE
            </Menu.Item>
            <Menu.Item
              className={style.menu}
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
