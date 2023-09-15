
var btn = $('#btn-back-to-top');

$(window).scroll(function () {
  if ($(window).scrollTop() > 70) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});


var iphone= $('#iphone');

var layer= $('#main');

layer.mousemove(function(e){
  var ivalueX= (e.pageX * -1 / 30);
  var ivalueY= (e.pageY * -1 / 30);
  console.log('ok');
  iphone.css('transform', 'translate3d('+ivalueX+'px,'+ivalueY+'px, 0)');
});















// function tes() {
//   var element = document.body;
//   element.classList.toggle("bg-dark");
//   element.classList.toggle("text-light");
//   element.style.transition = "all 1s";

//   var jumbotron = document.getElementById("jumbo");
//   jumbotron.classList.toggle("dark-light");
//   jumbotron.style.transition = "all 1s";







// };

// const container = document.getElementById('js-container');
// const setValue = (property, value) => {
//     container.style.setProperty(`--${property}`, value);

// };

// const setValueFromLocalStorage = property => {
//     let value = localStorage.getItem(property);
//     setValue(property, value);
// };

// const setTheme = options => {
//     for (let option of Object.keys(options)) {
//         const property = option;
//         const value = options[option];

//         setValue(property, value);
//         localStorage.setItem(property, value);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     setValueFromLocalStorage('background');
//     setValueFromLocalStorage('body-text');
//     setValueFromLocalStorage('highlight-background');
//     setValueFromLocalStorage('links-hover');
//     setValueFromLocalStorage('accent');
//     setValueFromLocalStorage('img-opacity');
//     setValueFromLocalStorage('day-button');
//     setValueFromLocalStorage('night-button');


//     const dayButton = document.getElementById('day');
//     dayButton.addEventListener('click', () => {
//         setTheme({
//             'background': '#fff',
//             'body-text': '#555',
//             'highlight-background': '#f5f6f7',
//             'links-hover': '#555',
//             'accent': '#000',
//             'img-opacity': '1',
//             'day-button': 'none',
//             'night-button': 'inline',
//         });
//     });

//     const nightButton = document.getElementById('night');
//     nightButton.addEventListener('click', () => {
//         setTheme({
//             'background': '#232323',
//             'body-text': '#ababab',
//             'highlight-background': '#343434',
//             'links': '#662666',
//             'links-hover': '#eee',
//             'accent': '#ececec',
//             'img-opacity': '0.8',
//             'day-button': 'inline',
//             'night-button': 'none',
//         });
//     });
// });





$('.modal-content').resizable({
  //alsoResize: ".modal-dialog",
  minHeight: 300,
  minWidth: 300
});
$('.modal-dialog').draggable();

$('#myModal').on('show.bs.modal', function () {
  $(this).find('.modal-body').css({
    'max-height': '100%'
  });
});






$(".hover").mouseleave(
  function () {
      $(this).removeClass("hover");
  }
);








var shoppingCart = (function () {

  cart = [];

  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem('shoppingCart'));
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }


  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }
  return obj;
})();


// Add item
$('.default-btn').click(function (event) {
  // alert('working');
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});



function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>"
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'>"
      + "<input type='number' class='item-count' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "</div></td>"
      + "<td><button class='delete-item' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = "
      + "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.cart-quantity').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
  var name = $(this).data('name');
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});
displayCart();

//////// ui script start /////////
// Tabs Single Page
$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
$('.tab ul.tabs li a').on('click', function (g) {
  var tab = $(this).closest('.tab'),
    index = $(this).closest('li').index();
  tab.find('ul.tabs > li').removeClass('current');
  $(this).closest('li').addClass('current');
  tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
  tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
  g.preventDefault();
});

// search function
$('#search_field').on('keyup', function () {
  var value = $(this).val();
  var patt = new RegExp(value, "i");

  $('.tab_content').find('.col-lg-3').each(function () {
    var $table = $(this);

    if (!($table.find('.featured-item').text().search(patt) >= 0)) {
      $table.not('.featured-item').hide();
    }
    if (($table.find('.col-lg-3').text().search(patt) >= 0)) {
      $(this).show();
      document.getElementById('not_found').style.display = 'none';
    } else {
      document.getElementById("not_found").innerHTML = " Product not found..";
      document.getElementById('not_found').style.display = 'block';
    }

  });

});






let toggler = document.querySelector(".toggler");
let price = document.querySelectorAll(".price");
let dollar = document.querySelectorAll(".dollar");
let usd = 300.56;
// 1 dollar = 300.56 Pkr at 2023

toggler.onclick = () => {

  toggler.classList.toggle("active");

  if (toggler.classList.contains("active")) {

    for (var i = 0; i < dollar.length; i++) {
      dollar[i].innerText = "PKR";
    }
    for (var k = 0; k < price.length; k++) {
      price[k].innerText = (price[k].innerText * usd).toFixed(2);
    }

  }
  else {

    for (var i = 0; i < dollar.length; i++) {
      dollar[i].innerText = "$";
    }
    for (var k = 0; k < price.length; k++) {
      price[k].innerText = (price[k].innerText / usd).toFixed(2);
    }

  }
}

















const d = document;
const button = d.querySelector('.toogleBtn');

let darkModeState = false;


const useDark = window.matchMedia("(prefers-color-scheme: dark)");


function toggleDarkMode(state) {
  document.documentElement.classList.toggle("dark-mode", state);
  darkModeState = state;
}

function setDarkModeLocalStorage(state) {
  localStorage.setItem("dark-mode", state);
}


toggleDarkMode(useDark.matches);
toggleDarkMode(localStorage.getItem("dark-mode") == "true");


useDark.addListener((evt) => toggleDarkMode(evt.matches));


button.addEventListener("click", () => {
  darkModeState = !darkModeState;

  toggleDarkMode(darkModeState);
  setDarkModeLocalStorage(darkModeState);
});














// $(document).ready(function(){
//   $(window).scroll(function(){
//   	var scroll = $(window).scrollTop();
// 	  if (scroll > 720) {
// 	    $(".black").css("background" , "black");
// 	  }

// 	  else{
// 		  $(".black").css("background" , "#5f5f5f");  	
// 	  }
//   })
// })














$(".toggle-password").click(function() {
  $(this).toggleClass("bi bi-eye-fill bi bi-eye-slash-fill");
  input = $(this).parent().find("input");
  if (input.attr("type") == "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});

























const allHoverImages = document.querySelectorAll('.hover-container div img');
const imgContainer = document.querySelector('.img-container');

window.addEventListener('DOMContentLoaded', () => {
    allHoverImages[0].parentElement.classList.add('active');
});

allHoverImages.forEach((image) => {
    image.addEventListener('mouseover', () =>{
        imgContainer.querySelector('img').src = image.src;
        resetActiveImg();
        image.parentElement.classList.add('active');
    });
});

function resetActiveImg(){
    allHoverImages.forEach((img) => {
        img.parentElement.classList.remove('active');
    });
}
