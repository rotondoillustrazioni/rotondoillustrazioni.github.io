import { Col, Image, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
// @ts-ignore
import logo from "../../images/LOGO.jpg";
import project1_cover from "../../images/progetto1/occhio.jpg";
import project2_cover from "../../images/progetto2/lucca.jpg";
import style from "./style.module.scss";

function Projects() {
  const { t } = useTranslation();
  const history = useHistory();
  const occhioProject = "occhio_ranocchio_scarabocchio";
  const luccaProject = "lucca";

  return (
    <div className={style.mainContainer}>
      <Row justify="space-between" align="middle">
        <Col md={4} sm={24}>
          <Image src={logo} preview={false} alt="logo" />
          <div className={style.miniBioContainer}>
            <div>
              <div className={style.miniBio}>{t("miniBio1")}</div>
              <div className={style.miniBio}>{t("miniBio2")}</div>
              <div className={style.miniBio}>{t("miniBio3")}</div>
              <a href="mailto:progetti.rotondo@gmail.com">
                progetti.rotondo@gmail.com
              </a>
            </div>
          </div>
        </Col>
        <Col md={18} sm={24}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col md={8} sm={24}>
              <div
                className={style.image}
                onClick={() => {
                  history.push(`/project/${occhioProject}`);
                }}
              >
                <Image
                  preview={false}
                  alt={"Occhio, ranocchio, scarabocchio! (Eye, frog, doodle!)"}
                  src={project1_cover}
                />
                <div className={style.imageDescription}>
                  <div>{t("occhio_title")}</div>
                </div>
              </div>
            </Col>
            <Col md={8} sm={24}>
              <div
                className={style.image}
                onClick={() => {
                  history.push(`/project/${luccaProject}`);
                }}
              >
                <Image
                  preview={false}
                  alt={'Lucca Junior 2020 "Livio Sossi"'}
                  src={project2_cover}
                />
                <div className={style.imageDescription}>
                  <div>{t("lucca_title")}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
