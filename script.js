

let API_KEY

const fetchCurrency = (handleCurrecyValue) => {
	fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${handleCurrecyValue}`)
	.then((response)=> response.json())
	//.then((data)=> console.log(data.conversion_rates))
	.then((data)=> {
	renderCurrencyBase(data.base_code);
	renderRates(data.conversion_rates)
})
}

const clearList = (list) => {
	list.innerText = '';
}

const renderRates = (ratesObject) => {
	const ratelist = document.querySelector('#currency-list')
	clearList(ratelist);
	for(const currency in ratesObject){
		const rateIten = document.createElement('li')
		rateIten.classList.add('d-flex')
		rateIten.innerText = `${currency}: ${ratesObject[currency]}`
		ratelist.appendChild(rateIten)
	}
}

const renderCurrencyBase = (base = 'BRL') => {
	console.log(base);
	const titleBase = document.getElementById('base');
	const currencyBase = document.getElementById('input-currency');
	titleBase.innerHTML = `Moeda Base: ${base}`;
}

renderRates();
renderCurrencyBase();


const setupEventHandlers = () => {
	const searchButton = document.querySelector('#search-button')

	searchButton.addEventListener('click', handleCurrecyValue )
}

function handleCurrecyValue (event) {
	const currencyInput = document.getElementById('input-currency');

	if(!currencyInput.value) return 
	
	fetchCurrency(currencyInput.value ?? 'BRL');
}

function setupGlobalEnvs(envs) {
	API_KEY = envs.api_key
}

window.onload = async () => {
	const envs = await fetch('./env.json')
  .then(response => response.json())
  .then(data => data)

	setupGlobalEnvs(envs)
	
	setupEventHandlers();
	fetchCurrency('BRL');
}