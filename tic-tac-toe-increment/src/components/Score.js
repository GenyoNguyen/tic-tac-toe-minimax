import Square from "./Square"

const scoreFormat = (score, title) => {
    return (
        <div>
            <div className="score-title">
                {title}
            </div>
            <div className="score">
                {score}
            </div>
        </div>
    )
}

function Score({ wins, losses }) {
    return (
        <div className="score-container">
            <Square value={scoreFormat(wins, 'Wins')} />
            <Square value={scoreFormat(losses, 'Losses')} />
        </div >
    )
}

export default Score;