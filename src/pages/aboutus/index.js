import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Avatar, Card, Col, Row } from "antd";
import gif from "../../images/gif.gif";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";
import { aboutMeThunk } from "../../redux/actions";

function AboutUs(props) {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(i18next.language);
  const aboutMe = useSelector((state) => state.aboutMe);
  const loading = useSelector((state) => state.aboutMe.loading);

  useEffect(() => {
    if (language !== undefined) {
      const aboutMeDesc = async () => {
        await dispatch(aboutMeThunk({ language }));
      };
      aboutMeDesc();
    }
  }, [dispatch, language]);

  useEffect(() => {
    i18next.on("languageChanged", (lng) => {
      setLanguage(lng);
    });
  }, []);

  const condition =
    loading === false && aboutMe !== null && aboutMe !== undefined;

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
                <Row>
                  <div className={style.aboutTxt}>
                    {aboutMe.aboutMe.description}
                  </div>
                </Row>
              </Col>
            </Row>
          )}
        </Card>
      </div>
    </>
  );
}

export default AboutUs;
