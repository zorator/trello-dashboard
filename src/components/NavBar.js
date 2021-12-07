import {useEffect, useState} from "react";
import {Button, Drawer, Tree} from "antd";
import useStorage from "../services/useStorage.hook";

function NavBar({organizations, onFilterChange}) {

    const [visible, setVisible] = useState(false)
    const [treeData, setTreeData] = useState([])
    const [filter, setFilter] = useStorage('filter', [])

    useEffect(() => {
        setTreeData(organizations.map(orga => ({
            title: <><span className="badge-icon icon-sm icon-organization"/> {orga.displayName}</>,
            key: orga.id,
            children: orga.boards.map(board => ({
                title: <><span className="badge-icon icon-sm icon-board"/> {board.name}</>,
                key: board.id,
                children: board.lists.map(list => ({
                    title: <><span className="badge-icon icon-sm icon-list"/> {list.name}</>,
                    key: list.id
                }))
            }))
        })))
    }, [organizations])

    useEffect(() => {
        onFilterChange(
            organizations.map(orga => ({
                ...orga, boards: orga.boards.map(board => ({
                    // filter lists and empty lists
                    ...board, lists: board.lists.filter(list => filter.includes(list.id))
                                          .filter(list => list.cards.length > 0)
                    // remove board without lists
                })).filter(board => board.lists.length > 0)
                // remove organization without boards
            })).filter(orga => orga.boards.length > 0)
        )
    }, [onFilterChange, filter, organizations])

    return <>
        <Button type="primary" onClick={() => setVisible(!visible)}>
            Open Filter
        </Button>
        <Drawer title="Filter" placement="left" onClose={() => setVisible(false)} visible={visible}>
            <Tree
                selectable={false}
                checkable
                checkedKeys={filter}
                onCheck={setFilter}
                treeData={treeData}
            />
        </Drawer>
    </>
}

export default NavBar
