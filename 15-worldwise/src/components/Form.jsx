// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import ButtonBack from "./ButtonBack.jsx";
import {useURLPosition} from "../hooks/useURLPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client?";
function Form() {
    const [lat,lng]= useURLPosition();
    const navigate=useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
const [emoji, setEmoji] = useState("");
const [geocodingError, setGeocodingError] = useState("");
  const [isLoadingGeocoding, setisLoadingGeocoding] = useState(false);
   useEffect(() => {
       async function fetchCityData() {
           try {
               setGeocodingError("");
               setisLoadingGeocoding(true);
               const response = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
                const data = await response.json();
                console.log(data);
                if(data.countryCode=="" || !data.countryCode) {
                  throw  new Error("Clicked Location doesn't seem to be a city ,Click Somewhere Else😊.");

                }
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
           }catch (error) {
               setGeocodingError(error.message);
           }finally {
               setisLoadingGeocoding(false);
           }
       }
       fetchCityData();
   },[lat,lng]);

   if(geocodingError.length>0) {
       return <Message message={geocodingError}/>;
   }
    if(isLoadingGeocoding) {
        return <Spinner />;
    }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
       <ButtonBack></ButtonBack>


      </div>
    </form>
  );
}

export default Form;
