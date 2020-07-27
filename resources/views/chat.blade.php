<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Real Time Chat</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .list-group {
            overflow-y: scroll;
            height: 200px;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <li class="list-group-item active">Chat Room</li>
                    <ul class="list-group" v-chat-scroll>
                        <message v-for="(text,index) in chat.message" :key="text.index" color="success" :user="chat.user[index]" :color="chat.color[index]">@{{ text }}</message>
                    </ul>
                    <input type="text" class="form-control" v-model="message" @keyup.enter="send" placeholder="Type your message.....">
                </div>

            </div>
        </div>
    </div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
