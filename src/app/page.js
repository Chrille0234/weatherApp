"use client"
import { useState, useEffect } from "react"
import homeBackground from "./assets/homeBackground.png"
import house from "./assets/house.png"
import TabBar from "./assets/TabBar.png"
import WeatherWidget from "@/app/widgets/cityAndWeather/cityAndWeather"
import Image from "next/image";

export default function Home() {
    const apiKey = "371a743ceb6e25bf13659a362ab6c511";
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
                        console.log(data)
                        setLocationAndWeather({
                            city: data.city.name,
                            celsius: Math.round(data.list[0].main.temp - 273.15), // converts kelvin to celsius
                            clouds: data.list[0].weather[0].description,
                            latitude: data.city.coord.lat,
                            longtitude: data.city.coord.lon
                        });
                    }
                } catch (error) {
                    console.error('der var en fejl fordi du er en klovn:', error);
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
        <div className="w-full h-[100dvh] bg-[url('./assets/homeBackground.png')] bg-no-repeat bg-cover">
            <WeatherWidget object={locationAndWeather}/>
            <Image src={house} alt={"house at night"} className="absolute bottom-0"/>
            <Image src={TabBar} alt={"house at night"} className="absolute bottom-0"/>
        </div>
    );
}

/*{w
  "id": 2614481,
  "name": "Roskilde",
  "coord": {
    "lat": 55.6258,
    "lon": 12.0864
  },
  "country": "DK",
  "population": 44285,
  "timezone": 3600,
  "sunrise": 1702539191,
  "sunset": 1702564751
}*/
