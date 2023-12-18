export default function toCelsius(unit = "fahrenheit", degrees){
    if(unit === "fahrenheit") return (degrees - 32) * 5/9
    if(unit === "kelvin") return degrees - 273.15
    return "write a unit or something idk"
}