import io from 'socket.io-client';
 
const socket = io('https://nvgit.live:3001');

export default socket;