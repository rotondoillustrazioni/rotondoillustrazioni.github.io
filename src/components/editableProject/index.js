// @ts-nocheck
import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import {
  Avatar,
  Card,
  Col,
  Row,
  Form,
  Input,
  Upload,
  Modal,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteProjectThunk } from "../../redux/actions";
import TextArea from "antd/lib/input/TextArea";

function EditableProject({ projectData }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const data = projectData.data;
  const images = data.images.map((image, index) => ({
    uid: data._id + " " + index,
    name: data.title,
    status: "done",
    url: image,
  }));

  const [imagesList, setImagesList] = useState(images);

  const handleCancel = () => setPreviewOpen(false);

  const handleDeleteImage = (f) => {};

  const handleDeleteProject = (id) => {
    dispatch(deleteProjectThunk({ id, token }));
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

  return (
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
          <Form.Item label="Desc.">
            <TextArea
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
              onRemove={handleDeleteImage}
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
                handleDeleteProject(data._id);
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
