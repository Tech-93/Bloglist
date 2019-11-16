const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})

    let userObject1 = new User(helper.initialUsers[0])
    await userObject1.save()

    let userObject2 = new User(helper.initialUsers[1])
    await userObject2.save()

})

test('users are returned as json', async () => {
    await api.get('/api/users')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('if new user is successfully adde', async () => {
    const newUser = {
        username: 'newby',
        name: 'new user',
        password: 'doesnotmatter'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-type', /application\/json/)

})

test('creation should fail if username is already taken', async () => {
    const newUser = {
        username: 'fartface',
        name: 'Didzis',
        password: 'secret'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('creaton should fail if username is to short', async () => {
    const newUser = {
        username: 'ha',
        name: 'ahahah',
        password: 'laugh'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('creaton should fail if password is either missing or too short', async () => {
    const newUser = {
        username: 'fart',
        name: 'Fart',
        password: 'fa'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})