import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
// @ts-ignore
import logo from "../../images/LOGO.jpg";
// @ts-ignore
import style from "./style.module.scss";

function Projects() {
  const { t } = useTranslation();

  return (
    <div>
      <Row>
        <Col md={6} sm={24}>
          <img
            src={logo}
            alt="logo"
            style={{ height: "300px", width: "300px" }}
          />
          <div className={style.miniBio}>{t("miniBio")}</div>
          <a href="mailto:progetti.rotondo@gmail.com">
            progetti.rotondo@gmail.com
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
