import {useEffect, useState} from "react";
import TrelloApi from "../services/trello-api";
import Card from "./Card";
import styles from './List.module.css'

export function List({data}) {

    const [cards, setCards] = useState([])

    useEffect(() => {
        TrelloApi.getMyCardsByList(data.id).then(setCards)
    }, [data.id])

    return <div className={styles.List} id={data.id}>
        <h4>{data.name}</h4>
        <div className="list-cards">
            {cards.map((card) => <Card data={card} key={card.id}/>)}
        </div>
    </div>
}
