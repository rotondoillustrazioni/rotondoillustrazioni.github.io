// @ts-nocheck
import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Col, Row, Spin, Card, Form, Input, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

import IllustratorsHeader from "../../../components/illustratorsheader";
import { useDispatch, useSelector } from "react-redux";
import { newProjectThunk, projectsThunk } from "../../../redux/actions";
import EditableProject from "../../../components/editableProject";

function IllustratorsHome(props) {
  const dispatch = useDispatch();

  const projectsData = useSelector((state) => state.projects.projects);
  const loading = useSelector((state) => state.projects.loading);
  const projectDeleted = useSelector(
    (state) => state.deleteProject.projectDeleted
  );
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const projects = async () => {
      await dispatch(projectsThunk());
    };
    projects();
  }, [dispatch, projectDeleted]);

  const onFinish = (values) => {
    let newProject = {
      title: values.title,
      subtitle: values.subtitle,
      description: values.description,
      images: values.images.fileList,
    };
    dispatch(newProjectThunk({ newProject, token }));
  };

  const showProjects = () => {
    if (
      loading === false &&
      projectsData !== undefined &&
      projectsData !== null
    ) {
      const pjs = Object.keys(projectsData).map((key) => [projectsData[key]]);

      return pjs.map((e) => {
        return e.map((data) => {
          return (
            <Col sm={24} md={24} lg={8} key={data._id} className={style.col}>
              <EditableProject projectData={{ data }} />
            </Col>
          );
        });
      });
    }
  };

  return (
    <>
      <IllustratorsHeader {...props} />
      <div className={style.container}>
        <Spin spinning={loading}>
          <Row className="projects" align="middle" style={{ height: "600px" }}>
            <Col sm={24} md={24} lg={8} className={style.col}>
              <Card className={style.card}>
                <div className={style.title}>Aggiungi un nuovo progetto</div>
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  onFinish={onFinish}
                >
                  <div className={style.formitems}>
                    <Form.Item name="title" label="Titolo">
                      <Input placeholder="Titolo del progetto" />
                    </Form.Item>
                    <Form.Item name="subtitle" label="Sottotit.">
                      <Input placeholder="Sottotitolo del progetto" />
                    </Form.Item>
                    <Form.Item name="description" label="Desc.">
                      <TextArea
                        placeholder="Descrizione del progetto"
                        rows={3}
                        autoSize={{ minRows: 3, maxRows: 3 }}
                      />
                    </Form.Item>
                    <Form.Item name="images" label="Immagini">
                      <Upload action="/upload.do" listType="picture-card">
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </div>
                  <div style={{ textAlign: "center", margin: "26px" }}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <Button htmlType="submit">Aggiungi</Button>
                    </Form.Item>
                  </div>
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
