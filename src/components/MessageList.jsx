import React from 'react'

 let DataMessage = [
    {
        senderId: 'Tolik',
        text: 'hi'
    },
    {
        senderId: 'Hagrid',
        text: `hello!`
    },
    {
        senderId: 'Nazik',
        text: 'How r u ?'
    },
]


class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {DataMessage.map((message, index) => {
                    return (
                        <div key={index} className="message">
                            <div className="message-username">{message.senderId}</div>
                            <div className="message-text">>{message.text}</div>
                        </div>
                    )
                })}

            </div>
        )

    }
}

export default MessageList;