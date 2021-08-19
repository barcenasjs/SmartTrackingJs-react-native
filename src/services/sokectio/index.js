import io from 'socket.io-client';

console.log('aquí');
export const emit = ({location, ip}) => {
  console.log(JSON.stringify(ip));
  const connection = io(ip || 'https://santi-tracking-api.bahoque.com/');
  connection.on('connect_error', err => {
    alert(`connect_error due to ${err.message}`);
  });
  connection.emit('create', 'tcpudp', {...location}, (error, message) => {
    if (error) {
      alert(error);
    } else {
      alert(message);
    }
    connection.disconnect();
  });
};


