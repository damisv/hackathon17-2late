module.exports = {
  connection: function (socket) {
      socket.emit('priceUpdate',55);
      socket.on('bid', function (data) {
          socket.emit('priceUpdate',parseInt(data));
          socket.broadcast.emit('priceUpdate',parseInt(data));
      });
      socket.on('register', function (data) {
          //todo create array with users somewhere and add user here
      });
  }
};
