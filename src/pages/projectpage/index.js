import { Avatar, Card, Col, Image, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import VideoOrImage from "../../components/videoOrImage";
import gif from "../../images/gif.gif";
import { projectThunk } from "../../redux/actions";
import style from "./style.module.scss";
import Header from "../../components/header";

function ProjectPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [menuSelected, setMenuSelected] = useState();

  const projectData = useSelector((state) => state.project.project);
  const loading = useSelector((state) => state.project.loading);

  useEffect(() => {
    if (id !== undefined) {
      const projectImages = async () => {
        await dispatch(projectThunk({ id }));
      };
      projectImages();
    }
  }, [dispatch, id]);

  const handleClick = (e) => {
    if (e.key === "home") {
      history.push("/");
    } else {
      setMenuSelected(e.key);
    }
  };

  const condition =
    loading === false &&
    projectData !== null &&
    projectData !== undefined &&
    projectData.images !== undefined &&
    projectData.images !== null &&
    projectData.description !== undefined &&
    projectData.description !== null &&
    projectData.title !== null &&
    projectData.title !== undefined;

  return (
    <>
      <Header />
      <div className={style.container}>
        <Row align="top" gutter={16}>
          <Col md={8} sm={24} style={{ width: "100%" }}>
            <Card loading={loading} bordered={false}>
              {condition && (
                <div>
                  <div className={style.title}>
                    <div> {projectData.title} </div>
                    <div> {projectData.subtitle}</div>
                  </div>
                  <div className={style.description}>
                    {projectData.description}
                  </div>
                </div>
              )}
            </Card>
          </Col>
          <Col md={16} sm={24} style={{ width: "100%" }}>
            <Image.PreviewGroup>
              <Card loading={loading} bordered={false}>
                <LazyLoadComponent>
                  {condition &&
                    projectData.images.slice(1).map((e) => (
                      <div className={style.images} key={e}>
                        <Row key={e}>
                          <VideoOrImage e={e} title={projectData.title} />
                        </Row>
                      </div>
                    ))}
                </LazyLoadComponent>
              </Card>
            </Image.PreviewGroup>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default ProjectPage;
