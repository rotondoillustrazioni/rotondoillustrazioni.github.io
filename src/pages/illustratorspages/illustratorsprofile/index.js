import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import gif from "../../../images/gif.gif";
import { useTranslation } from "react-i18next";
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
  Space,
} from "antd";
import {
  InstagramOutlined,
  BehanceOutlined,
  MailOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

function IllustratorsProfile(props) {
  const { t } = useTranslation();

  const [radioValue, setRadioValue] = useState(1);

  const [aboutMe, setAboutMe] = useState([]);

  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <IllustratorsHeader {...props} />
      <div className={style.container}>
        <Card className={style.card}>
          <Row className={style.row}>
            <Col className={style.outerCol} span={24}>
              <Form name="complex-form" onFinish={onFinish}>
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
                    <Form.Item name="aboutMe" noStyle>
                      <TextArea
                        rows={4}
                        autoSize={{ minRows: 7, maxRows: 7 }}
                        placeholder="Testo in italiano"
                        defaultValue={
                          t("aboutMe1") +
                          t("aboutMe2") +
                          t("uniBA") +
                          t("uniMA")
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="end">
                  <Col>
                    <Radio.Group
                      className={style.radio}
                      onChange={onRadioChange}
                      value={radioValue}
                    >
                      <Radio value={1}>IT</Radio>
                      <Radio value={2}>EN</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Form.Item name="mail" noStyle>
                  <Input
                    style={{ paddingBottom: "10px" }}
                    addonBefore={<MailOutlined />}
                    defaultValue="progetti.rotondo@gmail.com"
                  />
                </Form.Item>
                <Form.Item name="instagram" noStyle>
                  <Input
                    style={{ paddingBottom: "10px" }}
                    addonBefore={<InstagramOutlined />}
                    defaultValue="https://www.instagram.com/rotondo___"
                  />
                </Form.Item>
                <Form.Item name="behance" noStyle>
                  <Input
                    style={{ paddingBottom: "10px" }}
                    addonBefore={<BehanceOutlined />}
                    defaultValue="https://www.behance.net/rotondostudio/info"
                  />
                </Form.Item>
                <div className={style.title}>
                  MODIFICA INFORMAZIONI DI CONTATTO
                </div>
                <Form.Item name="newpassword" noStyle>
                  <div style={{ paddingBottom: "5px" }}>
                    <Input.Password placeholder="Nuova Password" />
                  </div>
                </Form.Item>
                <Form.Item name="repeatpassword" noStyle>
                  <div style={{ paddingBottom: "5px" }}>
                    <Input.Password placeholder="Ripeti Password" />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div style={{ paddingTop: "20px" }}>
                    <Button htmlType="submit">Salva</Button>
                  </div>
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
