import {useEffect, useState} from "react";
import {Anchor} from "antd";

function AnchorsLink({element}) {
    return <Anchor.Link
        href={`#${element.key}`}
        style={{whiteSpace: 'normal'}}
        title={<>
            <span className={`badge-icon icon-sm ${element.icon}`}/> {element.title}
        </>}>
        {(element.children || []).map(child => <AnchorsLink key={child.key} element={child}/>)}
    </Anchor.Link>
}

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

    return <Anchor offsetTop={72}>
        {treeData.map(element => <AnchorsLink element={element} key={element.key} />)}
    </Anchor>
}

export default Anchors
