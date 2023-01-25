// @ts-nocheck
import { Col, Menu, Row, Badge } from "antd";
import style from "./style.module.scss";
import { useHistory } from "react-router";
import React from "react";
import { logout } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";

function IllustratorsHeader(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const notReadNumber = useSelector(
    (state) => state.notifications.notReadNumber
  );
  const notificationsBadge = notReadNumber > 0 ? true : false;

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
              key="projects"
              onClick={() => {
                history.push("/projects");
              }}
            >
              PROGETTI
            </Menu.Item>
            <Menu.Item
              key="notifications"
              onClick={() => {
                history.push("/notifications");
              }}
            >
              <Badge dot={notificationsBadge} size="small" color="black">
                NOTIFICHE
              </Badge>
            </Menu.Item>
            <Menu.Item
              key="profile"
              onClick={() => {
                history.push("/profile");
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
