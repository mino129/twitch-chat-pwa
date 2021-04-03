import React, { useState, useEffect, useRef } from "react";
import  ChatMessage from "./chat/chat-message";
import ChatInput from "./chat/chat-input/chat-input";
import {fetcher, memoiseRoomAndAddEmotes, formatEmotes} from "../helpers/emotes/emotes";
const { EmoteParser } = require('@mkody/twitch-emoticons');

const parser = new EmoteParser(fetcher, {
    type: 'html',
    match: /(\w+)/g
});

fetch("https://api.frankerfacez.com/v1/user/39daph").then(function(response) {
    return response.json();
  }).then(function(data) {
    let chat_room_id = data.user.twitch_id;
    memoiseRoomAndAddEmotes(chat_room_id);
  }).catch(function() {
    console.log("Failed to get chatinfo");
});

const tmi = require('tmi.js');
const options = {
    options: {
        clientId: "s1zchsh3ith4zr3vk1a8mxhpz0oaqv",
        debug: true
    }, 
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: "ttmino_",
        password: "oauth:c1jrg54cqgilyzlmkl6tufi2w5148z"
    },
    channels: [ "#39daph" ]
};

const client = new tmi.client(options);

client.connect().catch(console.error);

const Chat = () =>{
    //  create state for the messages
    const [messages, setMessages] = useState([])
    const ChatWrapper = useRef(null);

    useEffect(() => {

        ChatWrapper.current.scrollIntoView({block: "end" });

        // set up a listener
        const listener = (channel, userstate, message, self) => {
            fetcher.fetchTwitchEmotes(null).then(() => {
                let parsed_message = parser.parse(formatEmotes(message,userstate.emotes));
                setMessages((messages) => [...messages, [userstate,parsed_message]])
            });
        }
        client.on("chat", listener)

        // need to clean up the listener
        return () => {
            client.off("chat", listener)
        }
    })
    
    return (
        <div className="chat-main" ref={ChatWrapper}>
            {/* render a Chat_message for each message */}
            {messages.map((userstate, message) => (
                <ChatMessage userstate={userstate} message={message} />
            ))}
            <ChatInput client={client} channel={options.channels[0]} />
        </div>
    )
}

export default Chat