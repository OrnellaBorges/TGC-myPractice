import AdCard, { AdCardProps } from "./AdCard";
//import ads from "../data/ads.json"; // mock
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Categories";
import AdCreateForm from "../pages/AdCreateForm";

function RecentAds() {
  const [recentAds, setRecentAds] = useState<AdCardProps[]>([]);

  const fetchRecentAds = async () => {
    try {
      //destrcturation de l'objet axios pour extraire que data
      const { data } = await axios.get<AdCardProps[]>(
        "http://localhost:3000/ads"
      );
      //console.log("data", data);

      setRecentAds(data);
    } catch {
      console.log("le catch a detecté une erreur");
    }
  };

  useEffect(() => {
    //la fonction fetchData s'execute ici au montage du composant
    fetchRecentAds();
  }, []);

  return (
    <>
      <h2>Annonces récentes (practice)</h2>
      <section className="recent-ads">
        {recentAds.map((ad) => (
          <AdCard
            key={ad.id}
            id={ad.id}
            picture={ad.picture}
            title={ad.title}
            price={ad.price}
          />
        ))}
      </section>
      <Categories />
      <AdCreateForm />
    </>
  );
}

export default RecentAds;
