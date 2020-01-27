import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => (
    <tr>
        <td>{props.type}</td>
        <td>{props.value}</td>
    </tr>
)
const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)
const Statistics = (props) => {
    if (props.all === 0) {
        return <p> no feedback given </p>
    } else {
        return (
            <table> 
                <tbody>            
                <StatisticLine type="good:" value={props.good} />
                <StatisticLine type="neutral:" value={props.neutral} />
                <StatisticLine type="bad:" value={props.bad} />
                <StatisticLine type="all:" value={props.all} />
                <StatisticLine type="average:" value={(props.good - props.bad) / props.all} />
                <StatisticLine type="positive:" value={100 * props.good / props.all + ' %'} />
                </tbody>  
            </table>
        )
    }
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    var all = good + neutral + bad

    return (
        <div>
            <h1> give feedback </h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <h1> statistics </h1>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
