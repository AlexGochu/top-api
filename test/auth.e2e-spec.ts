import { AuthDto } from '../src/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';


const loginDto: AuthDto = {
	login: 'a@a.com',
	password: '1'
};


describe('AuthController (e2e)', () => {
	let app: INestApplication;
	//let createdId: string;
	//let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail password', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '11' })
			.expect(401, {
				statusCode: 401,
				message: 'Wrong password',
				error: 'Unauthorized'
			});
	});

	it('/auth/login (POST) - fail login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'a2@a2.com' })
			.expect(401, {
				statusCode: 401,
				message: 'This user not found',
				error: 'Unauthorized'
			});

	});

	afterAll(() => {
		disconnect();
	});
});
