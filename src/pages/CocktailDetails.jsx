import React from "react";
import axios from "axios";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrapper/CocktailDetails";
import { useQuery } from '@tanstack/react-query';

// const singleCocktailUrl =
//   "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

  // const singleCocktailQuery = (id) => {
  //   return {
  //     queryKey: ['cocktail', id],
  //     queryFn: async () => {
  //       const { data } = await axios.get(`${singleCocktailUrl}${id}`);
  //       return data;
  //     },
  //   };
  // };


  export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    // Pre-fetch data to ensure it's in React Query's cache
    await queryClient.ensureQueryData({
      queryKey: ['cocktail', id],
      queryFn: async () => {
        const { data } = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        return data;
      },
    });

    // Return only the `id` for the component to use
    return { id };
  };

  
function CocktailDetails() {
  const { id} = useLoaderData();
  const navigate = useNavigate();

  // Use React Query to fetch or read from cache
  const { data } = useQuery({
    queryKey: ['cocktail', id], // React Query will match this key
    queryFn: async () => {
      const { data } = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5, // Prevent refetch for 5 minutes
  });

   // Redirect if no data
  if (!data) return navigate('/');

  const singleDrink = data.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith('strIngredient') && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);


  return (
    <Wrapper>
      <header>
        <button onClick={() => navigate(-1)} className='btn'>
          back home
        </button>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className='ing' key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export default CocktailDetails;
