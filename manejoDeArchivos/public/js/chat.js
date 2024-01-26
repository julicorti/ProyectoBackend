const socket = io();
let userName;
swal.fire({
    title: "Ingrese su nombre",
    input: 'text',
    inputValidator: (value) =>{
        if(!value){
            return 'Tienes que ingresar tu nombre';
        }
    }

}).then(data =>{
    userName = data.value;
    socket.emit('newUser', userName);
    console.log(userName);
});
const inputData = document.getElementById('inputData');
const outPutData = document.getElementById('outputData');

inputData.addEventListener('keyup', (event) =>{

    if(event.key === 'Enter'){ 
        if(inputData.value.trim().length > 0){
            socket.emit('message', {user: userName, data: inputData.value})
        }
        inputData.value = ""
    }
}); 

socket.on('newConnection', data => {
    console.log(data)
});
socket.on('message', data => {
    outPutData.innerHTML += `${data.user} dice: ${data.data}<br />`
});
socket.on("loadMessages",data =>{
    let messages = '';
    data.forEach(message => {
        messages+=`${message.user} dice: ${message.data}<br />`
    })
    outPutData.innerHTML = messages;
})


socket.on('notification', user => {
    Swal.fire({
        text: `${user} se conecto`,
        toast: true, 
        position: 'top-right'
    })
})