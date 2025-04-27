import {createContext, useContext, useEffect, useState} from "react";
const BASE_URL = "http://localhost:9000/";
const CitiesContext =createContext();
// eslint-disable-next-line react/prop-types
function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity,setCurrentCity] = useState({});
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

    async function getCity(id){

        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert("there was a error loading data");
        } finally {
            setIsLoading(false);
        }
    }
    return <CitiesContext.Provider value={{
        cities,isLoading,currentCity,getCity
    }} >{children}</CitiesContext.Provider>
}
function useCities() {
    const context = useContext(CitiesContext);
    if(context===undefined) { throw new Error("CityContext used outside context"); }
    return context;

}

export {CitiesProvider,useCities};