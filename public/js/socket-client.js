
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMsg    = document.querySelector('#txtMsg');
const btnEnviar = document.querySelector('#btnEnviar');




const socket = io();

socket.on('connect', () => {

    console.log('Conectado al server');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('send-msg', (payload) => {

    console.log('Mensaje recibido del server');
    console.log(payload);

});

socket.on('disconnect', () => {

    console.log('Desconectado del server');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';

});

btnEnviar.addEventListener( 'click', () => {

    const msg = txtMsg.value;
    const payload = {
        msg,
        id: 'id-cliente'
    }

    socket.emit('send-msg', payload);

})