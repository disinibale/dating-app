import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { Express } from 'express';

import { UserSwipeCreationAttributes } from '../models/interfaces/userSwipe.interface';
import Profile from '../models/profile.model';
import createServer from '../server';

import profileService from '../app/services/profile.service';
import userSwipeService from '../app/services/userSwipe.service';
import { Op } from 'sequelize';

describe('Profile Matching API', () => {
    let app: Express
    let authToken: string = ''
    const mockProfile: Profile[] = []
    let user: {
        userId: number
        email: string
        fullname: string
        iat: number
        exp: number
    }

    beforeAll(async () => {
        app = await createServer()

        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'bale@mail.com',
            password: 'password'
        })

        authToken = response.body.data.token
        user = jwt.decode(authToken) as {
            userId: number
            email: string
            fullname: string
            iat: number
            exp: number
        }

        for (let i = 0; i < 15; i++) {
            const createdMockData = await profileService.create({
                userId: i + 1 * 3,
                bio: faker.person.bio(),
                gender: Math.random() < 0.5 ? 'M' : 'F',
                dateOfBirth: faker.date.anytime()
            } as Profile)

            mockProfile.push(createdMockData)
        }


    }, 10000);

    afterAll(async () => {
        for (const data of mockProfile) {
            await profileService.delete({ where: { id: data.id } })
            await userSwipeService.delete({
                where: {
                    [Op.or]: {
                        profileId: {
                            [Op.eq]: data.id
                        },
                        userId: {
                            [Op.eq]: user?.userId
                        }
                    }
                }
            })
        }
    });

    test('Can browse potential match and showing profiles of user opposite gender', async () => {
        const response = await request(app).get('/api/v1/matching').set('Authorization', `Bearer ${authToken}`)
        expect(response.statusCode).toBe(200)
        expect(response).toBe<Array<Profile>>
        for (const data of response.body.data) {
            expect(data.id).not.toContainEqual({ userId: user?.userId })
        }
    })

    test('Can swipe right the potential match', async () => {
        const response = await request(app)
            .post('/api/v1/matching/swipe')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                isLiked: true,
                profileId: 10,
                userId: user?.userId
            })

        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Success')
    })

    test('Cannot swipe the same profile within the same day', async () => {
        const response = await request(app)
            .post('/api/v1/matching/swipe')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                isLiked: true,
                profileId: 10,
                userId: user?.userId
            })

        expect(response.statusCode).toBe(409)
        expect(response.body.error).toBe('This profile has already swiped today')
    })

    test('Can swipe left the potential match', async () => {
        const response = await request(app)
            .post('/api/v1/matching/swipe')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                isLiked: false,
                profileId: 15,
                userId: user?.userId
            })

        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Success')
    })

    test('Can only swipe for maximum 10 profile per days', async () => {
        // Clear User Swipe First
        await userSwipeService.delete({ where: {} })

        for (let i = 0; i < 10; i++) {
            await userSwipeService.create({ 
                isLiked: Math.random() < 0.5, 
                profileId: i + 1, 
                userId: user?.userId 
            } as UserSwipeCreationAttributes)
        }

        const response = await request(app)
            .post('/api/v1/matching/swipe')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                isLiked: false,
                profileId: 10 + 1,
            })
        expect(response.statusCode).toBe(403)
        expect(response.body.error).toBe('You have reached 10 swipe for today')
    })

});