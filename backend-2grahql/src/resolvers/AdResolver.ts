import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";

@InputType()
class AdInput {
  @Field()
  title!: string;

  @Field()
  description?: string;

  @Field()
  owner!: string;

  @Field()
  price!: number;

  @Field()
  picture!: string;

  @Field()
  location!: string;
}

//concept de graphQL!
//On utilise des query uniquement pour recup de la data
@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async getAds() {
    const ads = await Ad.find();
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("adId") id: string) {
    const ad = await Ad.findOneByOrFail({ id });
    return ad;
  }

  //On utilise des mutations uniquement pour modifier, suprimmer etc
  @Mutation(() => Ad)
  async createAd(
    @Arg("data")
    { title, location, owner, picture, price, description }: AdInput
  ) {
    const ad = new Ad();
    ad.title = title;
    ad.location = location;
    ad.owner = owner;
    ad.picture = picture;
    ad.price = price;
    ad.description = description;
    await ad.save();
    return ad;
  }

  @Mutation(() => Boolean)
  async deleteAdbyId(@Arg("adId") id: string) {
    //Logique ici
    //soluce 1: plus court comme syntaxe
    return (await Ad.delete({ id })).affected; // affected?
    //soluce 2 : plus complet mais plus lent et gere les relations
    // const ad = await Ad.findOneByOrFail({id})
    // ad.remove()
    // return true;
  }

  //version 1 plus verbeuse
  @Mutation(() => Ad)
  async replaceV1AdbyId(
    @Arg("adId") id: string,
    @Arg("data")
    { title, location, owner, picture, price, description }: AdInput
  ) {
    //Logic ici
    const ad = await Ad.findOneByOrFail({ id });
    ad.title = title;
    ad.location = location;
    ad.owner = owner;
    ad.picture = picture;
    ad.price = price;
    ad.description = description;
    await ad.save();
    return ad;
  }
  //version 2 plus courte grace a data : AdInput
  @Mutation(() => Ad)
  async replaceV2AdbyId(@Arg("adId") id: string, @Arg("data") data: AdInput) {
    //Logic ici
    let ad = await Ad.findOneByOrFail({ id });
    ad = Object.assign(ad, data);
    await ad.save();
    return ad;
  }
}
