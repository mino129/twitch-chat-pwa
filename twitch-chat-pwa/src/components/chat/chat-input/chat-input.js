import React, {useRef} from "react";

const ChatInput = ({client, channel}) =>{

    const InputTextArea = useRef(null);

    const handleKeyDown = (event) => {
        
        if (event.key === 'Enter') {
            client.say(channel, event.target.value);
            event.preventDefault();
            InputTextArea.current.value = "";
        }
      }
    return(
        <div className="chat_input">
            <textarea ref={InputTextArea} id="chat-input" rows="4" cols="50" onKeyDown={handleKeyDown}></textarea>
        </div>
    )

}

export default ChatInput