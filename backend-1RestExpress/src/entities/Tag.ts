import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Tag extends BaseEntity {
  // ID unique pour chaque tag (clé primaire)
  @PrimaryGeneratedColumn()
  id!: number;

  // Nom du tag
  @Column()
  name!: string;

  // Relation "many-to-many" avec l'entité Ad
  // Un tag peut être associé à plusieurs annonces
  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads!: Ad[];
}
