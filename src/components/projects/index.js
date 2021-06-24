import { Avatar, Card, Col, Image, Row } from "antd";
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
            <div className={style.imageContainer}>
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

  return (
    <div className={style.mainContainer}>
      <Row style={{ justifyContent: "center" }}>
        <Col md={6} sm={24}>
          <Avatar shape="square" size={264} src={<Image src={logo} />} />
          <div className={style.miniBioContainer}>
            <div>
              <div className={style.miniBio}>{t("miniBio1")}</div>
              <div className={style.miniBio}>{t("miniBio2")}</div>
              <div className={style.miniBio}>{t("miniBio3")}</div>
              <div className={style.miniBio}>
                <a href="mailto:progetti.rotondo@gmail.com">
                  progetti.rotondo@gmail.com
                </a>
              </div>
            </div>
          </div>
        </Col>
        <Col md={18} sm={24}>
          <div className={style.projectsContainer}>
            <Card loading={loading} bordered={false}>
              <Row>{showProjects()}</Row>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
