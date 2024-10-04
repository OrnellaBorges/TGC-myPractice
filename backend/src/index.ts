import "reflect-metadata";
import express from "express";
//import sqlite3 from "sqlite3";
import { dataSource } from "./config/db";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import cors from "cors";
import { Tag } from "./entities/Tag";

//const db = new sqlite3.Database("./the-good-corner.sqlite");

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//recup toutes les Categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories.length) return res.status(404).send("No Categories found");
    return res.json(categories);
  } catch (err) {
    return res.status(500).send(err);
  }
});

//recup tous les Tags
app.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    if (!tags.length) return res.status(404).send("No Tags found");
    return res.json(tags);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// route pour creer un nouveau tag
app.post("/newTag", async (req, res) => {
  const { name } = req.body;
  try {
    const tag = new Tag();
    tag.name = name;
    tag.save();
    return res.status(201).send();
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get("/ads", async (req, res) => {
  const categoryId = Number(req.query.categoryId);
  let whereClause = {};
  if (categoryId)
    whereClause = {
      category: { id: categoryId },
    };
  try {
    const ads = await Ad.find({
      relations: {
        category: true,
      },
      where: whereClause,
    });
    if (!ads.length) return res.status(404).send("No Ads found");
    return res.json(ads);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get("/ads/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const ad = await Ad.findOneBy({ id });
    if (!ad) return res.status(404).send("Ad not found");
    return res.json(ad);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.delete("/ads/:id", async (req, res) => {
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

app.post("/ads", async (req, res) => {
  const {
    title,
    description,
    owner,
    price,
    createdAt,
    picture,
    location,
    categoryId,
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
    ad.save();
    return res.status(201).send();
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
