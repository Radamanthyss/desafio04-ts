import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Checa se vai estourar erro caso nao seja enviado name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest,mockResponse)
        expect(mockResponse.state.json).toMatchObject({message : 'Bad request! Name obrigatório'})
    })

    it('Checa se vai estourar erro caso nao seja enviado email', () => {
        const mockRequest = {
            body: {
                name: 'Tiao',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest,mockResponse)
        expect(mockResponse.state.json).toMatchObject({message : 'Bad request! Email obrigatório'})
    })

    it('deve retornar todos usuarios', () => {
        const mockRequest = {
            body: {
                name: 'Bruno',
                email: 'bruno@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve remover o ultimo registro salvo no db', () => {
        const mockRequest = {
            body: {}
        } as Request
        const mockResponse = makeMockResponse();
        userController.delete(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(200)
    })
})
