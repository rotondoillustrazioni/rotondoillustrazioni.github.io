// @ts-nocheck
import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, Descriptions, Row } from "antd";
import {
  deleteNotificationThunk,
  editNotificationThunk,
} from "../../redux/actions";
import {
  decreaseNotReadNumber,
  increaseNotReadNumber,
  resetDeleteNotification,
} from "../../redux/reducers";

function Notification({ notification }) {
  const [readUnreadText, setReadUnreadText] = useState(
    notification.read === true ? "Segna come non letta" : "Segna come letta"
  );
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const notificationLoading = useSelector(
    (state) => state.deleteNotification.loading
  );

  const [notificationRead, setNotificationRead] = useState(notification.read);

  useEffect(() => {
    dispatch(resetDeleteNotification());
  }, [dispatch]);

  const markAsRead = () => {
    if (notificationRead === true) {
      setReadUnreadText("Segna come letta");
      dispatch(increaseNotReadNumber());
    } else {
      setReadUnreadText("Segna come non letta");
      dispatch(decreaseNotReadNumber());
    }
    setNotificationRead(!notificationRead);
    dispatch(
      editNotificationThunk({
        id: notification._id,
        token,
        read: !notificationRead,
      })
    );
  };

  const onDelete = () => {
    dispatch(deleteNotificationThunk({ id: notification._id, token }));
  };

  return (
    <Card
      className={style.card}
      key={notification._id}
      loading={notificationLoading}
    >
      <Badge dot={!notificationRead}>
        <Descriptions title={notification.name} bordered column={1}>
          <Descriptions.Item label="Email" span={4}>
            {notification.email}
          </Descriptions.Item>
          <Descriptions.Item label="Titolo">
            {notification.title}
          </Descriptions.Item>
          <Descriptions.Item label="Descrizione">
            {notification.description}
          </Descriptions.Item>
          <Descriptions.Item label="Data e ora">
            {new Date(notification.date).toISOString().split("T")[0] +
              ", " +
              new Date(notification.date)
                .toISOString()
                .split("T")[1]
                .split(".")[0]}
          </Descriptions.Item>
        </Descriptions>
      </Badge>
      <Row align="middle" className={style.buttons}>
        <div className={style.button}>
          <Button
            style={{ width: "200px" }}
            onClick={onDelete}
            danger
            size="large"
          >
            Elimina
          </Button>
        </div>

        <div className={style.button}>
          <Button
            style={{ width: "200px" }}
            type="primary"
            size="large"
            href={`mailto:${notification.email}`}
          >
            Rispondi
          </Button>
        </div>
        <div className={style.button}>
          <Button style={{ width: "200px" }} onClick={markAsRead} size="large">
            {readUnreadText}
          </Button>
        </div>
      </Row>
    </Card>
  );
}

export default Notification;
