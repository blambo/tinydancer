import { Request, Response, NextFunction, Router } from 'express';

export class DanceLevelRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public about(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: 'Tiny Dancer Server'
    });
  }

  public giveDancers(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    res.json({});
  }

  init() {
    this.router.get('/', this.about);
    this.router.post('/level', this.giveDancers);
  }
}

const danceLevelRoutes = new DanceLevelRouter();

export default danceLevelRoutes.router;
