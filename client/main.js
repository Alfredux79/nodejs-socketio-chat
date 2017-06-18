var socket = io.connect('http://192.168.1.21:6677',{'forecNew':true});

socket.on('messages',function(data){
    console.log(data); 
    render(data);
});

function render(data){
    var html = data.map(function(message,index){
        //ECMASCRIPT 6 - String interpolation
        return (`
            <div class="message">
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    var divMsgs = document.getElementById('messages');
    divMsgs.innerHTML = html;
    divMsgs.scrollTop = divMsgs.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}