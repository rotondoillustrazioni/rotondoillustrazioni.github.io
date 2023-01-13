import { default as React } from "react";
import style from "./style.module.scss";
import gif from "../../../images/gif.gif";

import IllustratorsHeader from "../../../components/illustratorsheader";
import { Input, Avatar, Button, Row, Col, Card } from "antd";
import {
  InstagramOutlined,
  BehanceOutlined,
  MailOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

function IllustratorsProfile() {
  return (
    <div>
      <IllustratorsHeader />
      <div className={style.container}>
        <Card className={style.card}>
          <Row className={style.row}>
            <Col col={24} className={style.col}>
              <span className={style.title}>Modifica biografia e contatti</span>
              <Row className={style.row}>
                <Col span={4}>
                  <Avatar shape="square" size={100} alt="gif" src={gif} />
                </Col>
                <Col span={20}>
                  <TextArea rows={4} autoSize={{ minRows: 6, maxRows: 6 }} />
                </Col>
              </Row>
              <Input addonBefore={<MailOutlined />} defaultValue="mysite" />
              <Input
                addonBefore={<InstagramOutlined />}
                defaultValue="mysite"
              />
              <Input addonBefore={<BehanceOutlined />} defaultValue="mysite" />
              <span className={style.title}>
                Modifica informazioni di contatto
              </span>
              <Input.Password placeholder="Nuova Password" />
              <Input.Password placeholder="Ripeti Password" />
              <Button>Salva</Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default IllustratorsProfile;
