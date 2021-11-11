import React, { useRef, useState } from 'react'
import Toggable from './Toggable'

export default function NoteForm ({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')
  const toggableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    toggableRef.current.toggleVisibility()
  }

  return (
    <Toggable buttonLabel='New Note' ref={toggableRef}>
      <h3>Create a new note</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Write your note content'
          onChange={handleChange}
          value={newNote}
        />
        <button type='submit'>
          Save
        </button>
      </form>
      <button onClick={handleLogout}>
        Logout
      </button>
    </Toggable>
  )
}
