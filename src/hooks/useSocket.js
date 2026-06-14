import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

export default function useSocket(onEvent) {
  const user = useSelector((s) => s.auth.user);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const socket = io(import.meta.env.VITE_SOCKET_URL || undefined, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;
    socket.emit('join', user.id);

    if (onEvent) {
      Object.entries(onEvent).forEach(([event, handler]) => {
        socket.on(event, handler);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  return socketRef;
}
