import { NextFunction, Request, Response } from "express";

const getAll = (req: Request, res: Response, next: NextFunction) => {
  console.log("Get ALL");
};

const getById = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Get ${req.params.id}`);
};

const post = (req: Request, res: Response, next: NextFunction) => {
  console.log("post");
};

const put = (req: Request, res: Response, next: NextFunction) => {
  console.log("put");
};

const remove = (req: Request, res: Response, next: NextFunction) => {
  console.log("remove");
};

module.exports = {
  getAll,
  getById,
  post,
  remove,
  put,
};
