import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import { celebrate } from 'celebrate';
import Joi from '@hapi/joi';

const routes = express.Router();
const upload = multer(multerConfig);

/** ITEMS */
const itemsController = new ItemsController();
routes.get("/items", itemsController.index);
routes.post("/items", itemsController.create);
routes.delete("/items/:id", itemsController.delete);


/** POINTS */
const pointsController = new PointsController();
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.post(
    "/points",
    upload.single("image"),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        }),
    }),
    pointsController.create
);

export default routes;