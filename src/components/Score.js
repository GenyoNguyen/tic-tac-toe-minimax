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

function Score({ wins, draws, losses }) {
    return (
        <div className="score-container">
            <Square value={scoreFormat(wins, 'You')} />
            <Square value={scoreFormat(draws, 'Draw')} />
            <Square value={scoreFormat(losses, 'Bot')} />
        </div >
    )
}

export default Score;