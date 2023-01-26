// @ts-nocheck
import { default as React, useEffect } from "react";
import style from "./style.module.scss";

import IllustratorsHeader from "../../../components/illustratorsheader";
import { Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { notificationsThunk } from "../../../redux/actions";
import { wsConnect } from "../../../websocket";
import Notification from "../../../components/notification";

function Notifications(props) {
  const dispatch = useDispatch();
  const [showNewN, setShowNewN] = React.useState(false);
  const notifications = true;
  const notificationsData = useSelector(
    (state) => state.notifications.notifications
  );

  const newNotification = useSelector(
    (state) => state.notificationsWS.receivedNotification
  );

  const loading = useSelector((state) => state.notifications.loading);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const projects = async () => {
      await dispatch(notificationsThunk({ token }));
    };
    projects();
    dispatch(wsConnect(process.env.REACT_APP_SOCKET_ORIGIN));
  }, [dispatch, token]);

  useEffect(() => {
    if (newNotification !== null && newNotification !== undefined) {
      setShowNewN(true);
    } else {
      setShowNewN(false);
    }
  }, [newNotification]);

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
        {showNewN && (
          <div className={style.notification}>{showNewNotification()}</div>
        )}
        <div className={style.notification}>{showNotifications()}</div>
      </Row>
    </>
  );
}

export default Notifications;
