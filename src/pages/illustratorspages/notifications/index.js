// @ts-nocheck
import { default as React, useEffect } from "react";
import style from "./style.module.scss";

import IllustratorsHeader from "../../../components/illustratorsheader";
import { Badge, Button, Card, Descriptions, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { notificationsThunk } from "../../../redux/actions";

function Notifications(props) {
  const dispatch = useDispatch();
  const notifications = true;
  const notificationsData = useSelector(
    (state) => state.notifications.notifications
  );
  const loading = useSelector((state) => state.notifications.loading);

  const token = useSelector((state) => state.auth.token);

  const markAsRead = () => {};

  const onDelete = () => {};

  useEffect(() => {
    const projects = async () => {
      await dispatch(notificationsThunk({ token }));
    };
    projects();
  }, [dispatch, token]);

  const showNotifications = () => {
    if (
      loading === false &&
      notificationsData !== undefined &&
      notificationsData !== null
    ) {
      const proj = Object.keys(notificationsData).map((key) => [
        notificationsData[key],
      ]);

      return proj.map((p) =>
        p.map((notification) => (
          <Card className={style.card}>
            <Badge dot={!notification.read}>
              <Descriptions title={notification.name} bordered column={1}>
                <Descriptions.Item label="Email">
                  {notification.email}"
                </Descriptions.Item>
                <Descriptions.Item label="Titolo">
                  {notification.title}
                </Descriptions.Item>
                <Descriptions.Item label="Descrizione">
                  {notification.description}
                </Descriptions.Item>
                <Descriptions.Item label="Data">
                  {notification.date}
                </Descriptions.Item>
              </Descriptions>
            </Badge>
            <Row align="center" style={{ justifyContent: "space-between" }}>
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
        ))
      );
    }
  };

  return (
    <>
      <IllustratorsHeader {...props} notifications={notifications} />
      <div className={style.title}>NOTIFICHE</div>
      <Row>
        <div className={style.notification}>{showNotifications()}</div>
      </Row>
    </>
  );
}

export default Notifications;
