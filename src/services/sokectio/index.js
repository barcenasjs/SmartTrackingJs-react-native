import io from 'socket.io-client';
console.log('aquí');

export const emit = data => {
  const connection = io('https://santi-tracking-api.bahoque.com/');
  connection.on('connect_error', err => {
    alert(`connect_error due to ${err.message}`);
  });
  connection.emit('create', 'tcpudp', {...data}, (error, message) => {
    if (error) {
      alert(error);
    } else {
      alert(message);
    }
    connection.disconnect();
  });
};
