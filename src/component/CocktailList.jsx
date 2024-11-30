import React from "react";
import CocktailCard from "./CocktailCard";
import Wrapper from "../assets/wrapper/CocktailList";




function CocktailList({ drinks }) {
  if (!Array.isArray(drinks) || drinks.length === 0) {
    return (
      <h4 style={{ textAlign: "center" }}>
        No Matching Cocktails Found...
      </h4>
    );
  }

  const formattedDrinks = Array.isArray(drinks)
  ? drinks.map((item) => {
      const { idDrink, strDrink, strDrinkThumb, strAlcholic, strGlass } = item;
      return {
        id: idDrink,
        name: strDrink,
        img: strDrinkThumb,
        info: strAlcholic,
        glass: strGlass,
      };
    })
  : [];


  return (
    <Wrapper>
    {formattedDrinks.map((item)=> {
      return <CocktailCard key={item.id} {...item}/>
    })}
    </Wrapper>
  );
}

export default CocktailList;
