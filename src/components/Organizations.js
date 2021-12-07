import {Result} from "antd";
import {Organization} from "./Organization";

function Organizations({organizations}) {
    return organizations.length === 0
        ? <Result
            title="No cards found, try adding some organizations / boards / lists from the filter panel"/>
        : organizations.map((organization) => <Organization key={organization.id}
                                                            data={organization}/>)
}

export default Organizations
