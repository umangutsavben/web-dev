document.addEventListener("DOMContentLoaded", () => {
  let input = document.querySelector("#city-input");
  let btn = document.querySelector("#get-weather-btn");
  let city = document.querySelector("#city-name");
  let tmp = document.querySelector("#temperature");
  let desc = document.querySelector("#description");
  let err = document.querySelector("#error-message");
  let info = document.querySelector("#weather-info");
  btn.addEventListener("click", () => {
    err.classList.add("hidden");
    let txt = input.value.trim();
    if (txt === "") return;

    const apiKey = "929ae3b324ac960ebf3b159c60d51ffd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${txt}&appid=${apiKey}&units=metric`;
    info.classList.add("hidden");
    fetching(url,txt);
  })

  async function fetching(url,txt) {
    try {
      info.classList.remove("hidden");
      let reponse = await fetch(url);
      const data = await reponse.json();
      tmp.textContent = data.main.temp;
      city.textContent = txt;
      desc.textContent = data.weather[0].description;
    }
    catch (e) {
      info.classList.remove("hidden");
      err.classList.remove("hidden");
    }
  }
})
