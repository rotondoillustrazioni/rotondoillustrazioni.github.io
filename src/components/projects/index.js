import { Avatar, Card, Col, Image, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
    if (
      loading === false &&
      projectsData !== undefined &&
      projectsData !== null
    ) {
      const proj = Object.keys(projectsData).map((key) => [projectsData[key]]);
      return proj.map((e) =>
        e.map((data) => (
          <Col md={8} sm={24} key={data._id}>
            <div className={style.imageContainer}>
              <div
                className={style.image}
                onClick={() => {
                  history.push(`/project/${data._id}`);
                }}
              >
                <div>
                  <LazyLoadImage
                    effect="blur"
                    key={data._id}
                    alt={data.title}
                    scrollPosition={{ x: 0, y: 0 }}
                    src={data.images[0]}
                    width="100%"
                    height="auto"
                  />
                </div>
                <div className={style.imageDescription}>
                  <div>
                    {data.subtitle !== "" ? (
                      <div>{`${data.title} - ${data.subtitle}`}</div>
                    ) : (
                      <div>{data.title}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))
      );
    }
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
        <Col sm={24} md={24} lg={6} style={{ width: "100%" }}>
          <Row className={style.rowC}>
            <div className={style.rowC}>
              <Col xs={24} sm={24} md={24} style={{ textAlign: "center" }}>
                <Avatar
                  shape="square"
                  size={164}
                  src={<Image preview={false} src={logo} />}
                />
              </Col>
              <Col xs={24} sm={24} md={24}>
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
            </div>
          </Row>
        </Col>
        <Col sm={24} md={24} lg={18}>
          <Card bordered={false}>
            <Spin spinning={loading}>
              <Row align="middle">{showProjects()}</Row>
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
