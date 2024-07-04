import { useEffect, useState } from "react"
import Input from "./input"

const Weather = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function featchWeatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&units=Metric&appid=54df1f816afab2f05d4e9aae7d2b914c`);

            const data = await response.json();
            if (data) {
                setWeatherData(data);
                setLoading(false);
            }

        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    function handleSearch() {
        featchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    useEffect(() => {
        featchWeatherData("bangalore")
    }, []);

    console.log(weatherData);

    return (
        <div>
            <Input
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div>
                    <div className="city-name">
                        <h2>
                            {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">{weatherData?.main?.temp}</div>
                    <p className="description">
                        {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
                    </p>
                    <div className="weather-info">
                        <div className="column">
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather