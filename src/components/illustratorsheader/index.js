// @ts-nocheck
import { Avatar, Col, Menu, Row, Button } from "antd";
import style from "./style.module.scss";
import { useHistory } from "react-router";
import logo from "../../images/LOGO.png";
import { default as React, useEffect, useState } from "react";
import {
  decreaseNotReadNumber,
  increaseNotReadNumber,
  logout,
} from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { wsConnect } from "../../websocket";

function IllustratorsHeader(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const notReadNumber = useSelector(
    (state) => state.notifications.notReadNumber
  );

  const newNotification = useSelector(
    (state) => state.notificationsWS.receivedNotification
  );

  const [notificationsBadge, setNotificationsBadge] = useState(
    notReadNumber > 0 ? true : false
  );
  const notificationEdited = useSelector(
    (state) => state.editNotification.isEdited
  );

  const notificationDeleted = useSelector(
    (state) => state.deleteNotification.isDeleted
  );

  useEffect(() => {
    if (newNotification !== null && newNotification !== undefined) {
      dispatch(increaseNotReadNumber());
    }
    if (notificationDeleted) {
      dispatch(decreaseNotReadNumber());
    }
  }, [newNotification, dispatch, notificationDeleted]);

  useEffect(() => {
    if (notReadNumber > 0) {
      setNotificationsBadge(true);
    } else {
      setNotificationsBadge(false);
    }
  }, [notReadNumber, newNotification, notificationEdited, notificationDeleted]);

  useEffect(() => {
    dispatch(wsConnect(process.env.REACT_APP_SOCKET_ORIGIN));
  }, [dispatch]);

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
            <div
              key="home"
              className={style.logo}
              onClick={() => {
                history.push("/");
              }}
            >
              <Avatar src={logo} size="medium" />
            </div>
            <Menu.Item
              className={style.menu}
              key="projects"
              onClick={() => {
                history.push("/projects");
              }}
            >
              PROGETTI
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="notifications"
              onClick={() => {
                history.push("/notifications");
              }}
            >
              NOTIFICHE{" "}
              {notificationsBadge && <span className={style.badge}>•</span>}
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="profile"
              onClick={() => {
                history.push("/profile");
              }}
            >
              PROFILO
            </Menu.Item>
            <Button
              className={style.rightSideMenuItem}
              key="logout"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
export default IllustratorsHeader;
