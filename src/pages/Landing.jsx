import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from "axios"
import CocktailList from '../component/CocktailList';
import SearchForm from '../component/SearchForm';
import {useQuery }from "@tanstack/react-query"

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  // Fetch function for cocktails
const fetchCocktails = async (searchTerm) => {
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm || 'a'}`);
  return response.data.drinks;
};

export const loader = async ({ request }) => {
  const url = request?.url ? new URL(request.url) : new URL(window.location.href); 
  const searchTerm = url.searchParams.get("search") || "";
  return { searchTerm };
};
 
   
function Landing() {
  const loaderData = useLoaderData() || {}; // Fallback to an empty object
  const { searchTerm = "" } = loaderData; // Destructure with a default value

  const { data: drinks } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => fetchCocktails(searchTerm),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Optional: Disable refetching when window regains focus
  });

 console.log("Drinks Data:", drinks);

 
  return (
    <div>
      <SearchForm searchTerm={searchTerm}/>
      <CocktailList drinks={drinks}/>
    </div>
  )

  };


export default Landing
