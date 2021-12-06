import Config from '../config'

const callApi = (url, config, params) => {
    const urlParams = new URLSearchParams({...params, key: Config.api_key, token: Config.api_token})
    return fetch(url + '?' + urlParams, {
        ...config,
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json());
}

let cardsPromise = undefined
let memberPromiseMap = {}

const getMember = (id) => {
    if (memberPromiseMap[id] === undefined) {
        memberPromiseMap[id] = callApi('https://api.trello.com/1/members/' + id)
    }
    return memberPromiseMap[id]
}
const getMyCards = () => {
    if (cardsPromise === undefined) {
        cardsPromise = callApi('https://api.trello.com/1/members/me/cards')
    }
    return cardsPromise
}
const getMyBoards = () => callApi('https://api.trello.com/1/members/me/boards', {}, {
    lists: 'open'
})
const getMyOrganizations = () => callApi('https://api.trello.com/1/members/me/organizations')
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
