const selectFrom = document.getElementById('selectfrom');
const selectTo = document.getElementById('selectto');
const showResult = document.getElementById('result')
const url = 'https://free.currencyconverterapi.com/api/v5/currencies'

const createNode = (element) => document.createElement(element);
const append = (parent, element) => parent.appendChild(element);


//make an API call to get all the currency
fetch(url).then((response)=> response.json()).then((data) => {
    let result = Object.keys(data.results);
    return result.map((currency)=> { 
        let optionFrom = createNode('option');
            optionFrom.innerHTML = currency;
            optionFrom.value= currency;
            optionFrom.selected = optionFrom.value == 'BTC' && 'selected'

        let optionTo = createNode('option');
            optionTo.innerHTML = currency;
            optionTo.value= currency;
            optionTo.selected = optionTo.value == 'USD' && 'selected'
        append(selectFrom, optionFrom);
        append(selectTo, optionTo);
    })
}).catch(error => console.log(error))

//get selected currency
const getSelectedCurrency = () => {
    let optionFrom; 
    let optionTo;
    let amount = document.getElementById('amount').value

    for(let i = 0; i < selectFrom.options.length; i++){
        optionFrom = selectFrom.options[i];
        if(optionFrom.selected === true){
            break;
        }
    }
    for(let i = 0; i < selectTo.options.length; i++){
        optionTo = selectTo.options[i];
        if(optionTo.selected === true){
            break;
        }
    }
    convertCurrency(amount, optionFrom.value, optionTo.value)
}

//convert the currency
const convertCurrency = (amount, fromCurrency, toCurrency) => {
fromCurrency = encodeURIComponent(fromCurrency);
toCurrency = encodeURIComponent(toCurrency);
let query = fromCurrency.concat('_', toCurrency);
let convertUrl = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}`;
fetch(convertUrl).then((response) => response.json()).then((data) => {
    let value = data.results[query].val;
    let to = data.results[query].to
    if(value) {
        let total = value * amount;
        showResult.innerHTML = Math.round(total * 100) / 100 +' '+ to;
    }
    addCurrency(data.results[query])
}).catch((error) => error)
}
