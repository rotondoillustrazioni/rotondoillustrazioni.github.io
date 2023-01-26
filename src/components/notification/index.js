// @ts-nocheck
import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, Descriptions, Row } from "antd";
import {
  deleteNotificationThunk,
  editNotificationThunk,
} from "../../redux/actions";

function Notification({ notification }) {
  const [readUnread, setReadUnread] = useState();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const notificationLoading = useSelector(
    (state) => state.deleteNotification.loading
  );

  useEffect(() => {
    if (notification.read === true) {
      setReadUnread("Segna come non letta");
    } else {
      setReadUnread("Segna come letta");
    }
  }, [notification.read]);

  const markAsRead = () => {
    dispatch(
      editNotificationThunk({
        id: notification._id,
        token,
        read: !notification.read,
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
      <Badge dot={!notification.read}>
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
      <Row align="middle" style={{ justifyContent: "space-between" }}>
        <div className={style.button}>
          <Button onClick={onDelete} danger size="large">
            Elimina
          </Button>
        </div>

        <div className={style.button}>
          <Button size="large" href={`mailto:${notification.email}`}>
            Rispondi
          </Button>
        </div>
        <div className={style.button}>
          <Button onClick={markAsRead} size="large">
            {readUnread}
          </Button>
        </div>
      </Row>
    </Card>
  );
}

export default Notification;
