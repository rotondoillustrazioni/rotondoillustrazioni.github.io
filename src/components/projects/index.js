import { Col, Image, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
// @ts-ignore
import logo from "../../images/LOGO.jpg";
import project1_cover from "../../images/progetto1/occhio.jpg";
import project2_cover from "../../images/progetto2/lucca.jpg";
import style from "./style.module.scss";

function Projects() {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Col md={6} sm={24}>
          <Image src={logo} alt="logo" />
          <div className={style.miniBioContainer}>
            <div className={style.miniBio}>{t("miniBio")}</div>
            <a href="mailto:progetti.rotondo@gmail.com">
              progetti.rotondo@gmail.com
            </a>
          </div>
        </Col>
        <Col md={6} sm={24}>
          <div className={style.image}>
            <Image
              style={{ border: "2px solid black" }}
              alt={"Occhio, ranocchio, scarabocchio! (Eye, frog, doodle!)"}
              src={project1_cover}
            />
          </div>
        </Col>
        <Col md={6} sm={24}>
          <div className={style.image}>
            <Image
              style={{ border: "2px solid black" }}
              alt={'Lucca Junior 2020 "Livio Sossi"'}
              src={project2_cover}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
