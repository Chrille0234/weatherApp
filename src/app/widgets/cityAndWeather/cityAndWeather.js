export default function WeatherWidget({object}){
    let {city, celsius, clouds, maxTemp, minTemp} = object
    return (
            <div className="text-white text-center h-[50%] w-full flex flex-col items-center justify-center">
                <h2 className="text-3xl">{city}</h2>
                <div className="text-6xl">{celsius}°</div>
                <div className="opacity-50 text-xl capitalize font-bold">{clouds}</div>
                <span className="font-bold">H: {Math.floor(maxTemp)}° L: {Math.floor(minTemp)}°</span>
            </div>
    )
}