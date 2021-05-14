import { Col, Image, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import project1_cover from "../../images/progetto1/occhio.jpg";
import project2_cover from "../../images/progetto2/lucca.jpg";
import style from "./style.module.scss";

function ProjectImage() {
  const { t } = useTranslation();
  const { name } = useParams();

  const showContent = () => {
    switch (name) {
      case "occhio_ranocchio_scarabocchio":
        return (
          <div>
            <Image preview={false} src={project1_cover} />
          </div>
        );
      case "lucca":
        return (
          <div>
            <Image preview={false} src={project2_cover} />
          </div>
        );
      default:
        return <div />;
    }
  };

  const showDesc = () => {
    switch (name) {
      case "occhio_ranocchio_scarabocchio":
        return (
          <div>
            <div className={style.title}>{t("occhio_title")}</div>
            <div className={style.description}>{t("occhio_desc")}</div>
          </div>
        );
      case "lucca":
        return (
          <div>
            <div className={style.title}>{t("lucca_title")}</div>
            <div className={style.description}>{t("lucca_desc")}</div>
          </div>
        );
      default:
        return <div />;
    }
  };

  return (
    <div className={style.container}>
      <Row justify="space-between" align="middle">
        <Col md={8}>{showDesc()}</Col>
        <Col md={14}>{showContent()}</Col>
      </Row>
    </div>
  );
}
export default ProjectImage;
