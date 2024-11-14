// Importation des décorateurs et outils nécessaires pour utiliser TypeGraphQL.
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
// Importation de l'entité Ad qui représente une annonce.
import { Ad } from "../entities/Ad";

// INPUTTYPE : Permet de définir la structure des données que l'on peut envoyer dans les mutations.
// Ici, AdInput est utilisé pour créer une nouvelle annonce.
@InputType()
class AdInput {
  @Field() // Champ obligatoire
  title!: string;

  @Field() // Champ facultatif
  description?: string;

  @Field() // Champ obligatoire
  owner!: string;

  @Field() // Champ obligatoire
  price!: number;

  @Field() // Champ obligatoire
  picture!: string;

  @Field() // Champ obligatoire
  location!: string;
}

// PATCH : Un autre InputType utilisé pour la mise à jour partielle d'une annonce.
// Les champs sont tous facultatifs (nullable: true), car on peut modifier seulement certains champs.
@InputType()
class AdUpdateInput {
  @Field({ nullable: true }) // Champ facultatif
  title?: string;

  @Field({ nullable: true }) // Champ facultatif
  description?: string;

  @Field({ nullable: true }) // Champ facultatif
  owner?: string;

  @Field({ nullable: true }) // Champ facultatif
  price?: number;

  @Field({ nullable: true }) // Champ facultatif
  picture?: string;

  @Field({ nullable: true }) // Champ facultatif
  location?: string;
}

// RESOLVER : Le Resolver contient les méthodes qui permettent de répondre aux requêtes et mutations GraphQL.
// Ici, le Resolver est associé à l'entité Ad.
@Resolver(Ad)
export class AdResolver {
  // QUERY : Permet de récupérer des données. Ici, toutes les annonces.
  @Query(() => [Ad]) // Retourne une liste d'annonces.
  async getAds() {
    const ads = await Ad.find(); // Utilise TypeORM pour récupérer toutes les annonces dans la base de données.
    return ads;
  }

  // QUERY : Permet de récupérer une annonce spécifique par son ID.
  @Query(() => Ad) // Retourne une seule annonce.
  async getAdById(@Arg("adId") id: string) {
    const ad = await Ad.findOneByOrFail({ id }); // Trouve l'annonce ou lève une erreur si elle n'existe pas.
    return ad;
  }

  // MUTATION : Permet de modifier ou ajouter des données.

  //CREATE
  @Mutation(() => Ad) // Retourne l'annonce nouvellement créée.
  async createAd(
    @Arg("data") // Prend les données envoyées par le client sous forme d'un AdInput.
    { title, location, owner, picture, price, description }: AdInput
  ) {
    const ad = new Ad(); // Crée une nouvelle instance de l'entité Ad.
    ad.title = title;
    ad.location = location;
    ad.owner = owner;
    ad.picture = picture;
    ad.price = price;
    ad.description = description;
    await ad.save(); // Sauvegarde l'annonce dans la base de données.
    return ad; // Retourne l'annonce créée.
  }

  // MUTATION : Permet de supprimer une annonce par son ID.
  // DELETE (Suppression d'une annonce)=>Le but est de supprimer une annonce via son id
  // Étape 1 : Chercher l'entité avec findOneBy.
  // Étape 2 : Si elle existe, appeler remove().
  // Étape 3 : Retourner true si tout s'est bien passé, ou false si une erreur survient.

  @Mutation(() => Boolean) // Retourne true si la suppression réussit, false sinon.
  async deleteAd(@Arg("adId") id: string): Promise<boolean> {
    try {
      const ad = await Ad.findOneBy({ id }); // Cherche l'annonce par son ID.
      if (!ad) throw new Error("Ad not found"); // Erreur si l'annonce n'existe pas.
      await ad.remove(); // Supprime l'annonce.
      return true; // Retourne true pour indiquer que la suppression a réussi.
    } catch (error) {
      console.error(error); // Affiche l'erreur en console.
      return false; // Retourne false en cas d'erreur.
    }
  }
  // MUTATION : Permet de remplacer complètement une annonce (PUT).
  // PUT (Remplacement complet d'une annonce)
  // Le remplacement complet nécessite que l'utilisateur fournisse toutes les informations d'une annonce. Si des données manquent, on lève une erreur.
  // Étape 1 : Chercher l'annonce existante par son id.
  // Étape 2 : Remplacer toutes les propriétés de l'entité.
  // Étape 3 : Sauvegarder avec save().

