"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import homeBackground from "./assets/homeBackground.png"
import house from "./assets/house.png"
import frontBar from "./assets/tabbar/frontBar.svg"
import backBar from "./assets/tabbar/backBar.svg"
import plusButton from "./assets/tabbar/plusButton.svg"
import pinButton from "./assets/tabbar/pinButton.svg"
import menuButton from "./assets/tabbar/menuButton.svg"

import WeatherWidget from "@/app/widgets/cityAndWeather/cityAndWeather"
import toCelsius from "@/app/function-components/toCelsius"

export default function Home() {
    const apiKey = "371a743ceb6e25bf13659a362ab6c511"
    const [locationAndWeather, setLocationAndWeather] = useState({});

    useEffect(() => {
        let isMounted = true

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude

                const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

                try {
                    const response = await fetch(endpoint)
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    const data = await response.json()

                    if (isMounted) {
                        setLocationAndWeather({
                            city: data.city.name,
                            celsius: Math.round(toCelsius("kelvin", data.list[0].main.temp)), // converts kelvin to celsius
                            minTemp: Math.round(toCelsius("kelvin", data.list[0].main.temp_min)), // converts minimum temperature from kelvin to celsius
                            maxTemp: Math.round(toCelsius("kelvin", data.list[0].main.temp_max)), // converts maximum temperature from kelvin to celsius
                            clouds: data.list[0].weather[0].description,
                            latitude: data.city.coord.lat,
                            longtitude: data.city.coord.lon
                        })
                    }
                } catch (error) {
                    console.error('An error occurred while fetching the weather data:', error)
                }
            },
            (error) => {
                console.error('An error occurred while fetching the weather data:', error)
            }
        )

        return () => {
            isMounted = false
        }
    }, [])

    console.log(locationAndWeather)

    return (
        <div className="w-full h-[100dvh] bg-[url('./assets/homeBackground.png')] bg-no-repeat bg-cover">
            <WeatherWidget object={locationAndWeather}/>
            <div className="absolute bottom-0">
                <Image src={backBar} alt={"house at night"} className="absolute bottom-0 min-w-[100dvw]"/>
                <Image src={frontBar} alt={"house at night"} className="absolute bottom-0 min-w-[100dvw]"/>
                <div className="flex justify-between w-[100dvw]  relative">
                    <button>
                        <Image src={pinButton} alt={"open menu"} height="75"/>
                    </button>
                    <button className={"relative top-1"}>
                        <Image src={plusButton} alt={"open menu"} height="75"/>
                    </button>
                    <button>
                        <Image src={menuButton} alt={"open menu"} height="75"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
