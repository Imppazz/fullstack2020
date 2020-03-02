import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const statistics = () => {
    let sum = store.getState().good + store.getState().ok + store.getState().bad
    if (sum === 0) {
        return <p> no feedback given </p>
    } else {
      return (
        <div>
          <div>hyvä {store.getState().good}</div>
          <div>neutraali {store.getState().ok}</div>
          <div>huono {store.getState().bad}</div>
          <div>kaikki {sum}</div>
          <div>keskiarvo {(store.getState().good - store.getState().bad)/sum}</div>
          <div>positiivisia {100 * store.getState().good/sum + '%'}</div>
        </div>
      )
    }
  }

  return (
    <div>
      <h1> anna palautetta </h1>
      <button onClick={good}>hyvä</button> 
      <button onClick={ok}>neutraali</button> 
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>
      <h2> tilastoja </h2>
      {statistics()}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)