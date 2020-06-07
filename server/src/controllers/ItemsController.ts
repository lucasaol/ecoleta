import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
    async index(request: Request, response: Response) {
        const items = await knex("items").select("*");

        const serializedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.22:3333/uploads/${item.image}`,
            };
        });

        response.json(serializedItems);
    }

    async create(request: Request, response: Response) {
        const {title, image} = request.body;
        const item = {
            title,
            image
        };

        const insertedItem = await knex('items').insert(item);

        const itemId = insertedItem[0];

        response.json({
            id: itemId,
            ...item
        });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const item = await knex("items").where("id", id).first();

        if (!item) {
            return response.status(400).json({ message: "item not found" });
        }

        await knex("items").where('id', id).delete();

        response.json({success: true});
    }
}

export default ItemsController;