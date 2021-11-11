const mongoose = require('mongoose')

const { server } = require('../index')
const Note = require('../models/Note')
const { api, initialNotes, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({}) // borramos todas las notas
  console.log('beforeEach')

  // parallel
  // const notesObjects = initialNotes.map(note => new Note(note))
  // const promises = notesObjects.map(note => note.save())
  // await Promise.all(promises)

  // sequential
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

describe('GET /api/notes', () => {
  test('notes are returned as json', async () => {
    console.log('test 1')
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('some note is helloooo', async () => {
    const { contents } = await getAllContentFromNotes()
    expect(contents).toContain('Holaaaaa')
  })
})

describe('POST /api/notes', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'carmen',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { contents, response } = await getAllContentFromNotes()

    expect(contents).toContain(newNote.content)
    expect(response.body).toHaveLength(initialNotes.length + 1)
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE /api/notes', () => {
  test('note can be deleted', async () => {
    const { response } = await getAllContentFromNotes()
    const { body: notes } = response // para cambiarle el nombre y llamarlo notes
    const [noteToDelete] = notes // asi asignamos a noteToDelete el primer elemento del array notes
    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const { contents, response: secondResponse } = await getAllContentFromNotes()
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)
  })

  test('a note can not be deleted', async () => {
    await api
      .delete('/api/notes/1234')
      .expect(400)

    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

// Para runnear solo un test usar npm run test -- -t "nombretest"

afterAll(() => {
  mongoose.disconnect()
  server.close()
})
