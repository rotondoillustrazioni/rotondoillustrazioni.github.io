import { Card, Col, Menu, Row } from "antd";
import { default as React, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Projects from "../../components/projects";
// @ts-ignore
import style from "./style.module.scss";

function Homepage() {
  const { t } = useTranslation();
  const history = useHistory();
  const [menuSelected, setMenuSelected] = useState("home");

  const handleClick = (e) => {
    console.log("click ", e);
    setMenuSelected(e.key);
  };

  const showContent = () => {
    switch (menuSelected) {
      case "home":
        return <Projects />;
      case "about":
        return (
          <div className={style.about}>
            <Card className={style.card}>
              <div className={style.aboutTxt}>{t("aboutMe1")}</div>
              <div className={style.aboutTxt}>{t("aboutMe2")}</div>
              <div className={style.uni}>
                <div>{t("uniBA")}</div>
                <div>{t("uniMA")}</div>
              </div>
            </Card>
          </div>
        );
      case "contact":
        return (
          <div className={style.contact}>
            <Card className={style.card}>
              <div>
                <div>Mail:</div>
                <ul>
                  <li>
                    <a href="mailto:progetti.rotondo@gmail.com">
                      {" "}
                      progetti.rotondo@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div>Instagram:</div>
                <ul>
                  <li>
                    <a href="https://www.instagram.com/rotondo___/">
                      {" "}
                      rotondo___
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div>Behance:</div>
                <ul>
                  <li>
                    <a href="https://www.behance.net/rotondostudio/info">
                      {" "}
                      rotondostudio
                    </a>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        );
      default:
        return <div />;
    }
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Menu
            onClick={handleClick}
            mode="horizontal"
            style={{ textAlign: "center" }}
            selectedKeys={[menuSelected]}
          >
            <Menu.Item className={style.menu} key="home">
              {t("home")}
            </Menu.Item>
            <Menu.Item className={style.menu} key="about">
              {t("about")}
            </Menu.Item>
            <Menu.Item className={style.menu} key="contact">
              {t("contact")}
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      {showContent()}
    </div>
  );
}

export default Homepage;
