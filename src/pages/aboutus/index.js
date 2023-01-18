import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Avatar, Card, Col, Row } from "antd";
import gif from "../../images/gif.gif";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";
import { aboutUsThunk } from "../../redux/actions";

function AboutUs(props) {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(i18next.language);
  const aboutUs = useSelector((state) => state.aboutUs);
  const loading = useSelector((state) => state.aboutUs.loading);

  useEffect(() => {
    if (language !== undefined) {
      const aboutUsDesc = async () => {
        await dispatch(aboutUsThunk({ language }));
      };
      aboutUsDesc();
    }
  }, [dispatch, language]);

  useEffect(() => {
    i18next.on("languageChanged", (lng) => {
      setLanguage(lng);
    });
  }, []);

  const condition =
    loading === false && aboutUs !== null && aboutUs !== undefined;

  return (
    <>
      <Header {...props} />
      <div className={style.about}>
        <Card loading={loading} className={style.card}>
          {condition && (
            <Row>
              <Col>
                <Row style={{ justifyContent: "center" }}>
                  <Avatar shape="square" size={164} alt="gif" src={gif} />
                </Row>
                <div className={style.aboutTxt}>
                  {aboutUs.aboutUs.description}
                </div>
              </Col>
            </Row>
          )}
        </Card>
      </div>
    </>
  );
}

export default AboutUs;