  @Mutation(() => Ad) // Retourne l'annonce mise à jour.
  async updateAd(@Arg("adId") id: string, @Arg("data") { title, location, owner, picture, price, description }: AdInput): Promise<Ad> {
    const ad = await Ad.findOneBy({ id }); // Cherche l'annonce par son ID.
    if (!ad) throw new Error("Ad not found"); // Erreur si l'annonce n'existe pas.

    // Remplace toutes les données de l'annonce.
    ad.title = title;
    ad.location = location;
    ad.owner = owner;
    ad.picture = picture;
    ad.price = price;
    ad.description = description;

    await ad.save(); // Sauvegarde les changements dans la base de données.
    return ad; // Retourne l'annonce mise à jour.
  }

  // MUTATION : Permet de modifier partiellement une annonce (PATCH).
  // PATCH (Mise à jour partielle d'une annonce)
  // Pour une mise à jour partielle, on permet à l'utilisateur de passer uniquement les champs qu'il veut modifier. On utilise un Partial de TypeScript pour gérer cela :

  // Étape 1 : Utiliser AdUpdateInput pour accepter des champs facultatifs.
  // Étape 2 : Chercher l'entité.
  // Étape 3 : Utiliser Object.assign() pour appliquer uniquement les modifications fournies.
  // Étape 4 : Sauvegarder.

  @Mutation(() => Ad) // Retourne l'annonce mise à jour. // ID de l'annonce à mettre à jour.// Les champs à mettre à jour (tous facultatifs).
  async patchAd(@Arg("adId") id: string, @Arg("data") data: AdUpdateInput): Promise<Ad> {
    const ad = await Ad.findOneBy({ id }); // Cherche l'annonce par son ID.
    if (!ad) throw new Error("Ad not found"); // Erreur si l'annonce n'existe pas.

    Object.assign(ad, data); // Applique uniquement les champs fournis dans data.
    await ad.save(); // Sauvegarde les changements dans la base de données.
    return ad; // Retourne l'annonce mise à jour.
  }
}

// Explications
// Resolvers

// Ce sont les fonctions qui "résolvent" les requêtes ou mutations GraphQL.
// Ici, AdResolver contient les résolveurs pour gérer les annonces.
// Queries

// Ce sont des requêtes pour lire des données.
// Exemple : getAds et getAdById permettent de récupérer des annonces depuis la base de données.
// Mutations

// Ce sont des requêtes pour modifier ou ajouter des données.
// Exemple : createAd, deleteAd, updateAd, et patchAd permettent de manipuler les annonces dans la base de données.
// InputTypes

// Ce sont des objets qui définissent les données attendues par les mutations.
// AdInput est utilisé pour la création et la mise à jour complète.
// AdUpdateInput est utilisé pour la mise à jour partielle (PATCH).

//GPT>>> POURQUOI ON SEPARE LES MUTATIONS ?

//https://chatgpt.com/share/6735c64c-09cc-8004-98fe-b49a6c04edde
// C'est une excellente question ! Voici pourquoi on sépare les mutations en différentes fonctions au lieu de tout regrouper dans une seule :

// 1. Les opérations ont des finalités différentes
// Chaque mutation (createAd, deleteAd, updateAd, patchAd) correspond à une opération spécifique avec une finalité bien définie :

// createAd : Créer une nouvelle annonce.
// deleteAd : Supprimer une annonce existante.
// updateAd : Remplacer complètement une annonce.
// patchAd : Modifier partiellement une annonce.
// Regrouper toutes ces opérations dans une seule fonction rendrait le code moins clair, car une seule fonction devrait gérer plusieurs types de logique conditionnelle.

// 2. Séparation des responsabilités
// Chaque mutation doit faire une seule chose bien et être responsable d'une seule tâche. C'est un principe clé du développement logiciel appelé le Single Responsibility Principle (SRP). Cela rend le code :

// Plus facile à lire.
// Plus facile à maintenir.
// Moins sujet aux erreurs.

// 3. Complexité inutile si on regroupe tout
// Si tu combines toutes les opérations dans une seule mutation, tu devras introduire des paramètres supplémentaires pour indiquer quelle action effectuer (par exemple, un paramètre action ou des champs conditionnels). Cela rendra la mutation plus complexe à utiliser et à comprendre.
