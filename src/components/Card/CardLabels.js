const labelOrder = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'pink', 'sky', 'lime', 'black']
const labelSorter = labels => {
    let result = labels || []
    result.sort((a, b) => labelOrder.indexOf(a.color) - labelOrder.indexOf(b.color))
    return result
}

function CardLabels({labels}) {

    const sortedLabels = labelSorter(labels)
    return <div className="list-card-labels">
        {sortedLabels.map(label =>
            <span key={label.id}
                  className={`card-label card-label-${label.color} mod-card-front`}
                  title={label.name}>
                    <span className="label-text">{label.name}</span>
                </span>)}
    </div>
}

export default CardLabels;
