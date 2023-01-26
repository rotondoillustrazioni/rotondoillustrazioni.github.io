// @ts-nocheck
import { default as React, useEffect } from "react";
import style from "./style.module.scss";
import { Card, Form, Input, Button, Row, Col } from "antd";
import Header from "../../components/header";
import { contactsThunk } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { wsConnect, wsDisconnect, wsSendMessage } from "../../websocket";

import {
  InstagramOutlined,
  BehanceOutlined,
  MailOutlined,
} from "@ant-design/icons";

function Contacts(props) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    const getContacts = async () => {
      await dispatch(contactsThunk());
    };
    getContacts();
  }, [dispatch]);

  useEffect(() => {
    dispatch(wsConnect(process.env.REACT_APP_SOCKET_ORIGIN));

    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  const validateMessages = {
    required: t("required"),
    types: {
      email: t("invalid-email"),
    },
  };

  const onFinish = (values) => {
    const message = values;
    form.resetFields();
    dispatch(wsSendMessage(message));
  };

  return (
    <>
      <Header {...props} />
      <div className={style.contact}>
        <Card className={style.card}>
          {contacts && (
            <div>
              <Row className={style.row}>
                <Col className={style.col}>
                  <div className={style.title}>{t("contact-follow")}</div>
                  <Button
                    className={style.link}
                    type="link"
                    size="large"
                    href={contacts.instagram}
                    icon={<InstagramOutlined />}
                  >
                    rotondo___
                  </Button>
                  <Button
                    className={style.link}
                    type="link"
                    size="large"
                    href={contacts.behance}
                    icon={<BehanceOutlined />}
                  >
                    rotondostudio
                  </Button>
                </Col>
              </Row>
              <Row className={style.row}>
                <Col className={style.col}>
                  <div className={style.title}>{t("contact-email")}</div>
                  <Button
                    className={style.link}
                    icon={<MailOutlined />}
                    type="link"
                    size="large"
                    href={contacts.email}
                  >
                    {contacts.email}
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          <Row className={style.row}>
            <div className={style.title}>{t("contact-or")}</div>
          </Row>
          <Form
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            form={form}
          >
            <Form.Item
              name="name"
              label={t("name")}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label={t("email")}
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("title")}
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("description")}
              name="description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                autoSize={{ minRows: 6, maxRows: 6 }}
              ></Input.TextArea>
            </Form.Item>
            <Row className={style.row}>
              <Form.Item>
                <Button htmlType="submit">{t("send")}</Button>
              </Form.Item>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Contacts;
