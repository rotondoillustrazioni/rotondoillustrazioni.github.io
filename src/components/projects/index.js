import { Col, Image, Row } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// @ts-ignore
import logo from "../../images/LOGO.jpg";
import { projectsThunk } from "../../redux/actions";
import style from "./style.module.scss";

function Projects() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const projectsData = useSelector((state) => state.projects.projects);
  const isReady = useSelector((state) => state.projects.isReady);
  const error = useSelector((state) => state.projects.error);
  const loading = useSelector((state) => state.projects.loading);

  const occhioProject = "occhio_ranocchio_scarabocchio";
  const luccaProject = "lucca";

  if (loading === false) {
    console.log(projectsData[0].images[0]);
  }

  useEffect(() => {
    const projects = async () => {
      await dispatch(projectsThunk());
    };
    projects();
  }, [dispatch]);

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
            {/* {loading === false &&
              projectsData.map((project) => {
                <Col md={8} sm={24}>
                  <div
                    className={style.image}
                    onClick={() => {
                      history.push(`/project/${occhioProject}`);
                    }}
                  >
                    <Image
                      preview={false}
                      alt={project.title}
                      src={project1_cover}
                    />
                    ;
                    <div className={style.imageDescription}>
                      <div>{t("occhio_title")}</div>
                    </div>
                  </div>
                </Col>;
              })} */}
            {loading === false && (
              <Col md={8} sm={24}>
                <div
                  className={style.image}
                  onClick={() => {
                    history.push(`/project/${occhioProject}`);
                  }}
                >
                  <Image
                    preview={false}
                    alt={projectsData[0].title}
                    src={projectsData[0].images[0]}
                  />
                  <div className={style.imageDescription}>
                    <div>{projectsData[0].title}</div>
                  </div>
                </div>
              </Col>
            )}
            {/* <Col md={8} sm={24}>
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
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
