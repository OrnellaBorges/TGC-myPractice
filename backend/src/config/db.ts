import { DataSource } from "typeorm";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./wild.sqlite",
  entities: [Ad, Category],

  synchronize: false,
  migrations: ["./migrations/*.ts"],
  migrationsTableName: "migrations",
});
