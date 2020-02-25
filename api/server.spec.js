const request = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');
const Users = require('../users/users-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets');

const user = {
    username: "matt",
    password: "password"
};

let token;

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('Auth', () => {
        // it('should insert user', async () => {
        //     await Users.add({username:"matthew", password: "password"});
        //     const users = await db('users');
        //     expect(users).toHaveLength(1);
        // });

        // it('should delete user', async () => {
        //     await Users.remove(2)
        //     const users = await db('users');
        //     expect(users).toHaveLength(1);
        // });


    });
    describe('login', () => {
        it('should return a status of 201', async () => {
            const res = await request(server).post('/api/auth/register').send({username: 'username', password: 'password'});
            expect(res.status).toBe(201);
        });

        it('should return a status of 200', async () => {
            const res = await request(server).post('/api/auth/login').send(user);
            expect(res.status).toBe(200);
        });


    })
    // describe('GET Jokes', () => {
    //     it('should return a status of 200', async () => {
    //         // await Users.add({username: "matt", password: "password" });
    //         const res = await request(server).get('/api/jokes').set('Authorization', `Bearer ${token}`);
    //         expect(res.status).toBe(200);
    //     });

    //     it('should return json', async () => {
    //         const res = await request(server).get('/api/jokes');
    //         expect(res.type).toBe('application/json');
    //     });
    // })
});

// beforeEach((done) => {
//     request(server).post('/api/auth/login')
//         .send({username: 'matt', password: 'password'})
//         .end((err, response) => {
//             token = response.body.token; // save the token!
//             done();
//         });;
//     // await db('users').truncate();

//     // request(server).post('/api/auth/register').send({username: "matt", password: "password" });
//     // done();

//     // request(server).post('/api/auth/login').send({username: "matt", password: "password" })
        
// });
