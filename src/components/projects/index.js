import { Col, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// @ts-ignore
import { projectsThunk } from "../../redux/actions";
import style from "./style.module.scss";

function Projects() {
  const dispatch = useDispatch();
  const history = useHistory();

  const projectsData = useSelector((state) => state.projects.projects);
  const loading = useSelector((state) => state.projects.loading);

  useEffect(() => {
    const projects = async () => {
      await dispatch(projectsThunk());
    };
    projects();
  }, [dispatch]);

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

  return (
    <div>
      <div className={style.mainContainer}>
        <Spin spinning={loading}>
          <Row className="projects" align="middle">
            {showProjects()}
          </Row>
        </Spin>
      </div>
    </div>
  );
}

export default Projects;
