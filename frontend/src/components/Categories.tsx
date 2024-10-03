import axios from "axios";
import { useEffect, useState } from "react";

export type Category = {
  id: number;
  name: string;
};

export default function Categories() {
  // state
  const [categories, setCategories] = useState<Category[]>([]);
  const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);
  //fetch des category

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get<Category[]>(
        "http://localhost:3000/categories"
      );
      //console.log(data);
      setCategories(data);
      setIsErrorCatched(false);
    } catch (err) {
      console.log("error inner catch fetchCategories", err);
      setIsErrorCatched(true);
    }
  };

  useEffect(() => {
    console.log("first Render fetching categories");
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("categories state is fullfilled = ", categories);
  }, [categories]);

  return (
    <div>
      <h2>Listes des categories:</h2>

      {isErrorCatched && <li>ERROR : Liste des categories introuvables!</li>}

      {categories && !isErrorCatched && (
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
