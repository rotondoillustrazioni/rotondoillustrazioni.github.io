// @ts-nocheck
import { default as React, useState } from "react";
import style from "./style.module.scss";
import { Card, Row, Form, Input, Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteProjectThunk, editProjectThunk } from "../../redux/actions";
import TextArea from "antd/lib/input/TextArea";

function EditableProject({ projectData }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const data = projectData.data;
  const images = data.images.map((image, index) => ({
    uid: data._id + " " + index, // for Form.Item key
    projectName: data.title,
    originalFilename: image.split("/")[image.split("/").length - 1],
    status: "done",
    url: image,
  }));

  const [imagesList, setImagesList] = useState(images);

  const handleCancel = () => setPreviewOpen(false);

  const handleChange = ({ fileList: newFileList }) =>
    setImagesList(newFileList);

  const handleDeleteProject = (id, projectTitle) => {
    dispatch(deleteProjectThunk({ id, projectTitle, token }));
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onFinish = (values) => {
    let id = data._id.split(" ")[0]; // remove the Form.Item's key from the id
    const project = new FormData();
    project.append("title", data.title);
    project.append("subtitle", values.subtitle);
    project.append("description", values.description);

    if (imagesList.length < images.length) {
      let deletedImages = images.filter(
        (i) => !imagesList.find((il) => il.uid === i.uid)
      );
      deletedImages.map((i) =>
        project.append("deletedImages", JSON.stringify(i))
      );
    }

    if (imagesList.length > images.length) {
      imagesList
        .map((i) => i.originFileObj)
        .map((f) => project.append("images", f));
    }

    dispatch(editProjectThunk({ id, project, token }));
  };

  return (
    <Card className={style.card}>
      <div className={style.title}>{data.title}</div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
      >
        <div className={style.formitems}>
          {/* <Form.Item name="title" label="Titolo">
            <Input defaultValue={data.title} value={data.title} />
          </Form.Item> */}
          <Form.Item name="subtitle" label="Sottotit.">
            <Input
              defaultValue={data.subtitle !== undefined ? data.subtitle : ""}
              value={data.subtitle !== undefined ? data.subtitle : ""}
            />
          </Form.Item>
          <Form.Item name="description" label="Desc.">
            <TextArea
              defaultValue={data.description}
              value={data.description}
              rows={3}
              autoSize={{ minRows: 3, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item label="Immagini">
            <Upload
              action="/upload.do"
              listType="picture-card"
              fileList={imagesList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
              maskStyle={{
                opacity: "0.5",
              }}
            >
              <img
                alt={data.title}
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
        </div>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Row className={style.buttons}>
            <Button
              danger
              onClick={() => {
                handleDeleteProject(data._id, data.title);
              }}
            >
              Elimina Progetto
            </Button>
            <Button htmlType="submit">Salva Modifiche</Button>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default EditableProject;
