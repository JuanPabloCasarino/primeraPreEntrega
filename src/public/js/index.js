const socket =io();

const botonEliminar = document.getElementById('eliminar')

botonEliminar.addEventListener('click', ()=>{
    console.log('hola')
    socket.emit('newProduct','id')
})