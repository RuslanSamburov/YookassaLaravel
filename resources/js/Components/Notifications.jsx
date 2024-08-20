import React from 'react';
import Notification from './Notification';

export default function Notifications ({ notifications, setNotifications }) {
    const handleClose = (index) => {
        setNotifications(index);
    };

    return (
        <div className="fixed top-0 right-0 w-[100%] sm:w-auto">
            {notifications.map(notif => (
                <Notification
                    key={notif.id}
                    id={notif.id}
                    title={notif.title}
                    reason={notif.reason}
                    onClose={handleClose}
                />
            ))}
        </div>
    );
};
