import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

function sortAnecdotes(anecdotes) {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const votedAnecdote = state.find(anecdote => anecdote.id === action.payload)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id === action.payload ? changedAnecdote : anecdote)
      const sortedState = sortAnecdotes(newState)
      return sortedState
    },
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    // was not asked in the exercises, but without sorting during initialize, 
    // the anecdotes are in wrong order after refreshing the page
    const sortedAnecdotes = sortAnecdotes(anecdotes)
    dispatch(setAnecdotes(sortedAnecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(anecdote))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const votedAnecdote = state.anecdotes.find(anecdote => anecdote.id === id)
    await anecdoteService.updateAnecdote({ ...votedAnecdote, votes: votedAnecdote.votes + 1 })
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer
