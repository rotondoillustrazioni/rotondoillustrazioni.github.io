// @ts-nocheck
import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Col, Row, Spin, Card, Form, Input, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import IllustratorsHeader from "../../../components/illustratorsheader";
import { useDispatch, useSelector } from "react-redux";
import { projectsThunk } from "../../../redux/actions";

function IllustratorsHome() {
  const dispatch = useDispatch();

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
      const pjs = Object.keys(projectsData).map((key) => [projectsData[key]]);

      return pjs.map((e) => {
        return e.map((data) => {
          const fileList = data.images.map((image) => ({
            uid: data.id,
            name: "video",
            status: "done",
            url: image,
          }));

          return (
            <Col sm={24} md={24} lg={8} key={data._id} className={style.col}>
              <Card className={style.card}>
                <div className={style.title}>{data.title}</div>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  <div className={style.formitems}>
                    <Form.Item label="Titolo">
                      <Input value={data.title} />
                    </Form.Item>
                    <Form.Item label="Sottotit.">
                      <Input value={data.subtitle} />
                    </Form.Item>
                    <Form.Item label="Immagini">
                      <Upload
                        action="/upload.do"
                        listType="picture-card"
                        fileList={fileList}
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </div>
                  <Row className={style.buttons}>
                    <Col className={style.button}>
                      <Form.Item style={{ width: "50%" }}>
                        <Button danger>Elimina Progetto</Button>
                      </Form.Item>
                    </Col>
                    <Col className={style.button}>
                      <Form.Item style={{ width: "50%" }}>
                        <Button htmlType="submit">Salva Modifiche</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          );
        });
      });
    }
  };

  return (
    <>
      <IllustratorsHeader />
      <div className={style.container}>
        <Spin spinning={loading}>
          <Row className="projects" align="middle">
            <Col sm={24} md={24} lg={8} className={style.col}>
              <Card className={style.card}>
                <div className={style.title}>Aggiungi un nuovo progetto</div>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  <div className={style.formitems}>
                    <Form.Item label="Titolo">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Sottotit.">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Immagini">
                      <Upload action="/upload.do" listType="picture-card">
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </div>
                  <Row className={style.buttons}>
                    <Form.Item style={{ textAlign: "center" }}>
                      <Button htmlType="submit">Aggiungi</Button>
                    </Form.Item>
                  </Row>
                </Form>
              </Card>
            </Col>
            {showProjects()}
          </Row>
        </Spin>
      </div>
    </>
  );
}

export default IllustratorsHome;
