const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', apiCall);

const resultArray = [
    document.getElementById('hostname'),
    document.getElementById('ip'),
    document.getElementById('org'),
    document.getElementById('loc'),
    document.getElementById('city'),
    document.getElementById('region'),
    document.getElementById('postal'),
    document.getElementById('timezone'),
    document.getElementById('country')
]

function apiCall() {
    const searchBar = document.getElementById('search-bar');
    const resultContainer = document.getElementById('result-container');
    const target = searchBar.value;
    const sanatizedTarget = target.trim();
    const url = `https://ipinfo.io/${sanatizedTarget}?token=f6a7d27959d1bd`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultContainer.classList.add('result__wrapper');

            resultArray[0].innerHTML = `<span>Hostname: </span>${data.hostname}`;
            resultArray[1].innerHTML = `<span>IP Address: </span>${data.ip}`;
            resultArray[2].innerHTML = `<span>Organization: </span>${data.org}`;
            resultArray[3].innerHTML = `<span>Location: </span>${data.loc}`;
            resultArray[4].innerHTML = `<span>City: </span>${data.city}`;
            resultArray[5].innerHTML = `<span>Region: </span>${data.region}`;
            resultArray[6].innerHTML = `<span>Postal Code: </span>${data.postal}`;
            resultArray[7].innerHTML = `<span>TimeZone: </span>${data.timezone}`;
            resultArray[8].innerHTML = `${data.country}`;
            resultArray[8].classList.add('country__container');

            if (data.country != 'US') {
                resultArray[8].classList.add('warning__country');
            }
            else {
                resultArray[8].classList.remove('warning__country');
                resultArray[8].classList.add('country__container');
            }
        })

        .catch(error => console.error('Error: ' + error))
}