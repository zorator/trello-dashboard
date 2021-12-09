import styles from './Board.module.css'
import Card from "./Card/Card";

function Board({data}) {
    return <div className={styles.Board} id={data.id}>
        <h3><span className="badge-icon icon-sm icon-board"/> <a href={data.url} target="_blank"
                                                                 rel="noreferrer">{data.name}</a></h3>
        <div className={styles.cardContainer}>
            {data.lists.flatMap(list =>
                list.cards.map((card, index) =>
                    <Card data={card} list={list} isFirst={index === 0} key={card.id}/>
                )
            )}
        </div>
    </div>
}


export default Board;
