import {Trello} from "react-trello-client";

// we keep this dirty way to call the api, because the lib can't handle custom query params nor Promises 😥
const callApi = (url, params) => {
    const urlParams = new URLSearchParams({...params, key: Trello.key(), token: Trello.token()})
    return fetch('https://api.trello.com/1/' + url + '?' + urlParams, {
        method: 'GET',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

let cardsPromise = undefined
let memberPromiseMap = {}

const getMember = (id) => {
    if (memberPromiseMap[id] === undefined) {
        memberPromiseMap[id] = callApi("members/" + id);
    }
    return memberPromiseMap[id]
}
const getMyCards = () => {
    if (cardsPromise === undefined) {
        cardsPromise = callApi('members/me/cards')
    }
    return cardsPromise
}

const getMyBoards = () => callApi('members/me/boards', {lists: 'open'})

const getMyOrganizations = () => callApi('members/me/organizations')
const getMyCardsByList = (idList) => getMyCards()
    .then(cards => cards.filter(card => card.idList === idList));

const getHierarchy = () => {
    return Promise.all([
        getMyOrganizations(), getMyBoards(), getMyCards()
    ]).then(([organizations, boards, cards]) => {
        const cardsByList = cards.reduce((result, card) => {
            result[card.idList] = [...result[card.idList] || [], card];
            return result;
        }, {})
        const boardsByOrganization = boards.reduce((result, board) => {
            board.lists.forEach(list => {
                list.cards = cardsByList[list.id] || []
            })
            result[board.idOrganization] = [...result[board.idOrganization] || [], board];
            return result;
        }, {})
        return organizations.map(org => {
            org.boards = boardsByOrganization[org.id] || []
            return org
        })
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getMyCards,
    getMyCardsByList,
    getHierarchy,
    getMember
}
