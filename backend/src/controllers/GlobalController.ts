import { Request, Response } from "express";

export class GlobalController {
  request: Request;
  response: Response;

  constructor(req: Request, res: Response) {
    this.request = req;
    this.response = res;
  }
}