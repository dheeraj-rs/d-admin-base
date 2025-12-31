
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authFetch } from '@/core/utils';
import { useLanguage } from '@/core/providers/LanguageProvider';
import { safeJsonParse } from '@/core/utils';
import { Message } from '@/core/types/admin-layout';

const AppTopbarNotifications: React.FC = () => {
    const { t } = useLanguage();
    const router = useRouter();
    const [showMessageDropdown, setShowMessageDropdown] = useState(false);
    const messageDropdownRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchMessages = useCallback(async () => {
        try {
            const response = await authFetch('/api/messages?limit=5&unreadOnly=false');
            if (!response.ok) {
                setMessages([]);
                setUnreadCount(0);
                return;
            }

            const data = await safeJsonParse(response);
            if (data && data.success && data.data && Array.isArray(data.data)) {
                setMessages(data.data);
                setUnreadCount(data.data.filter((msg: Message) => !msg.isRead).length);
            } else {
                setMessages([]);
                setUnreadCount(0);
            }
        } catch {
            setMessages([]);
            setUnreadCount(0);
        }
    }, []);

    const handleMarkAsRead = async (messageId: string, link?: string) => {
        try {
            await fetch(`/api/messages/${messageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: true })
            });
            fetchMessages();
            if (link) {
                setShowMessageDropdown(false);
                router.push(link);
            }
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const handleClearAll = async () => {
        try {
            await fetch('/api/messages/mark-all-read', {
                method: 'POST'
            });
            fetchMessages();
        } catch (error) {
            console.error('Error clearing messages:', error);
        }
    };

    const formatTimestamp = (timestamp: Date) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                messageDropdownRef.current &&
                !messageDropdownRef.current.contains(target) &&
                !target.closest('.topbar-notification-btn') &&
                showMessageDropdown
            ) {
                setShowMessageDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMessageDropdown]);

    return (
        <div className="topbar-notification-wrapper">
            <button
                className="p-link layout-topbar-button"
                onClick={() => setShowMessageDropdown(!showMessageDropdown)}
                title={t('header.notifications')}
            >
                <i className="pi pi-bell" />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>

            {showMessageDropdown && (
                <div className="notification-modal" ref={messageDropdownRef}>
                    <div className="notification-modal-header">
                        <h3>{t('header.notifications')}</h3>
                        {unreadCount > 0 && (
                            <button className="notification-clear-all" onClick={handleClearAll}>
                                <i className="pi pi-check-circle" />
                                <span>{t('actions.clear')}</span>
                            </button>
                        )}
                    </div>

                    <div className="notification-modal-body">
                        {messages.length === 0 ? (
                            <div className="notification-empty">
                                <i className="pi pi-inbox" />
                                <p>No notifications</p>
                            </div>
                        ) : (
                            <div className="notification-list">
                                {messages.map((message) => (
                                    <div
                                        key={message._id}
                                        className={`notification-item ${!message.isRead ? 'unread' : ''}`}
                                        onClick={() => handleMarkAsRead(message._id, message.link)}
                                        style={{ cursor: message.link ? 'pointer' : 'default' }}
                                    >
                                        <div className="notification-icon">
                                            <i className={message.icon || 'pi pi-bell'} />
                                        </div>
                                        <div className="notification-content">
                                            <h4 className="notification-title">{message.title}</h4>
                                            <p className="notification-desc">{message.description}</p>
                                            <span className="notification-time">{formatTimestamp(message.timestamp)}</span>
                                        </div>
                                        {!message.isRead && <span className="notification-unread-dot" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="notification-modal-footer">
                        <Link href="/messages" onClick={() => setShowMessageDropdown(false)}>
                            View All Messages
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppTopbarNotifications;
