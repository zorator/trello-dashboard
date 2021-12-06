import {Board} from "./Board";
import styles from './Organization.module.css'

export function Organization({data}) {

    return <div className={styles.Organization} id={data.id}>
        <h2><a href={data.url} target="_blank" rel="noreferrer">{data.displayName}</a></h2>
        {data.boards.map((board) => <Board key={board.id} data={board}/>)}
    </div>
}
