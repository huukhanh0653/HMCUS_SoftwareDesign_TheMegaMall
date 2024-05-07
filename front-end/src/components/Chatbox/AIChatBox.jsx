import "./AIChatBox.css"

const AIChatBox = () => {
    function openChatBox(event) {
        event.preventDefault();
        document.body.querySelector('.chatbox-open').style.display = 'none';
        document.body.querySelector('.chatbox-close').style.display = 'flex';
        document.body.querySelector('.chatbox-popup').style.display = 'flex';

    }

    function closeChatBox(event) {
        event.preventDefault();
        document.body.querySelector('.chatbox-open').style.display = 'flex';
        document.body.querySelector('.chatbox-close').style.display = 'none';
        document.body.querySelector('.chatbox-popup').style.display = 'none';
    }

    return (
        <div>
            <button className="chatbox-open" onClick={openChatBox}>
                <i className="chatbox-open fa fa-comment fa-2x"></i>
            </button>
            <button className="chatbox-close" onClick={closeChatBox}>
                <i className="chatbox-close fa fa-comment fa-2x" style={{color: "#FFD43B",}}></i>
            </button>
            <iframe className="chatbox-popup"
                    allow="microphone;"
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/3181cb48-6482-4154-8e23-d37917a28c67">
            </iframe>
        </div>
    )
}

export default AIChatBox;