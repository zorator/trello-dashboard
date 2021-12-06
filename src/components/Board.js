import {List} from "./List";
import styles from './Board.module.css'

export function Board({data}) {

    return <div className={styles.Board} id={data.id}>
        <h3><a href={data.url} target="_blank" rel="noreferrer">{data.name}</a></h3>
        <div className={styles.listContainer}>
            {data.lists.map((list) => <List data={list} key={list.id}/>)}
        </div>
    </div>
}
