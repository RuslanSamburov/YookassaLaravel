import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useNotification(state = []) {
    const [notifications, setNotifications] = useState(state);

    const addNotification = (title, reason) => {
        setNotifications(e => (
            [...e,
                {
                    id: uuidv4(),
                    title: title,
                    reason: reason,
                }
            ]
        ));
    }

    const removeNotification = uuid => {
        setNotifications((prevNotifications) => prevNotifications.filter(_ => _.id !== uuid));
    }

    return [
        notifications,
        addNotification,
        removeNotification,
        setNotifications
    ];
}
