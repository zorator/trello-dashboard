import TrelloApi from "../../services/trello-api";
import {useEffect, useState} from "react";


function CardMembers({idMembers}) {

    const [members, setMembers] = useState([])

    useEffect(() => {
        Promise.all(idMembers.map(TrelloApi.getMember)).then(setMembers)
    }, [idMembers])

    return <div className="list-card-members">
        {members.map(member =>
            <div key={member.id} className="member">
                {member.avatarUrl
                    ? <img
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
}

export default CardMembers;
