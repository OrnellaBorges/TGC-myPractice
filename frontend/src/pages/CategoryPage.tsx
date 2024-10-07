import React, { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "../components/AdCard";
import { useParams } from "react-router-dom";
import axios from "axios";
//affiche toutes les annonces par rapport a la catégorie demandé
//dans le header

export default function CategoryPage() {
  const [ads, setAds] = useState<AdCardProps[]>([]);

  //recup id de la catégory sur laquelle on a cliqué dans l'url
  const { catId } = useParams();
  const params = useParams();
  //console.log("params", params);

  async function fetchData() {
    const { data } = await axios.get<AdCardProps[]>(
      `http://localhost:3000/ads?categoryId=${catId}`
    );
    console.log("data", data);
    setAds(data);
  }

  useEffect(() => {
    fetchData();
  }, [catId]);

  return (
    <div>
      <h2>CategoryPage</h2>
      <p>Voici les annonces de la catégorie #{catId}</p>
      <ul>
        {ads.map((ad, index) => (
          <li key={index}>{ad.title}</li>
        ))}
      </ul>
    </div>
  );
}
