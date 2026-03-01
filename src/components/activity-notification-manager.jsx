import React, { useState, useEffect, createContext, useContext } from 'react';
import ActivityNotification from './activity-notification';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        const id = Date.now() + Math.random();
        setNotifications(prev => [...prev, { ...notification, id }]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    // Example: Add buy notification
    const addBuyNotification = (address, mmvAmount, usdAmount) => {
        addNotification({
            type: 'buy',
            address,
            mmvAmount,
            usdAmount
        });
    };

    // Example: Add lock notification
    const addLockNotification = (address, mmvAmount, memeToken, memeAmount) => {
        addNotification({
            type: 'lock',
            address,
            mmvAmount,
            memeToken, // 'shib', 'pepe', 'bonk', 'neiro'
            memeAmount
        });
    };

    return (
        <NotificationContext.Provider value={{ addBuyNotification, addLockNotification }}>
            {children}

            {/* Notification Container */}
            <div className="activity-notif-container">
                {notifications.slice(0, 3).map((notification) => (
                    <ActivityNotification
                        key={notification.id}
                        notification={notification}
                        onClose={() => removeNotification(notification.id)}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;