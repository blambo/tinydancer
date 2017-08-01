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
    var level0 = "eyeroll";
    var dancers = [
      "disco-dance",
      "hamster_dance",
      "mario-luigi-dance",
      "panda_dance",
      "partycow",
      "shark-dance",
      "sonic-dance"
    ];

    // Determine the dance level
    var level;
    if (req.body.text == null || req.body.text.length === 0) {
      level = 0;
    } else {
      var levelText = req.body.text.split(' ')[0];
      level = parseInt(levelText);
      if (isNaN(level)) {
        level = 0;
      }
    }

    // Determine the appropriate response
    if (level < 1) {
      res.json({
        text: `:${level0}:`
      });
      return;
    } else if (level <= dancers.length) {
      var danceParty = "";
      for (var i = 0; i < level; i++) {
        danceParty += `:${dancers[i]}:`;
      }
      res.json({
        response_type: "in_channel",
        text: danceParty
      });
    } else {
      res.json({
        text: "Dance level currently too high, stay tuned for some increases to available dance levels in the near future"
      });
    }
  }

  init() {
    this.router.get('/', this.about);
    this.router.post('/level', this.giveDancers);
  }
}

const danceLevelRoutes = new DanceLevelRouter();

export default danceLevelRoutes.router;
