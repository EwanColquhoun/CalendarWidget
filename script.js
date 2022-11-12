let results = document.getElementById('results-container');
let form = document.getElementById('form-container'); 

function calculateDays(days){
    let price = discount(days);
    let quote = calculateQuote(days, price);
    console.log('caldays called', days)
    // Need to work out the logic here.... the else works
    if (days < 1 ) {
      console.log('<1 days')

      results.classList.add('show');
      form.classList.add('show');
      results.innerHTML = 
      `Please select dates from the drop down calendar above.
      Alternatively, please get in touch!</span>`
    } else {
      console.log('else')
      results.classList.add("show");
      form.classList.add('show');
      results.innerHTML = `
      <span>Your total hire is ${days} days.<br>
      Total estimate is £${quote}.<br> 
      Please get in touch if you are interested in a discount.
      </span>`;
    }
    return days, subject
}


function refresh(){
    console.log('mouse enter')
    results.classList.remove('show')
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
  
  // Date picker
  const picker = new easepick.create({
    element: document.getElementById('datepicker'),
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
      'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@1.2.0/dist/index.css',
    ],
    autoApply: true,
    inline: true,
    format: "DD MMM YYYY",
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
      tooltip: true,
    },
    setup(picker) {
      picker.on('select', (e) => {
      //    let startDate =  picker.getStartDate('DD MMM YYYY');
        //  document.getElementById('test').innerHTML = 'Start date: '+startDate+' End date: '+endDate;
      });
   },
  });


  
picker.onclick = refresh();

// Postmail
//update this with your js_form selector
var form_id_js = "javascript_form";

var data_js = {
    "access_token": "t8gr94s5df3qrka13ypminrd"
};

function js_onSuccess() {
    // remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
}

function js_onError(error) {
    // remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

var sendButton = document.getElementById("js_send");

// Returns the dates selected by the user
function getDates(){
    var input = document.querySelector('#datepicker').value;
    if (input == "") {
      return;
    } else {
      return input;
    }
;}

function js_send() {
    sendButton.value='Sending…';
    sendButton.disabled=true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
        if(request.readyState == 4) {
            js_onError(request.response);
        }
    };
    var dates = getDates();
    var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
    var message = document.querySelector("#" + form_id_js + " [name='text']").value;
    var email = document.querySelector("#" + form_id_js + " [name='extra_email']").value;
    var phone = document.querySelector("#" + form_id_js + " [name='extra_phone_number']").value;
    var postcode = document.querySelector("#" + form_id_js + " [name='extra_postcode']").value;
    message = `Hi Jeremy, Email: ${email}, Phone: ${phone}, Postcode: ${postcode}, Dates: ${dates}`
    data_js['subject'] = subject;
    data_js['text'] = message;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = function check(){
  var checkBox = document.getElementById("checkbox")
  if (checkBox.checked == true) {
    js_send();
  } else {
    alert("Please check the box if you are happy for us to have the details provided.")
  }
};

function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }
    console.log(form_data)
    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});

    