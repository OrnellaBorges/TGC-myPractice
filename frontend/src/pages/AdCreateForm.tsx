import { FormEvent, useEffect, useState } from "react";
import { Category } from "../components/Categories";
import axios from "axios";

export default function AdCreateForm() {
  //FORMULAIRE CREATION ANNONCE
  const [categories, setCategories] = useState<Category[]>([]);

  const formFields = [
    { label: "Titre", name: "title", type: "text" },
    { label: "Description", name: "description", type: "text" },
    { label: "Owner", name: "owner", type: "text" },
    { label: "Price", name: "price", type: "text" }, // Utiliser number pour le prix
    { label: "Picture", name: "picture", type: "text" }, // Utiliser url pour une image
    { label: "Location", name: "location", type: "text" },
  ];

  async function fetchCategories() {
    const { data } = await axios.get<Category[]>(
      "http://localhost:3000/categories"
    );
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // fonction pour recup les données front du form et envoyer au backend
  const handleSumitForm = (e: FormEvent) => {
    console.log("submit");
    //eviter comportement par défaut du formulaire
    e.preventDefault();

    //recup de l'event
    const form = e.target;
    // appel de l'api JS
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    //Envoi des datas front >>> back
    //!attention ne pas faire ça en vrai c'est juste basique pour le cours!!!
    //axios.post('urlDePost', formJson)
    axios.post("http://localhost:3000/ads", formJson);
  };

  return (
    <form onSubmit={handleSumitForm} className="form">
      {formFields.map((el, index) => (
        <label key={index}>
          {el.label}:
          <input className="text-field" name={el.name} type={el.type} />
        </label>
      ))}

      <select name="category">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="button">Create Ad</button>
    </form>
  );
}
