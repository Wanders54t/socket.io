// Importando o Express e o Socket.IO
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Criando o aplicativo Express
const app = express();

// Criando um servidor HTTP
const server = http.createServer(app);

// Inicializando o Socket.IO
const io = socketIo(server);

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;

// Servindo arquivos estáticos (se necessário)
app.use(express.static('public'));

// Evento de conexão com Socket.IO
io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    // Enviando uma mensagem para o cliente
    socket.emit('message', 'Bem-vindo ao chat!');

    // Recebendo mensagens do cliente
    socket.on('chatMessage', (msg) => {
        console.log('Mensagem recebida:', msg);
        io.emit('message', msg);  // Envia para todos os clientes conectados
    });

    // Evento de desconexão
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Iniciando o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
