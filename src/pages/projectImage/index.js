import { Col, Image, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import project1_2 from "../../images/progetto1/2.jpg";
import project1_3 from "../../images/progetto1/3.jpg";
import project1_4 from "../../images/progetto1/4.jpg";
import project1_5 from "../../images/progetto1/5.jpg";
import project1_cover from "../../images/progetto1/occhio.jpg";
import project2_2 from "../../images/progetto2/2.jpg";
import project2_3 from "../../images/progetto2/3.jpg";
import project2_4 from "../../images/progetto2/4.jpg";
import project2_5 from "../../images/progetto2/5.png";
import project2_6 from "../../images/progetto2/6.png";
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
            <Image preview={true} src={project1_cover} />
          </div>
        );
      case "lucca":
        return (
          <div>
            <Image preview={true} src={project2_cover} />
          </div>
        );
      default:
        return <div />;
    }
  };

  const showOtherImages = () => {
    switch (name) {
      case "occhio_ranocchio_scarabocchio":
        return (
          <>
            <Col md={6} sm={24}>
              <Image preview={true} src={project1_2} />
            </Col>
            <Col md={6} sm={24}>
              {" "}
              <Image preview={true} src={project1_3} />
            </Col>
            <Col md={6} sm={24}>
              {" "}
              <Image preview={true} src={project1_4} />
            </Col>
            <Col md={6} sm={24}>
              {" "}
              <Image preview={true} src={project1_5} />
            </Col>
          </>
        );
      case "lucca":
        return (
          <>
            <Col md={6} sm={24}>
              <Image preview={true} src={project2_2} />
            </Col>
            <Col md={6} sm={24}>
              {" "}
              <Image preview={true} src={project2_3} />
            </Col>
            <Col md={6} sm={24}>
              {" "}
              <Image preview={true} src={project2_4} />
            </Col>
            <Col md={6} sm={24}>
              {" "}
              <Image preview={true} src={project2_5} />
            </Col>
            <Col md={6} sm={24}>
              {" "}
              <Image preview={true} src={project2_6} />
            </Col>
          </>
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
      <Row justify="space-between" align="middle" gutter={16}>
        <Col md={8} sm={24}>
          {showDesc()}
        </Col>
        <Col md={14} sm={24}>
          {showContent()}
        </Col>
        {showOtherImages()}
      </Row>
    </div>
  );
}
export default ProjectImage;
