import { FormEvent, useEffect, useState } from "react";
import { Category } from "../components/Categories";
import axios from "axios";

export type Tag = {
  id: number;
  name: string;
};

export default function AdCreateForm() {
  //FORMULAIRE CREATION ANNONCE
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const formFields = [
    {
      label: "Titre",
      name: "title",
      type: "text",
      placeholder: "Entrez le titre",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Entrez la description",
    },
    {
      label: "Owner",
      name: "owner",
      type: "text",
      placeholder: "Nom du propriétaire",
    },
    {
      label: "Price",
      name: "price",
      type: "text",
      placeholder: "Entrez le prix",
    }, // Changement du type à number
    {
      label: "Picture",
      name: "picture",
      type: "text",
      placeholder: "URL de l'image",
    }, // Changement du type à url
    {
      label: "Location",
      name: "location",
      type: "text",
      placeholder: "Entrez la localisation",
    },
  ];

  async function fetchCategories() {
    const { data } = await axios.get<Category[]>(
      "http://localhost:3000/categories"
    );
    //console.log("data categories = ", data);
    setCategories(data);
  }

  async function fetchTags() {
    const { data } = await axios.get<Tag[]>("http://localhost:3000/tags");
    //console.log("data Tags", data);
    setTags(data);
  }

  useEffect(() => {
    fetchCategories();
    fetchTags();
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
          <input
            className="text-field"
            name={el.name}
            type={el.type}
            placeholder={el.placeholder}
          />
        </label>
      ))}

      <label htmlFor="">
        Select Category:
        <select name="category">
          <option value="value">Select your category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="">
        Selet Tags:
        <select name="tag">
          <option value="value">Select your tag</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
          {/* <option value={"optionValue"}>TagOption</option> */}
        </select>
      </label>
      <button className="button">Publier</button>
    </form>
  );
}
