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
                <div class="col-sm-10 offset-sm-1">
                    <li class="list-group-item active">Chat Room
                        <span class="badge badge-pill badge-danger ml-3">@{{ numberOfUsers }}</span>
                        <span class="btn btn-sm btn-warning float-right" @click="deleteSession">Delete Chat</span>
                    </li>
                    <ul class="list-group" v-chat-scroll>
                        <message
                            v-for="(text,index) in chat.message" :key="text.index"
                            :user="chat.user[index]"
                            :color="chat.color[index]"
                            :time="chat.time[index]">@{{ text }}
                        </message>
                    </ul>
                    <div class="badge badge-primary badge-pill">@{{ typing }}</div>
                    <input type="text" class="form-control mt-2" v-model="message" @keyup.enter="send" placeholder="Type your message.....">
                </div>

            </div>
        </div>
    </div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
