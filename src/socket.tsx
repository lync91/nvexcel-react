import io from 'socket.io-client';
 
const socket = io('https://localhost:8080');

export default socket;