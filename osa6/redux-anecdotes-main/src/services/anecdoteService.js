const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asObject(content))
  })

  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }

  return await response.json()
}

const updateAnecdote = async (anecdote) => {
  const response = await fetch(baseUrl.concat(`/${anecdote.id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await response.json()
}

export default { getAll, createNew, updateAnecdote }