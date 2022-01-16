const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = ({cityDets, weather}) => {
    const _cityDets = cityDets;
    const _weather = weather;

    details.innerHTML = `
        <h5 class="my-3">${_cityDets.EnglishName}</h5>
        <div class="my-3">${_weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${_weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;

    const iconSrc = `img/icons/${_weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }
    else{
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src', timeSrc)

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}



const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

   const city  = cityForm.city.value.trim();
   cityForm.reset(); 

   updateCity(city)
    .then(data => updateUI(data))
    .then(err => console.log(err));
});