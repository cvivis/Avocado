const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': $("#name").val()})
    });
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});

// insert into tbroadcast(status, title)
// values
// (false, "방송1"),
//     (false, "방송2"),
//     (false, "방송3"),
//     (false, "방송4"),
//     (false, "방송5");
//
// insert into live_auction(title,start_price, status, broadcastid)
// values
// ("경매1",1000, 0,1),
//     ("경매2",2000, 0,1),
//     ("경매3",3000, 0,1),
//     ("경매4",3000, 0,1),
//     ("경매5",3000, 0,2),
//     ("경매6",3000, 0,3);
//
// insert into member(email,nickname,password,role)
// values
// ("admin","관리자","$2a$10$gET1ZvsWnQU3CqdvyjWFZOWE.MehbonmgUAo3A.hJ694zJM8bKf/G","ADMIN");
//
// insert into member(email,nickname,password,role)
// values
// ("ssafy","김싸피","$2a$10$gET1ZvsWnQU3CqdvyjWFZOWE.MehbonmgUAo3A.hJ694zJM8bKf/G","USER");
