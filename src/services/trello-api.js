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

let memberPromiseMap = {}

const getMember = (id) => {
    if (memberPromiseMap[id] === undefined) {
        memberPromiseMap[id] = callApi("members/" + id);
    }
    return memberPromiseMap[id]
}
const _getMyCards = () => callApi('members/me/cards')
// return user boards with lists data and organization data
const _getMyBoards = () => callApi('members/me/boards', {lists: 'open', organization: true})

const _groupByKey = (datas, key, mapper = a => a) => datas.reduce((result, data) => {
    let value = data[key]
    result[value] = [...result[value] || [], mapper(data)];
    return result;
}, {})

const getHierarchy = async () => {
    // fetch all data from user
    const boards = await _getMyBoards()
    const cards = await _getMyCards()

    // inject all cards into lists
    const cardsByList = _groupByKey(cards, 'idList')
    const completeBoards = boards.map(board => {
        board.lists.forEach(list => {
            list.cards = cardsByList[list.id] || []
        })
        return board
    })
    // Build board map by organization id
    let boardsByOrganization = _groupByKey(completeBoards, 'idOrganization')
    // Inject all boards into organization
    let organizations = Object.keys(boardsByOrganization).reduce((total, orgaId) => {
        let orga = boardsByOrganization[orgaId][0].organization
        if (orga) {
            // if organization is not private, field is defined
            total.push({
                ...orga, boards: boardsByOrganization[orgaId]
            })
            // delete entry in map so we can handle boards with private organization
            delete boardsByOrganization[orga.id]
        }
        return total
    }, [])

    // Add boards were user is member, but not member's of the organization
    let leftBoards = Array.prototype.concat.apply([], Object.values(boardsByOrganization))
    if (leftBoards.length > 0) {
        organizations.push({
            id: 'private',
            displayName: 'Private Organization',
            boards: leftBoards
        })
    }
    return organizations
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getHierarchy,
    getMember
}
