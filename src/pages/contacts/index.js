import { default as React } from "react";
import style from "./style.module.scss";
import { Card } from "antd";
import Header from "../../components/header";

function Contacts(props) {
  return (
    <>
      <Header {...props} />
      <div className={style.contact}>
        <Card className={style.card}>
          <div>
            <div>Mail:</div>
            <ul>
              <li>
                <a href="mailto:progetti.rotondo@gmail.com">
                  {" "}
                  progetti.rotondo@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div>Instagram:</div>
            <ul>
              <li>
                <a href="https://www.instagram.com/rotondo___/"> rotondo___</a>
              </li>
            </ul>
          </div>
          <div>
            <div>Behance:</div>
            <ul>
              <li>
                <a href="https://www.behance.net/rotondostudio/info">
                  {" "}
                  rotondostudio
                </a>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Contacts;
