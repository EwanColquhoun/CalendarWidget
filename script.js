
function calculateDays(days){
    let results = document.getElementById('results-container');
    let price = discount(days);
    let quote = calculateQuote(days, price);
    results.innerHTML = `
    <span>Your total hire is ${days} days.<br>
    Total estimate is £${quote}</span>`;
    return days
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
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
      'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@1.2.0/dist/index.css',
    ],
    autoApply: false,
    plugins: ['RangePlugin'],
    RangePlugin: {
      tooltipNumber(num) {
        let days = num-1;
        return calculateDays(days);
      },
      locale: {
        one: 'night',
        other: 'nights',
      }, 
    },
    setup(picker) {
      picker.on('select', (e) => {
      //    let startDate =  picker.getStartDate('DD MMM YYYY');
        //  document.getElementById('test').innerHTML = 'Start date: '+startDate+' End date: '+endDate;
      });
   },
  });
