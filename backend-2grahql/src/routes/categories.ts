import { Router } from "express";
import { Category } from "../entities/Category";

const categoriesRouter = Router()

categoriesRouter.get("/", async (req, res) => {
	try {
		const categories = await Category.find();
		return res.json(categories);
	} catch (err) {
		return res.status(500).send(err);
	}
});
categoriesRouter.post("/", async (req, res) => {
	const {name} = req.body;
	try {
		const category = new Category();
		category.name = name;
		category.save();
		return res.status(201).send();
	} catch (err) {
		return res.status(500).send(err);
	}
});

export default categoriesRouter