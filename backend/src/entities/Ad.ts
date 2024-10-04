import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description?: string;

  @Column()
  owner!: string;

  @Column()
  price!: number;

  @Column()
  picture!: string;

  @Column()
  location!: string;

  /*  @Column()
  createdAt!: Date; */

  // Automatiquement remplie avec la date de création
  /*  @CreateDateColumn()
  createdAt!: Date;
 */
  //version du prof pour la date

  @Column()
  createdAt!: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }

  @ManyToOne(() => Category, (category) => category.ads)
  category!: Category;

  // Relation "many-to-many" avec l'entité Tag
  // Une annonce peut avoir plusieurs tags
  @ManyToMany(() => Tag, (tag) => tag.ads)
  // Utilisation de @JoinTable() pour créer la table de jonction entre `Ad` et `Tag`
  @JoinTable()
  tags!: Tag[];
}
