import { default as React } from "react";
import style from "./style.module.scss";
import { Avatar, Image, Col, Row } from "antd";
import logo from "../../images/LOGO.png";
import { useTranslation } from "react-i18next";

function MiniBio() {
  const { t } = useTranslation();

  return (
    <>
      <Row className={style.rowC}>
        <div className={style.rowC}>
          <Col xs={24} sm={24} md={24} style={{ textAlign: "center" }}>
            <Avatar
              shape="square"
              size={164}
              src={<Image preview={false} src={logo} />}
            />
          </Col>
          <Col xs={24} sm={24} md={24}>
            <div className={style.miniBioContainer}>
              <div>
                <div className={style.miniBio}>{t("miniBio1")}</div>
                <div className={style.miniBio}>{t("miniBio2")}</div>
                <div className={style.miniBio}>{t("miniBio3")}</div>
                <div className={style.miniBio}>
                  {/* <a href="mailto:progetti.rotondo@gmail.com">
                    progetti.rotondo@gmail.com
                  </a> */}
                </div>
              </div>
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default MiniBio;
