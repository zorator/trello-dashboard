import {useEffect, useState} from "react";
import TrelloApi from './services/trello-api'
import {Organization} from "./components/Organization";
import {Anchor, Layout} from "antd";
import NavBar from "./components/NavBar";
import TrelloClient from "react-trello-client";
import Config from './config'

const renderLinks = (element) => <Anchor.Link key={element.id} href={`#${element.id}`}
                                              style={{whiteSpace: 'normal'}}
                                              title={element.displayName || element.name}>
    {(element.boards || element.lists || []).map(renderLinks)}
</Anchor.Link>

function App() {

    const [organizations, setOrganization] = useState([])
    const [filteredOrganization, setFilteredOrganizations] = useState([])

    useEffect(() => {
        TrelloApi.getHierarchy().then(setOrganization)
    }, [])

    return (
        <Layout>
            <Layout.Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>>
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
                <NavBar organizations={organizations} onFilterChange={setFilteredOrganizations}/>
            </Layout.Header>
            <Layout style={{marginTop: 64}}>
                <Layout.Sider style={{padding: 8, background: '#fff'}}>
                    <Anchor offsetTop={72}>
                        {filteredOrganization.map(renderLinks)}
                    </Anchor>
                </Layout.Sider>
                <Layout style={{padding: 8}}>
                    <Layout.Content className="body-card-label-text">
                        {filteredOrganization.map((organization) => <Organization key={organization.id}
                                                                                  data={organization}/>)}
                    </Layout.Content>
                    <Layout.Footer>
                        Made with 🍺 by <a href="https://github.com/zorator/trello-dashboard">@zorator</a>
                    </Layout.Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;
