// @ts-nocheck
import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import gif from "../../../images/gif.gif";
import IllustratorsHeader from "../../../components/illustratorsheader";
import {
  Input,
  Avatar,
  Button,
  Row,
  Col,
  Card,
  Radio,
  Form,
  Alert,
} from "antd";
import {
  InstagramOutlined,
  BehanceOutlined,
  MailOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import {
  aboutUsThunk,
  changePasswordThunk,
  contactsThunk,
  editAboutUsThunk,
  editContactsThunk,
} from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";
import { resetEditAboutUs, resetEditContacts } from "../../../redux/reducers";

function IllustratorsProfile(props) {
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState(i18next.language);
  const [language, setLanguage] = useState(radioValue);
  const [form] = Form.useForm();

  const aboutUs = useSelector((state) => state.aboutUs);
  const contacts = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.aboutUs.loading);
  const editAboutUs = useSelector((state) => state.editAboutUs);
  const editContacts = useSelector((state) => state.editContacts);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (language !== undefined) {
      const aboutUsDesc = async () => {
        await dispatch(aboutUsThunk({ language }));
      };
      aboutUsDesc();
    }
  }, [dispatch, language]);

  useEffect(() => {
    const getContacts = async () => {
      await dispatch(contactsThunk());
    };
    getContacts();
  }, [dispatch]);

  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
    setLanguage(e.target.value);
  };

  const onFinish = (values) => {
    if (values.aboutUs !== undefined) {
      dispatch(
        editAboutUsThunk({ language, description: values.aboutUs, token })
      );
    }
    if (values.email !== undefined) {
      const contact = "email";
      const content = { email: values.email };
      dispatch(editContactsThunk({ contact, content, token }));
    }
    if (values.instagram !== undefined) {
      const contact = "instagram";
      const content = { instagram: values.instagram };
      dispatch(editContactsThunk({ contact, content, token }));
    }
    if (values.behance !== undefined) {
      const contact = "behance";
      const content = { behance: values.behance };
      dispatch(editContactsThunk({ contact, content, token }));
    }
  };

  const onChangePassword = (values) => {
    let newPassword = values.confirm;
    dispatch(changePasswordThunk({ newPassword, token }));
    form.resetFields();
  };

  useEffect(() => {
    dispatch(resetEditAboutUs());
    dispatch(resetEditContacts());
  }, [dispatch]);

  const textAreaCondition =
    loading === false && aboutUs !== null && aboutUs !== undefined;

  return (
    <div>
      <IllustratorsHeader {...props} />
      <div className={style.container}>
        <Card className={style.card}>
          <Row className={style.row}>
            <Col className={style.outerCol} span={24}>
              <Form name="bio" onFinish={onFinish}>
                <div className={style.title}>MODIFICA BIOGRAFIA E CONTATTI</div>
                <Row style={{ paddingTop: "10px" }}>
                  <Col className={style.col} sm={24} md={24} lg={4}>
                    <Avatar
                      className={style.avatar}
                      shape="square"
                      alt="gif"
                      src={gif}
                    />
                  </Col>
                  <Col className={style.col} sm={24} md={24} lg={20}>
                    {textAreaCondition && (
                      <Form.Item name="aboutUs" noStyle>
                        <TextArea
                          rows={4}
                          autoSize={{ minRows: 7, maxRows: 7 }}
                          defaultValue={aboutUs.aboutUs.description}
                          value={aboutUs.aboutUs.description}
                        ></TextArea>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <Row justify="end">
                  <Col>
                    <Radio.Group
                      className={style.radio}
                      onChange={onRadioChange}
                      value={radioValue}
                    >
                      <Radio value={"en"}>EN</Radio>
                      <Radio value={"it"}>IT</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                {contacts && (
                  <>
                    <Form.Item name="email" noStyle>
                      <Input
                        style={{ paddingBottom: "10px" }}
                        addonBefore={<MailOutlined />}
                        defaultValue={contacts.email}
                      />
                    </Form.Item>
                    <Form.Item name="instagram" noStyle>
                      <Input
                        style={{ paddingBottom: "10px" }}
                        addonBefore={<InstagramOutlined />}
                        defaultValue={contacts.instagram}
                      />
                    </Form.Item>
                    <Form.Item name="behance" noStyle>
                      <Input
                        style={{ paddingBottom: "10px" }}
                        addonBefore={<BehanceOutlined />}
                        defaultValue={contacts.behance}
                      />
                    </Form.Item>
                  </>
                )}
                <Form.Item>
                  <div style={{ paddingTop: "20px" }}>
                    <Button htmlType="submit">Salva</Button>
                  </div>
                </Form.Item>
                {(editAboutUs.aboutUsEdited || editContacts.contactsEdited) && (
                  <Alert message="Modifiche salvate" type="success" />
                )}
                {(editAboutUs.error || editContacts.error) && (
                  <Alert
                    message="Errore nel salvataggio delle modifiche"
                    type="error"
                  />
                )}
              </Form>
              <div className={style.title}>
                MODIFICA INFORMAZIONI DI CONTATTO
              </div>
            </Col>
          </Row>
          <Row className={style.row}>
            <Col className={style.outerCol} span={24}>
              <Form
                name="psw"
                onFinish={onChangePassword}
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              >
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Per favore inserisci la password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Conferma Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Per favore conferma la password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Le due password non corrispondono!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit">Salva</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default IllustratorsProfile;
