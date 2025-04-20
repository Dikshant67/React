
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import city from "./City.jsx";
// eslint-disable-next-line react/prop-types
function CountryList({ cities, isLoading }) {
    if (isLoading) {
        return <Spinner />;
    }
    // eslint-disable-next-line react/prop-types
    if (!cities?.length) {
        return <Message message="Add your first city by clicking on a city on the map"/>;
    }
    const countries = cities.reduce((acc, city) => {
        if (!acc.some(el => el.country === city.country)) {
            return [...acc, { country: city.country, emoji: city.emoji }];
        }
        return acc;
    }, []);
    return (
        <ul className={styles.countryList}>
            {/* eslint-disable-next-line react/prop-types */}
            {countries?.map((contry) => (
                <CountryItem country={contry} key={contry.id} />
            ))}
        </ul>
    );
}

export default CountryList;
