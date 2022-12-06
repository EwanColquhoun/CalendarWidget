let results = document.getElementById('results-container');
let form = document.getElementById('form-container'); 

function calculateDays(days){
    let price = discount(days);
    let quote = calculateQuote(days, price);
   if (days < 8 && days >=1 ){
      results.classList.add("show");
      form.classList.add('show');
      results.innerHTML = `
      <span>The selected hire is <span class="result">${days} days</span>.<br>
      <span>Estimated quote: </span><span class="result">£203</span><br>
      <span>If you'd like to discuss your quote or make a booking, please fill in your details below and we'll get in touch.</span>
      `;
    } else if (days > 21){
      results.classList.add("show");
      form.classList.add('show');
      results.innerHTML = `
      <span>The selected hire is <span class="result">${days} days</span>.<br>
      <span>Estimated quote: </span><span class="result">£${quote}</span><br>
      <span>The selected length of hire qualifies for a <span class="result">discount</span>.</span><br>
      <span>If you'd like to discuss your quote or make a booking, please fill in your details below and we'll get in touch.</span>
      `;
    } else if (days >= 8 & days <=21){
      results.classList.add("show");
      form.classList.add('show');
      results.innerHTML = `
      <span>The selected hire is <span class="result">${days} days</span>.<br>
      <span>Estimated quote: </span><span class="result">£${quote}</span><br>
      <span>If you'd like to discuss your quote or make a booking, please fill in your details below and we'll get in touch.</span>
      `;
    } else {
      results.classList.add('show');
      form.classList.add('show');
      results.innerHTML = 
      `<span>Please select dates from the calendar above.<br>
       If you'd like to discuss your quote or make a booking, please fill in your details below and we'll get in touch.</span>
      `;
    };
    return days
}

function refresh(){
    results.classList.replace('show', 'hide')
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
    // css: [
    //   'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
    //   'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@1.2.0/dist/index.css',
    // ],
    css: function(s) {
      console.log(s)
      /* to load default style into shadow dom */
      const cssLinks = ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"]
      cssLinks.forEach(cssLink => {
          const link = document.createElement('link');
          link.href = cssLink;
          link.rel = 'stylesheet';
          const onReady = () => {
          this.cssLoaded++;

          if (this.cssLoaded === cssLinks.length) {
              this.ui.wrapper.style.display = '';
          }
          };
          link.addEventListener('load', onReady);
          link.addEventListener('error', onReady);
          this.ui.shadowRoot.append(link);
      })

      /* append custom style css */
      const css = `
        .container.range-plugin .calendar>.days-grid>.day.end,
        .container.range-plugin .calendar>.days-grid>.day.start {
            background-color: #b38a4c;
        }
        .container.range-plugin .calendar>.days-grid>.day.start:after {
          border-left: 8px solid #3c3c3c;
        }
        .container.range-plugin .calendar>.days-grid>.day.end:after {
          border-right: 8px solid #3c3c3c;
        }
        .container.range-plugin .calendar>.days-grid>.day.in-range {
            background-color: #e7e6e4;
        }
      `
      const style = document.createElement('style');
      const styleText = document.createTextNode(css);
      style.appendChild(styleText);

      this.ui.shadowRoot.append(style);
      this.ui.wrapper.style.display = '';
    },
    autoApply: true,
    inline: true,
    format: "DD MMM YYYY",
    plugins: ['RangePlugin'],
    RangePlugin: {
      tooltipNumber(num) {
        // days are days and not nights, hence not num-1.
        let days = num; 
        styling();
        return calculateDays(days);
      },
      locale: {
        one: 'day',
        other: 'days',
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
    // "access_token": "t8gr94s5df3qrka13ypminrd", //ewan
    "access_token": "4ovn9lywqidb25o81711plwv", //jeremy
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

    message = `Hi Kitchen Pod Hire, \n
    You have an enquiry from ${subject}. The details are below: \n 
    Email: ${email},\n
    Phone: ${phone}, \n
    Postcode: ${postcode},\n
    Dates: ${dates}.\n
    Thank you.
    `
    
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
    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});

// styling
function styling () {
  document.querySelector('.easepick-wrapper').shadowRoot.querySelector('.in-range').setAttribute('style', 'color:#e7e6e4')
  document.querySelector('.easepick-wrapper').shadowRoot.querySelector('.start').setAttribute('style', 'color:#b38a4c')
}