
function calculateDays(days){
    let results = document.getElementById('results-container');
    let price = discount(days);
    let quote = calculateQuote(days, price);
    results.innerHTML = `
    <span>Your total hire is ${days} days.<br>
    Total estimate is £${quote}</span>`;
    console.log('calculateDays')
}

function calculateQuote(days, price){
    quote = price * days
    return quote;
}

function discount(days){
    if (days > 42) {
        price = 25;
        return price
    } else if (days >=21 && days <=42 ) {
        price = 27;
        return price
    } else {
        price = 29;
        return price
    }
}

const picker = new easepick.create({
    element: document.getElementById('datepicker'),
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.0/dist/index.css',
      'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@1.2.0/dist/index.css',
    ],
    plugins: ['RangePlugin'],
    RangePlugin: {
      tooltipNumber(num) {
        console.log(num-1);
        let days = num-1;
        calculateDays(days)
        return days;
      },
      locale: {
        one: 'night',
        other: 'nights',
      }, tooltip: true,
    },
  });
