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
          <div>
            <div className={style.aboutMe1}>{t("aboutMe1")}</div>
            <div className={style.aboutMe2}>{t("aboutMe2")}</div>
            <div className={style.uni}>{t("uniBA")}</div>
            <div className={style.uni}>{t("uniMA")}</div>
          </div>
        );
      case "contact":
        return (
          <div>
            <div>
              <a href="mailto:progetti.rotondo@gmail.com">
                Mail: progetti.rotondo@gmail.com
              </a>
            </div>
            <div>
              <a href="">Instagram: rotondo___</a>
            </div>
            <div>
              <a href="">Behance: www.behance.net/rotondostudio/inf</a>
            </div>
          </div>
        );
      default:
        return <div />;
    }
  };

  return (
    <div className={style.pageContainer}>
      <Card className={style.card}>
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
      </Card>
    </div>
  );
}

export default Homepage;
