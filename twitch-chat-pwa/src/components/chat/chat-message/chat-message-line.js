import React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const ChatLine = ({message, userstate}) =>{
    
    return(
        <div className="chat_line">
            <span className="message-content">
                { ReactHtmlParser(message) }
            </span>
        </div>
    )

}

export default ChatLine