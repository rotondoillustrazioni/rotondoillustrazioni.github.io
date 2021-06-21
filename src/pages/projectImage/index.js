import { Card, Col, Image, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { projectThunk } from "../../redux/actions";
import style from "./style.module.scss";

function ProjectImage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [menuSelected, setMenuSelected] = useState();

  const projectData = useSelector((state) => state.project.project);
  const loading = useSelector((state) => state.project.loading);

  useEffect(() => {
    if (id !== undefined) {
      const projects = async () => {
        await dispatch(projectThunk({ id }));
      };
      projects();
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

  const showContent = () => {
    switch (menuSelected) {
      case "home":
        return <></>;
      case "about":
        return (
          <div className={style.about}>
            <Card className={style.card}>
              <div className={style.aboutTxt}>{t("aboutMe1")}</div>
              <div className={style.aboutTxt}>{t("aboutMe2")}</div>
              <div className={style.uni}>
                <div>{t("uniBA")}</div>
                <div>{t("uniMA")}</div>
              </div>
            </Card>
          </div>
        );
      case "contact":
        return (
          <div className={style.contact}>
            <Card className={style.card}>
              <div>
                <div>Mail:</div>
                <ul>
                  <li>
                    <a href="mailto:progetti.rotondo@gmail.com">
                      {" "}
                      progetti.rotondo@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div>Instagram:</div>
                <ul>
                  <li>
                    <a href="https://www.instagram.com/rotondo___/">
                      {" "}
                      rotondo___
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div>Behance:</div>
                <ul>
                  <li>
                    <a href="https://www.behance.net/rotondostudio/info">
                      {" "}
                      rotondostudio
                    </a>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        );
      default:
        return (
          <>
            {
              <div className={style.container}>
                <Row align="top" gutter={16}>
                  <Col md={8} sm={24}>
                    <div>
                      <div className={style.title}>{projectData.title}</div>
                      <div className={style.description}>
                        {projectData.description}
                      </div>
                    </div>
                  </Col>
                  <Col md={16} sm={24}>
                    {condition &&
                      projectData.images.map((e) => (
                        <div className={style.images}>
                          <Row key={e}>
                            <Card loading={loading} bordered={false}>
                              <Image
                                key={e}
                                preview={true}
                                alt={projectData.title}
                                src={e}
                              />
                            </Card>
                          </Row>
                        </div>
                      ))}
                  </Col>
                </Row>
              </div>
            }
          </>
        );
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div className={style.menuContainer}>
            <Menu
              onClick={handleClick}
              mode="horizontal"
              style={{ textAlign: "right" }}
              selectedKeys={[menuSelected]}
            >
              <Menu.Item className={style.menu} key="home">
                {t("home")}
              </Menu.Item>
              <Menu.Item className={style.menu} key="about">
                {t("about")}
              </Menu.Item>
              <Menu.Item className={style.menu} key="contact">
                {t("contact")}
              </Menu.Item>
            </Menu>
          </div>
        </Col>
      </Row>
      {showContent()}
    </>
  );
}
export default ProjectImage;
