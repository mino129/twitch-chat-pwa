import React from "react";
import ChatUserInfo from "./chat-message/chat-message-user-info";
import ChatLine from "./chat-message/chat-message-line";

const ChatMessage = ({userstate, message}) =>{
    let usr_state = userstate[0];
    let usr_msg = userstate[1];
    return(
        <div className="chat-message">
            <ChatUserInfo userstate={usr_state} />
            <ChatLine userstate={usr_state}  message={usr_msg} />
        </div>
    )

}

export default ChatMessage