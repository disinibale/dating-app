import request from 'supertest';
import { Express } from 'express';

import createServer from '../server';
import UserSubscriptions from '../models/userSubscription.model';
import userSubscriptionsService from '../app/services/userSubscriptions.service';

describe('Subscription API', () => {
    let app: Express
    let authToken: string = ''

    beforeAll(async () => {
        app = await createServer()

        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'bale@mail.com',
            password: 'password'
        })

        authToken = response.body.data.token
    }, 10000);

    afterAll(async () => {
        await userSubscriptionsService.delete({ where: {} })
    });

    test('Can view all premium package', async () => {
        const response = await request(app).get('/api/v1/subscription')

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Success')
        expect(response.body).toEqual<UserSubscriptions[]>
    })

    test('Prevent invalid price', async () => {
        const response = await request(app).post('/api/v1/subscription/purchase').set('Authorization', `Bearer ${authToken}`).send({
            premiumPackageId: 1,
            price: 100
        })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('Request price is incorrect')
    })

    test('Can purchase a unlimited swipe', async () => {
        const response = await request(app).post('/api/v1/subscription/purchase').set('Authorization', `Bearer ${authToken}`).send({
            premiumPackageId: 1,
            price: 120000
        })

        console.error(response.body.error)

        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Package purchased')
    })

    test('Prevent purchasing the same package', async () => {
        const response = await request(app).post('/api/v1/subscription/purchase').set('Authorization', `Bearer ${authToken}`).send({
            premiumPackageId: 1,
            price: 120000
        })

        expect(response.statusCode).toBe(409)
        expect(response.body.error).toBe('User has bought this Premium Packages')
    })

    test('Can purchase verified badge', async () => {
        const response = await request(app).post('/api/v1/subscription/purchase').set('Authorization', `Bearer ${authToken}`).send({
            premiumPackageId: 2,
            price: 50000
        })

        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Package purchased')
    })

    test('Prevent picking package is not exist if user send invalid package id', async () => {
        const response = await request(app).post('/api/v1/subscription/purchase').set('Authorization', `Bearer ${authToken}`).send({
            premiumPackageId: 3,
            price: 50000
        })

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('Premium Package not exist!')
    })
});