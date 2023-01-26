// @ts-nocheck
import { default as React, useEffect } from "react";
import style from "./style.module.scss";

import IllustratorsHeader from "../../../components/illustratorsheader";
import { Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { notificationsThunk } from "../../../redux/actions";
import Notification from "../../../components/notification";

function Notifications(props) {
  const dispatch = useDispatch();
  const notifications = true;
  const notificationsData = useSelector(
    (state) => state.notifications.notifications
  );

  const newNotification = useSelector(
    (state) => state.notificationsWS.receivedNotification
  );

  const notificationDeleted = useSelector(
    (state) => state.deleteNotification.isDeleted
  );

  const notificationEdited = useSelector(
    (state) => state.editNotification.isEdited
  );

  const loading = useSelector((state) => state.notifications.loading);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const projects = async () => {
      await dispatch(notificationsThunk({ token }));
    };
    projects();
    // dispatch(wsConnect(process.env.REACT_APP_SOCKET_ORIGIN));
  }, [dispatch, token, notificationDeleted, notificationEdited]);

  const showNewNotification = () => {
    return <Notification notification={newNotification[0]} />;
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
