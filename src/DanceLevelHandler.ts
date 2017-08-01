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
      "sonic-dance",
      "smiley-dance",
      "dancing-brian",
      "dancing-cat",
      "dancing-homer",
      "dancing-kitten"
    ];
    var danceGifs = [
      "https://media.giphy.com/media/a8AXSGtbEl1du/giphy.gif",
      "https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.gif",
      "https://media.giphy.com/media/Nk9vmTrmOVNuw/giphy.gif",
      "https://media.giphy.com/media/eGwW26RL3PknC/giphy.gif",
      "https://media.giphy.com/media/JltOMwYmi0VrO/giphy.gif"
    ];
    var negativeDance = "https://media.giphy.com/media/149EV8wlV75ZQc/giphy.gif";
    var danceUSA = "https://media.giphy.com/media/JbjAX9pY1fLPi/giphy.gif";

    // Determine the dance level
    var level;
    if (req.body.text == null || req.body.text.length === 0) {
      level = 0;
    } else {
      var levelText = req.body.text.split(' ')[0];
      level = parseInt(levelText);
      if (levelText.toLowerCase() === "usa") {
        level = 123;
      } else if (isNaN(level)) {
        level = 0;
      }
    }

    // Determine the appropriate response
    if (level === -1) {
      res.json({
        response_type: "in_channel",
        attachments: [
          {
            "image_url": negativeDance
          }
        ]
      });
    } else if (level < 1) {
      res.json({
        text: `:${level0}:`
      });
      return;
    } else if (level === 10) {
      var gif = danceGifs[Math.floor(Math.random() * danceGifs.length)];
      res.json({
        response_type: "in_channel",
        attachments: [
          {
            "image_url": gif
          }
        ]
      });
    } else if (level === 123) {
      res.json({
        response_type: "in_channel",
        attachments: [
          {
            "image_url": danceUSA
          }
        ]
      });
    } else if (level <= 15) {
      var danceParty = "";
      for (var i = 0; i < level; i++) {
        danceParty += `:${dancers[Math.floor(Math.random() * dancers.length)]}:`;
      }
      res.json({
        response_type: "in_channel",
        text: danceParty
      });
    } else {
      res.json({
        text: "Dance level currently not supported, stay tuned for some increases to available dance levels in the near future"
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
