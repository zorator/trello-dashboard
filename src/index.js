import React from 'react';
import ReactDOM from 'react-dom';
import './trello.css';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import Config from "./config";
import TrelloClient from "react-trello-client";

ReactDOM.render(
    <React.StrictMode>
        <TrelloClient
            apiKey={Config.api_key}
            clientVersion={1}
            apiEndpoint="https://api.trello.com"
            authEndpoint="https://trello.com"
            intentEndpoint="https://trello.com"
            authorizeName="Trello Dashboard"
            authorizeType="redirect"
            authorizeOnSuccess={() => console.log('Login successful!')}
            authorizeOnError={() => console.log('Login error!')}
            autoAuthorize={true}
        />
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
