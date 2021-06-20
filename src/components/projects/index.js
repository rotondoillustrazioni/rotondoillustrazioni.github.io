import { Card, Col, Image, Row } from "antd";
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
  const loading = useSelector((state) => state.projects.loading);
  // if (loading === false) {
  // for (var key in projectsData) {
  //   if (projectsData.hasOwnProperty(key)) {
  //     console.log(key + " -> " + projectsData[key].title);
  //   }
  // }
  // const a = Object.keys(projectsData).map((key) => [projectsData[key]]);
  // console.log(a.map((e) => e.map((l) => l.title)));
  // projectsData.map((e) => e.images.map((p) => console.log(p)));
  // }

  const showProjects = () => {
    let a;
    if (
      loading === false &&
      projectsData !== undefined &&
      projectsData !== null
    ) {
      const proj = Object.keys(projectsData).map((key) => [projectsData[key]]);
      a = proj.map((e) =>
        e.map((l) => (
          <Col md={8} sm={24} key={l._id}>
            <div
              className={style.image}
              onClick={() => {
                history.push(`/project/${l._id}`);
              }}
            >
              <Image preview={false} alt={l.title} src={l.images[0]} />
              <div className={style.imageDescription}>
                <div>{l.title}</div>
              </div>
            </div>
          </Col>
        ))
      );
    }
    return a;
  };

  useEffect(() => {
    const projects = async () => {
      await dispatch(projectsThunk());
    };
    projects();
  }, [dispatch]);

  // let proj = [];
  // useEffect(() => {
  //   if (loading === false) {
  //     proj = Object.keys(projectsData).map((key) => [projectsData[key]]);
  //     console.log(proj.map((e) => e.map((l) => l.title)));
  //   }
  // }, [projectsData]);

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
          <Card loading={loading} bordered={false}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {showProjects()}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
