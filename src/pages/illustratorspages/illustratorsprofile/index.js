import { default as React, useState } from "react";
import style from "./style.module.scss";
import gif from "../../../images/gif.gif";
import { useTranslation } from "react-i18next";
import IllustratorsHeader from "../../../components/illustratorsheader";
import { Input, Avatar, Button, Row, Col, Card, Radio } from "antd";
import {
  InstagramOutlined,
  BehanceOutlined,
  MailOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

function IllustratorsProfile(props) {
  const { t } = useTranslation();

  const [radioValue, setRadioValue] = useState(1);

  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <div>
      <IllustratorsHeader {...props} />
      <div className={style.container}>
        <Card className={style.card}>
          <Row className={style.row}>
            <Col className={style.outerCol} span={24}>
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
                  <TextArea
                    rows={4}
                    autoSize={{ minRows: 6, maxRows: 6 }}
                    placeholder="Testo in italiano"
                    defaultValue={
                      t("aboutMe1") + t("aboutMe2") + t("uniBA") + t("uniMA")
                    }
                  />
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
              <Input
                style={{ paddingBottom: "10px" }}
                addonBefore={<MailOutlined />}
                defaultValue="progetti.rotondo@gmail.com"
              />
              <Input
                style={{ paddingBottom: "10px" }}
                addonBefore={<InstagramOutlined />}
                defaultValue="https://www.instagram.com/rotondo___"
              />
              <Input
                style={{ paddingBottom: "10px" }}
                addonBefore={<BehanceOutlined />}
                defaultValue="https://www.behance.net/rotondostudio/info"
              />
              <div className={style.title}>
                MODIFICA INFORMAZIONI DI CONTATTO
              </div>
              <div style={{ paddingBottom: "5px", paddingTop: "10px" }}>
                <Input placeholder="Email" />
              </div>
              <div style={{ paddingBottom: "5px" }}>
                <Input.Password placeholder="Nuova Password" />
              </div>
              <Input.Password placeholder="Ripeti Password" />
              <div style={{ paddingTop: "20px" }}>
                <Button>Salva</Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default IllustratorsProfile;
