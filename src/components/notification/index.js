// @ts-nocheck
import { default as React } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, Descriptions, Row } from "antd";
import { deleteNotificationThunk } from "../../redux/actions";

function Notification({ notification }) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const notificationLoading = useSelector(
    (state) => state.deleteNotification.loading
  );

  const markAsRead = () => {};

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
          <Descriptions.Item label="Data">
            {new Date(notification.date).toISOString().split("T")[0]}
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
            Segna come letta
          </Button>
        </div>
      </Row>
    </Card>
  );
}

export default Notification;
