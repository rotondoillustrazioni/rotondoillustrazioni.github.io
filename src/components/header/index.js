import { Col, Menu, Row } from "antd";
import { useTranslation } from "react-i18next";
import style from "./style.module.scss";
import { useHistory } from "react-router";

function Header(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const selectKey = () => {
    if (Object.keys(props).length === 0) {
      return "";
    } else {
      return props.location.pathname.split("/")[1] || "home";
    }
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Menu
            mode="horizontal"
            style={{ display: "flex", justifyContent: "center" }}
            selectedKeys={[`${selectKey()}`]}
          >
            <Menu.Item
              className={style.menu}
              key="home"
              onClick={() => {
                history.push("/");
              }}
            >
              {t("home")}
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="aboutus"
              onClick={() => {
                history.push("/aboutus");
              }}
            >
              {t("about")}
            </Menu.Item>
            <Menu.Item
              className={style.menu}
              key="contacts"
              onClick={() => {
                history.push("/contacts");
              }}
            >
              {t("contact")}
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
export default Header;
