import { Button, Col, Menu, Row } from "antd";
import { useTranslation } from "react-i18next";
import style from "./style.module.scss";
import { useHistory } from "react-router";
import React from "react";
import i18next from "i18next";
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
            <Menu.Item className={style.menu} key="projects" onClick={() => {}}>
              PROGETTI
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="notifications"
              onClick={() => {}}
            >
              NOTIFICHE
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="profile"
              onClick={() => {
                history.push("/illustrators-profile");
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
