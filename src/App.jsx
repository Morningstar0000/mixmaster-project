import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homelayout from "./pages/Homelayout";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Newsletter from "./pages/Newsletter";
import SingleErrorPage from "./pages/SingleErrorPage";
import About from "./pages/About";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/CocktailDetails";
import CocktailDetails from "./pages/CocktailDetails";
import { action as newsLetterAction } from "./pages/Newsletter";
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      Time:1000 * 60 * 5,
   }
  }   
});

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Homelayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <SingleErrorPage />,
          loader: landingLoader,
        },
        {
          path: "cocktail/:id",
          element: <CocktailDetails />,
          loader: singleCocktailLoader(queryClient),
        },
        {
          path: "newsletter",
          element: <Newsletter />,
          action: newsLetterAction,
        },
        {
          path: "about",
          element: <About />,
          children: [
            { path: "company", element: <h2>Our Company</h2> },
            { path: "person", element: <h2>Our people</h2> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: false,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_startTransition: true,
      v7_normalizeFormMethod: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
function App() {
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
export default App;
