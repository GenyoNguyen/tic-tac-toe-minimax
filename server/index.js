const { v4: uuidv4 } = require('uuid');
const WebSocket = require('ws');

const server = new WebSocket.Server({port: 8080});
const rooms = new Map();
const availableRooms = new Set();

function findAvailableRoom() {
  return availableRooms.values().next().value || null;
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4,8,12,16,20]
  ];
  for (const values of lines) {
    if (values.every(v => squares[v] % 2 === 1)) return 'Odd';
    if (values.every(v => squares[v] % 2 === 0 && squares[v] !== 0)) return 'Even';

  }

  return null;
};

server.on('connection', (ws) => {
    console.log('connected');
    ws.on('message', (msg) => {
        const { type, data } = JSON.parse(msg);

        switch(type) {
            case 'join':
                console.log("A new player appears");
                let roomId = findAvailableRoom();
                if (!roomId) {
                    roomId = uuidv4();
                    rooms.set(roomId, { players: [ws], squares: Array(25).fill(0) });
                    availableRooms.add(roomId);
                    console.log(`A player created room ${roomId}`);
                } else {
                    const room = rooms.get(roomId);
                    room.players.push(ws);
                    availableRooms.delete(roomId);
                    console.log(`A player joined room ${roomId}`);

                    // Start the game when enough players
                    for (i=0; i<room.players.length; i++) {
                        room.players[i].send(JSON.stringify({
                            type: 'start',
                            data: {
                                player: i === 0 ? 'Odd' : 'Even',
                                squares: room.squares
                            }
                        }));
                    }
                }
                ws.roomId = roomId;
                break;
            case 'restart':
                console.log("Restart!");
                const currRoom = rooms.get(ws.roomId);
                currRoom.squares = Array(25).fill(0);

                // Start the game when enough players
                for (i=0; i<currRoom.players.length; i++) {
                    currRoom.players[i].send(JSON.stringify({
                        type: 'start',
                        data: {
                            player: i === 0 ? 'Odd' : 'Even',
                            squares: currRoom.squares
                        }
                    }));
                }
                break;
            case 'increment':
                const room = rooms.get(ws.roomId);
                room.squares[data.square] += 1;

                room.players.forEach((socket) => {
                    socket.send(JSON.stringify({
                        type: 'update',
                        data: {
                            square: data.square,
                            value: room.squares[data.square]
                        }
                    }))
                })

                const winner = calculateWinner(room.squares);
                if (winner) {
                    room.players.forEach((socket) => {
                        socket.send(JSON.stringify({
                            type: 'game_over',
                            data: {
                                winner
                            }
                        }))
                    })
                }
                break;
            default:
                break;
        }
    });

    ws.on('close', () => {
        const room = rooms.get(ws.roomId);
        if (!room) return;

        // Remove player
        room.players = room.players.filter(p => p !== ws);

        if (room.players.length === 0) {
        // Delete empty room
        rooms.delete(ws.roomId);
        availableRooms.delete(ws.roomId);
        console.log(`Room ${ws.roomId} deleted (empty)`);
        } else if (room.players.length === 1) {
            // Add back to available pool
            availableRooms.add(ws.roomId);
            const remaining = room.players[0];
            remaining.send(JSON.stringify({
                type: 'disconnect'
            }));
        }
    });
})