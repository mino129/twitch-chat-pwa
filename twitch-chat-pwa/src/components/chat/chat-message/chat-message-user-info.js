import React from "react";

const ChatUserInfo = ({userstate}) =>{
    
    return(
        <div className="chat_user_info">
            <span className="user-info" style={{color: userstate.color}}>
                {userstate["display-name"]}
            </span>
        </div>
    )

}

export default ChatUserInfo