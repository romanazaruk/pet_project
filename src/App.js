import React from 'react'
import MessageList from './components/MessageList'
import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
} from "@pusher/chatkit-client-react"

const tokenProvider = new TokenProvider({
  url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f6e48234-feb2-4442-840a-cc2a687f5a37/token",
});

const instanceLocator = "v1:us1:f6e48234-feb2-4442-840a-cc2a687f5a37"
const userId = "Roksi"

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <MessageList />
        <ChatkitProvider
          instanceLocator={instanceLocator}
          tokenProvider={tokenProvider}
          userId={userId}
        >
          <WelcomeMessage />
        </ChatkitProvider>
      </div>
    )
  }
}

const WelcomeMessage = withChatkit(props => {
  const chatManager = props.chatkit.chatManager;

  if (chatManager) {
    chatManager.connect()
      .then(currentUser => {
        console.log("SUCK-SESS");
        console.log(currentUser);
        
        currentUser.subscribeToRoomMultipart({
          roomId: "96f76fb9-527d-4b07-b8b5-437ae0555cb9",
          hooks: {
            onMessage: message => {
              console.log("received message", message.parts.map(e => e.payload.content).join(" "))
            }
          },
          messageLimit: 10
        })
      })
  }

  return (
    <div>
      {props.chatkit.isLoading
        ? 'Connecting to Chatkit...'
        : `Hello ${props.chatkit.currentUser.name}!`}
    </div>
  );
});




export default App;