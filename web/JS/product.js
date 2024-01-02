function increment() {
    var input = document.querySelector('.quantity-input');
    if (parseInt(input.value) < input.max) {
      input.value = parseInt(input.value) + 1;
    }
  }
  
function decrement(index) {
    var input = document.querySelectorAll('.quantity-input')[index];
    if (parseInt(input.value) > input.min) {
        input.value = parseInt(input.value) - 1;
    }
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
}

function addToCart(productId) {
    // 取得商品數量
    var input = document.querySelector('.quantity-input');
    // window.shoppingCart.clearCart();
    products.forEach((product) => {
      
      if (product.id == productId) {
        window.shoppingCart.addToCart(product, parseInt(input.value));
      }
  
    });
    // window.shoppingCart.addToCart(productId, parseInt(input.value));
    // window.shoppingCart.addToCart(productId, );
  
    // console.log(window.shoppingCart.getCart());
    // 顯示購物車訊息
    var cartMessage = document.getElementById("cartMessage");
    cartMessage.style.display = "flex";
  
    // 1.5 秒後自動關閉購物車訊息
    setTimeout(function () {
      cartMessage.style.display = "none";
    }, 1500);
  }