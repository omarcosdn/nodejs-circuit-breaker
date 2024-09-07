import { Request, Response } from "express";
import { HealthCheckController } from "../health-check.controller";

describe('HealthCheckController', () => {
    it('should return a 200 OK status', async () => {
        // Arrange
        const req = {} as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;

        // Act
        const controller = new HealthCheckController();
        await controller.handle(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            message: 'everything is fine'
        });
    });
})