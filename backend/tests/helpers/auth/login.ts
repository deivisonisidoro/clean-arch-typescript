import request from 'supertest'
import { app } from "../../../src/presentation/express/settings/app";
import { ICreateUserRequestDTO } from '../../../src/domain/dtos/User/CreateUser';

export async function login(userData: ICreateUserRequestDTO){
  const response = await request(app).post('/authenticate/login').send({
    password: userData.password,
    email: userData.email,
  })

  return response.body.token
}
