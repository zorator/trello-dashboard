import {useEffect, useState} from "react";
import TrelloApi from './services/trello-api'
import {Layout, Skeleton} from "antd";
import NavBar from "./components/NavBar";
import Anchors from "./components/Anchors";
import Organizations from "./components/Organizations";

function App() {

    const [loading, setLoading] = useState(true)
    const [organizations, setOrganization] = useState([])
    const [filteredOrganization, setFilteredOrganizations] = useState([])

    useEffect(() => {
        TrelloApi.getHierarchy().then(list => {
            setOrganization(list)
            setLoading(false)
        })
    }, [])

    return (
        <Layout>
            <Layout.Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <NavBar organizations={organizations} onFilterChange={setFilteredOrganizations}/>
            </Layout.Header>
            <Layout style={{marginTop: 64, minHeight: 'calc(100vh - 64px)'}}>
                <Layout.Sider style={{padding: 8, background: '#fff'}}>
                    <Anchors organizations={filteredOrganization}/>
                </Layout.Sider>
                <Layout>
                    <Layout.Content className="body-card-label-text" style={{padding: 8}}>
                        <Skeleton active loading={loading}>
                            <Organizations organizations={filteredOrganization} loading={loading}/>
                        </Skeleton>
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
