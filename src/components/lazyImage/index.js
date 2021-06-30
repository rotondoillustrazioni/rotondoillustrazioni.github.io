import { Col, Image } from "antd";
import React from "react";
import { useHistory } from "react-router";
import style from "./style.module.scss";

function LazyImage(props) {
  const { data } = props;
  const history = useHistory();

  return (
    <Col md={8} sm={24} key={data._id}>
      <div className={style.imageContainer}>
        <div
          className={style.image}
          onClick={() => {
            history.push(`/project/${data._id}`);
          }}
        >
          <Image preview={false} alt={data.title} src={data.images[0]} />
          <div className={style.imageDescription}>
            <div>
              {data.subtitle !== "" ? (
                <div>{`${data.title} - ${data.subtitle}`}</div>
              ) : (
                <div>{data.title}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}
export default LazyImage;
