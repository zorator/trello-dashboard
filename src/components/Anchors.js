import {useEffect, useState} from "react";
import {Anchor} from "antd";

function Anchors({organizations}) {

    const [treeData, setTreeData] = useState([])

    useEffect(() => {
        setTreeData(organizations.map(orga => ({
            title: orga.displayName,
            key: orga.id,
            icon: 'icon-organization',
            children: orga.boards.map(board => ({
                title: board.name,
                key: board.id,
                icon: 'icon-board',
                children: board.lists.map(list => ({
                    title: list.name,
                    key: list.id,
                    icon: 'icon-list'
                }))
            }))
        })))
    }, [organizations])

    const renderLinks = (element) => <Anchor.Link key={element.key} href={`#${element.key}`}
                                                  style={{whiteSpace: 'normal'}}
                                                  title={<>
                                                      <span className={`badge-icon icon-sm ${element.icon}`}/> {element.title}
                                                  </>}>
        {(element.children || []).map(renderLinks)}
    </Anchor.Link>

    return <Anchor offsetTop={72}>
        {treeData.map(renderLinks)}
    </Anchor>
}

export default Anchors
