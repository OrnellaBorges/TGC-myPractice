/* import { Router } from "express";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { In, Like } from "typeorm";

const adsRouter = Router()

adsRouter.get("/", async (req, res) => {
	const categoryId = Number(req.query.categoryId);
	const needle = req.query.needle
	let whereClause = {};
	if (categoryId)
		whereClause = {
			category: { id: categoryId },
		};
	if (needle)
		whereClause = { title: Like(`%${needle}%`) }
		
	try {
		const ads = await Ad.find({
			relations: {
				category: true,
				tags:true
			},
			where: whereClause,
		});
		return res.json(ads);
	} catch (err) {
		return res.status(500).send(err);
	}
});

adsRouter.get("/:id", async (req, res) => {
	const id = Number(req.params.id);
	try {
		const ad = await Ad.findOne({where: {id}, relations:{category:true,tags:true} });
		if (!ad) return res.status(404).send("Ad not found");
		return res.json(ad);
	} catch (err) {
		return res.status(500).send(err);
	}
});

adsRouter.delete("/:id", async (req, res) => {
	const id = Number(req.params.id);
	try {
		const ad = await Ad.findOneBy({ id });
		if (!ad) return res.status(404).send("Ad not found");
		ad.remove();
		return res.status(204).send();
	} catch (err) {
		return res.status(500).send(err);
	}
});

adsRouter.post("/", async (req, res) => {
	const {
		title,
		description,
		owner,
		price,
		createdAt,
		picture,
		location,
		categoryId,
		tagsIds
	} = req.body;
	try {
		const ad = new Ad();
		ad.title = title;
		ad.description = description;
		ad.owner = owner;
		ad.price = price;
		ad.createdAt = createdAt;
		ad.picture = picture;
		ad.location = location;

		const category = await Category.findOneBy({ id: categoryId });
		if (category) ad.category = category;
		else throw new Error()

		const tags = await Tag.find({
			where:{
				id: In(tagsIds)
			}
		})
		ad.tags=tags

		ad.save();
		return res.status(201).send();
	} catch (err) {
		return res.status(500).send(err);
	}
});

adsRouter.put("/:id", async (req, res) => {
	const {
		title,
		description,
		owner,
		price,
		createdAt,
		picture,
		location,
		categoryId,
		tagsIds
	} = req.body;
	const id=Number(req.params.id)
	try {
		const ad = await Ad.findOneBy({id});
		if(!ad) return res.status(404).send();
		ad.title = title;
		ad.description = description;
		ad.owner = owner;
		ad.price = price;
		ad.createdAt = createdAt;
		ad.picture = picture;
		ad.location = location;

		const category = await Category.findOneBy({ id: categoryId });
		if (category) ad.category = category;
		else throw new Error()

		const tags = await Tag.find({
			where:{
				id: In(tagsIds)
			}
		})
		ad.tags=tags
		
		ad.save();
		return res.status(200).send();
	} catch (err) {
		console.log(req.body)
		console.error(err)
		return res.status(500).send(err);
	}
});

export default adsRouter */
