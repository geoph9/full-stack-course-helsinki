import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    anecdote.votes++
    const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE',
      data: { 
        id: updatedAnecdote.id, 
        newVotes: updatedAnecdote.votes
      }
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: action.data.newVotes}
      return state.map(a => a.id !== id ? a : changedAnecdote)
    default:
      return state
  }

}

export default anecdoteReducer