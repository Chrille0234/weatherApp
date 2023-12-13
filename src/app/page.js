"use client"
import LocationAndCurrentWeather from "@/app/components/locationCard";
import { useState, useEffect } from "react";

export default function Home() {
    const apiKey = "";
    const [locationAndWeather, setLocationAndWeather] = useState({});

    useEffect(() => {
        //checks if useEffect is running or whatever, so it can't run multiple timess
        let isMounted = true;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

                try {
                    const response = await fetch(endpoint);
                    const data = await response.json();

                    if (isMounted) {
                        setLocationAndWeather({
                            city: data.city.name,
                            celsius: Math.round(data.list[0].main.temp - 273.15), // converts kelvin to celsius
                        });
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            (error) => {
                console.error(`der var en fejl fordi du er en klovn: ${error.message}`);
            }
        );

        return () => {
            isMounted = false;
        };
    }, []);

    console.log(locationAndWeather);

    return (
        <LocationAndCurrentWeather
            city={locationAndWeather.city}
            degrees={locationAndWeather.celsius}
        />
    );
}
