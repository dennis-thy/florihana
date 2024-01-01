// 首頁
// navMenuRWD
function openNavMenu(){
  let navMenu = document.querySelector("#navmenu");
  navMenu.style.left = "0";
}

function closeNavMenu(){
  let navMenu = document.querySelector("#navmenu");
  navMenu.style.left = "-100%";
}
// navMenuRWD end


// searchWD
function openSearch(){
  let search = document.querySelector("#search");
  search.style.display = "flex";
  // 在下一個渲染週期中設置 opacity 為 1，以實現淡入效果
  requestAnimationFrame(function () {
      search.style.opacity = 1; // 設定 opacity 為 1，淡入
    });
}

function closeSearch(){
  let search = document.querySelector("#search");
  // 在下一個渲染週期中設置 opacity 為 0，以實現淡出效果
  requestAnimationFrame(function () {
      search.style.opacity = 0;// 設定 opacity 為 0，淡出
    });
  // 在淡出動畫完成後隱藏元素
  setTimeout(function () {
  search.style.display = "none";
  }, 500); // 0.5秒後隱藏元素
  // search.style.display = "none";
}
// searchWD end

function redirectToSearchPage() {

var searchKey = $('input[name=search]').val();
console.log(searchKey);
window.location.href = "/web/search.html?key=" + encodeURIComponent(searchKey);
}


// 本頁

function increment(productId) {
  window.shoppingCart.increaseQuantity(productId, 1);
  render()
}

function decrement(productId) {
  window.shoppingCart.decreaseQuantity(productId, 1);
  render()
}

function deleteProduct(productId) {
  window.shoppingCart.removeFromCart(productId);
  render()
}

function checkValue(input) {
  var value = parseInt(input.value);
  var min = parseInt(input.min);
  var max = parseInt(input.max);

  // 檢查輸入值是否小於最小值，如果是，設定為最小值
  if (value < min) {
    input.value = min;
  }

  // 檢查輸入值是否大於最大值，如果是，設定為最大值
  if (value > max) {
    input.value = max;
  }
  render(); 
}
function render(){
  let cart = window.shoppingCart.getCart();
  console.log(cart);
  let sum = 0;
  $('.productListGroup').empty();
  cart.forEach((product)=>{
    sum += product.price * product.quantity;
    $('.productListGroup').append(`
    <div class="row productList">
    <div class="col">${product.name}</div>
    <div class="col">${product.specifications ?? '&nbsp'}</div>
    <div class="col">
        <div class="quantity">
            <button class="quantity-btn" onclick="decrement(${product.id})">-</button>
            <input
              type="text"
              id="quantityInput"
              name="quam"
              class="quantity-input"
              value="${ product.quantity }"
              min="1"
              max="100"
              oninput="checkValue(this)"
              disabled
            />
            <button class="quantity-btn" onclick="increment(${product.id})">+</button>
          </div>
    </div>
    <div class="col delete" onclick="deleteProduct(${product.id})">刪除</div>
    <div class="col">$${product.price * product.quantity}</div>
  </div>
    `)

  })
  $('.total').empty();
  $('.total').append(`
  <p>總計</p>
  <p>NT$${sum}</p>
  `);

}
$(()=>{


  render();
})