import request from 'supertest';
import { faker } from '@faker-js/faker';
import { Express } from 'express';

import createServer from '../server';

describe('Profile API', () => {
    let app: Express
    let authToken: string

    beforeAll(async () => {
        app = await createServer()

        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'bale@mail.com',
            password: 'password'
        })

        authToken = response.body.data.token
    }, 10000);

    afterAll(async () => {

    });

    test('should get the users own profile', async () => {
        const response = await request(app).get('/api/v1/profile').set('Authorization', `Bearer ${authToken}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Success');
        expect(response.body.data).toHaveProperty('userId');
        expect(response.body.data).toHaveProperty('email');
        expect(response.body.data).toHaveProperty('fullname');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('dateOfBirth');
        expect(response.body.data).toHaveProperty('bio');
        expect(response.body.data).toHaveProperty('gender');
    });

    test('should update the user\'s profile', async () => {
        const updatedProfileData = {
            bio: 'Updated bio',
            dateOfBirth: faker.date.anytime(),
            gender: Math.random() < 0.5 ? 'F' : 'M'
        };

        const response = await request(app)
            .put('/api/v1/profile')
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedProfileData)
            .expect(201);

        expect(response.body.message).toBe('Success');
        expect(response.body.code).toBe(201);
    });
});