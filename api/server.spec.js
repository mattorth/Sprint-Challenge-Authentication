const request = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');
const Users = require('../users/users-model');

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('Auth', () => {
        it('should insert user', async () => {
            await Users.add({username:"matthew", password: "password"});
            const users = await db('users');
            expect(users).toHaveLength(1);
        });

        it('should delete user', async () => {
            await Users.remove(1)
            const users = await db('users');
            expect(users).toHaveLength(0);
        });

        // describe('login', () => {
        //     it('should return a status of 200', () => {
        //         const res = await request(server).get('/api/auth/login');
        //         expect(res.status).toBe(200);
        //     })
        // })
    });

    describe('GET Jokes', () => {
        // it('should return a status of 200', async () => {
        //     // await Users.add({username: "matt", password: "password" });
        //     const res = await request(server).get('/api/jokes');
        //     expect(res.status).toBe(200);
        // });

        it('should return json', async () => {
            const res = await request(server).get('/api/jokes');
            expect(res.type).toBe('application/json');
        });
    })
});

// beforeEach(async (done) => {
//     await db('users').truncate();
//     // request(server).post('/api/auth/register').send({username: "matt", password: "password" });
//     // done();

//     // request(server).post('/api/auth/login').send({username: "matt", password: "password" })
        
// });