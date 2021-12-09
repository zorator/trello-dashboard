import styles from './Card.module.css'
import CardMembers from "./CardMembers";
import CardLabels from "./CardLabels";

function Card({data, list, isFirst}) {

    return <a className={["list-card", styles.Card].join(' ')}
              href={data.url} target="_blank" rel="noreferrer">
        <div className="list-card-details" id={isFirst ? list.id : null}>
            <CardLabels labels={data.labels}/>
            <span className="list-card-title" dir="auto">{data.name}</span>
            <CardMembers idMembers={data.idMembers}/>
            {list ? <div className={styles.CardListName}>
                <span className="badge-icon icon-sm icon-list"/> {list.name}
            </div> : null}
        </div>
    </a>
}

export default Card;
