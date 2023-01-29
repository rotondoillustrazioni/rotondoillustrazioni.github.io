// @ts-nocheck
import { default as React, useEffect, useState } from "react";
import style from "./style.module.scss";

import IllustratorsHeader from "../../../components/illustratorsheader";
import { Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { notificationsThunk } from "../../../redux/actions";
import Notification from "../../../components/notification";
import {
  resetDeleteNotification,
  resetEditNotification,
  resetNewNotificationWS,
} from "../../../redux/reducers";

function Notifications(props) {
  const dispatch = useDispatch();
  const notifications = true;
  const notificationsData = useSelector(
    (state) => state.notifications.notifications
  );
  const [newNotifications, setNewNotifications] = useState([]);

  const newNotification = useSelector(
    (state) => state.notificationsWS.receivedNotification
  );

  const notificationDeleted = useSelector(
    (state) => state.deleteNotification.isDeleted
  );

  const loading = useSelector((state) => state.notifications.loading);

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(resetEditNotification());
    dispatch(resetDeleteNotification());
    dispatch(resetNewNotificationWS());
    setNewNotifications([]);

    const notifications = async () => {
      await dispatch(notificationsThunk({ token }));
    };
    notifications();
  }, [dispatch, token, notificationDeleted]);

  useEffect(() => {
    if (newNotification !== null && newNotification !== undefined) {
      setNewNotifications([...newNotifications, newNotification]);
    }
  }, [newNotification]);

  const showNewNotification = () => {
    if (newNotifications.length > 0) {
      return newNotifications
        .reverse()
        .map((notification) => (
          <Notification
            notification={notification[0]}
            key={notification[0]._id}
          />
        ));
    }
  };

  const showNotifications = () => {
    if (
      loading === false &&
      notificationsData !== undefined &&
      notificationsData !== null
    ) {
      const proj = Object.keys(notificationsData).map((key) => [
        notificationsData[key],
      ]);

      return proj
        .reverse()
        .map((p) =>
          p.map((notification) => (
            <Notification notification={notification} key={notification._id} />
          ))
        );
    }
  };

  return (
    <>
      <IllustratorsHeader {...props} notifications={notifications} />
      <div className={style.title}>NOTIFICHE</div>
      <Row>
        {newNotification !== null && newNotification !== undefined && (
          <div className={style.notification}>{showNewNotification()}</div>
        )}
        <div className={style.notification}>{showNotifications()}</div>
      </Row>
    </>
  );
}

export default Notifications;
