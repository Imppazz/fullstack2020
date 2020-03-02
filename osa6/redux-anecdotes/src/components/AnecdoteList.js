import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage, hideMessage } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const voteAndMessage = (id, message) => {
    dispatch(vote(id))
    dispatch(setMessage(message))
    setTimeout(() => {
        dispatch(hideMessage())
    }, 5000)
  }

  return(
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAndMessage(anecdote.id, `you voted ${anecdote.content}`)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes