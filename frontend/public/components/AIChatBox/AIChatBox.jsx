import { useState } from "react";
import "./AIChatBox.css"

const AIChatBox = () => {

    const [isOpenChatBox, setOpen] = useState(false);

    function openChatBox(event)
    {
        event.preventDefault();
        document.body.querySelector('.chatbox-open').style.display = 'none';
        document.body.querySelector('.chatbox-close').style.display= 'flex';
        document.body.querySelector('.chatbox-popup').style.display= 'flex';
        setOpen(true);
    }

    function closeChatBox(event)
    {
        event.preventDefault();
        document.body.querySelector('.chatbox-open').style.display = 'flex';
        document.body.querySelector('.chatbox-close').style.display= 'none';
        document.body.querySelector('.chatbox-popup').style.display= 'none';
        setOpen(false);
    }

    return (
        <div>
            <button class="chatbox-open" onClick={openChatBox}>
                <i class="fa fa-comment fa-2x" aria-hidden="true"></i>
            </button>
            <button class="chatbox-close" onClick={closeChatBox}>
                <i class="fa fa-close fa-2x" aria-hidden="true"></i>
            </button>
            <iframe class="chatbox-popup"
                    allow="microphone;"
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/3181cb48-6482-4154-8e23-d37917a28c67">
            </iframe>
        </div>
    )
}

export default AIChatBox;