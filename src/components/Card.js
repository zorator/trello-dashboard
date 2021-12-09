import styles from './Card.module.css'
import TrelloApi from "../services/trello-api";
import {useEffect, useState} from "react";

const labelOrder = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'pink', 'sky', 'lime', 'black']
const labelSorter = labels => {
    let result = labels || []
    result.sort((a, b) => labelOrder.indexOf(a.color) - labelOrder.indexOf(b.color))
    return result
}

function Card({data, list, isFirst}) {

    const [members, setMembers] = useState([])

    useEffect(() => {
        Promise.all(data.idMembers.map(TrelloApi.getMember)).then(setMembers)
    }, [data.idMembers])

    const labels = labelSorter(data.labels)
    return (
        <a className={[styles.Card, "list-card"].join(' ')} href={data.url} target="_blank" rel="noreferrer">
            <div className="list-card-details" id={isFirst ? list.id : null}>
                <div className="list-card-labels">
                    {labels.map(label => <span key={label.id}
                                               className={`card-label card-label-${label.color} mod-card-front`}
                                               title={label.name}>
                    <span className="label-text">{label.name}</span>
                </span>)}
                </div>
                <span className="list-card-title" dir="auto">{data.name}</span>
                {/*<div className="badges">
                    <span className="js-badges">
                        <div className="badge js-checkitems-badge" title="Éléments de checklist">
                        <span className="badge-icon icon-sm icon-checklist"/>
                        <span className="badge-text js-checkitems-badge-text">0/3</span>
                    </div>
                    </span>
                </div>*/}
                <div className="list-card-members">
                    {members.map(member => <div key={member.id} className="member">
                            {member.avatarUrl ? <img
                                    className="member-avatar" height="30" width="30"
                                    src={`${member.avatarUrl}/30.png`}
                                    alt={`${member.fullName} (${member.username})`}
                                    title={`${member.fullName} (${member.username})`}/>
                                : <span className="member-initials"
                                        title={`${member.fullName} (${member.username})`}
                                        aria-label={`${member.fullName} (${member.username})`}>{member.initials}</span>
                            }
                        </div>
                    )}
                </div>
                {list ? <div className={styles.CardListName}>
                    <span className="badge-icon icon-sm icon-list"/> {list.name}
                </div> : null}
            </div>
        </a>
    );
}

export default Card;
