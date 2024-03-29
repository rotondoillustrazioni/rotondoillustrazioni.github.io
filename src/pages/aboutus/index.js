import { default as React } from "react";
import style from "./style.module.scss";
import { Avatar, Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import gif from "../../images/gif.gif";
import Header from "../../components/header";

function AboutUs(props) {
  const { t } = useTranslation();

  return (
    <>
      <Header {...props} />
      <div className={style.about}>
        <Card className={style.card}>
          <Row>
            <Col>
              <Row style={{ justifyContent: "center" }}>
                <Avatar shape="square" size={164} alt="gif" src={gif} />
              </Row>
              <Row>
                <div className={style.aboutTxt}>{t("aboutMe1")}</div>
                <div className={style.aboutTxt}>{t("aboutMe2")}</div>
                <div className={style.uni}>
                  <div className={style.aboutTxt}>{t("uniBA")}</div>
                  <div className={style.aboutUni}>{t("uniMA")}</div>
                </div>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default AboutUs;
