import { Col, Menu, Row } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./style.module.scss";
import { useHistory } from "react-router";

function Header() {
  const { t } = useTranslation();
  const [menuSelected, setMenuSelected] = useState("");
  const history = useHistory();

  const handleClick = (e) => {
    setMenuSelected(e.key);
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Menu
            onClick={handleClick}
            mode="horizontal"
            style={{ display: "flex", justifyContent: "center" }}
            selectedKeys={[menuSelected]}
          >
            <Menu.Item
              className={style.menu}
              key="home"
              onClick={() => {
                history.push("/");
              }}
            >
              {t("home")}
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="aboutus"
              onClick={() => {
                history.push("aboutus");
              }}
            >
              {t("about")}
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="contacts"
              onClick={() => {
                history.push("contacts");
              }}
            >
              {t("contact")}
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
export default Header;
