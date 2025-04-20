import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login";
import CityList from "./components/CityList.jsx";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
const BASE_URL = "https://my-json-server.typicode.com/Dikshant67/questions";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was a error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route index element={<Homepage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace={true} to="cities" />}
            ></Route>
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route>
              <Route path="cities/:id" element={<City/>}/>
            <Route
              path="countries"
              element={
                <CountryList
                  cities={cities}
                  isLoading={isLoading}
                ></CountryList>
              }
            ></Route>
            <Route path="form" element={<Form/>}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
