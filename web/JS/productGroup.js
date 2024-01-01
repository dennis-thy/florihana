function increment(index) {
  var input = document.querySelectorAll('.quantity-input')[index];
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



function addToCart(productId,index) {
  // 取得商品數量
  var input = document.querySelectorAll('.quantity-input')[index];
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

  // 2 秒後自動關閉購物車訊息
  setTimeout(function () {
    cartMessage.style.display = "none";
  }, 2000);
}




$(() => {

  let params = new URLSearchParams(window.location.search);
  let tabValue = params.get('tab');
  let filteredProducts = products.filter(product => product.category == tabValue);

  $(`.${tabValue}`).addClass('sideBar-active');


  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // 初始化分頁
  function setupPagination() {
    $('.pagination').empty();
  
    // 如果沒有產品或只有一頁產品，則不顯示任何分頁按鈕
    if (filteredProducts.length === 0 || totalPages <= 1) {
      return;
    }
  
    // 添加「上一頁」按鈕
    $('.pagination').append('<a href="#" class="prevPageBtn">&laquo;</a>');
  
    // 添加數字分頁按鈕
    for (let i = 1; i <= totalPages; i++) {
      $('.pagination').append(`<a href="#" class="pageNumber">${i}</a>`);
    }
  
    // 添加「下一頁」按鈕
    $('.pagination').append('<a href="#" class="nextPageBtn">&raquo;</a>');
  
    $('.pageNumber:first').addClass('pagination-active');
    updateButtonStatus(1); // 更新按鈕狀態
  }
  
  

  function updateButtonStatus(page) {
    // 更新前一頁按鈕的狀態
    if (page === 1) {
      $('.prevPageBtn').addClass('disabled-link');
    } else {
      $('.prevPageBtn').removeClass('disabled-link');
    }

    // 更新後一頁按鈕的狀態
    if (page === totalPages) {
      $('.nextPageBtn').addClass('disabled-link');
    } else {
      $('.nextPageBtn').removeClass('disabled-link');
    }
  }

  // 顯示指定頁面的產品
  function showPage(page) {
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    $('.productCard').empty();

    filteredProducts.slice(start, end).forEach((product, index) => {
      $('.productCard').append(`
  <div class="product text-center">
            <img
              onclick="link('${product.shortDesc}')"
              src="${product.Img[0]}"
              class="img-fluid mx-auto"
              alt="${product.name}"
            />
            <div class="border-bottom">
              <h3 class="mt-1 text-light">${product.name}</h3>
              <p class="capacity">${product.specifications ?? '&nbsp'}</p>
            </div>
            <div class="addShoppingCart">
              <p class="price">NT$${product.price}</p>
              <div class="quantity">
                <button class="quantity-btn" onclick="decrement(${index})">-</button>
                <input
                  type="text"
                  id="quantityInput"
                  name="quam"
                  class="quantity-input"
                  value="1"
                  min="1"
                  max="100"
                  oninput="checkValue(this)"
                />
                <button class="quantity-btn" onclick="increment(${index})">+</button>
              </div>
              <div class="btn shoppingCart" onclick="addToCart(${product.id},${index})">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <path
                    fill="#fff"
                    d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z"
                  />
                  <circle fill="#fff" cx="7" cy="22" r="2" />
                  <circle fill="#fff" cx="17" cy="22" r="2" />
                </svg>
              </div>
            </div>
          </div>
  `)

    });

    // 更新分頁按鈕的狀態
    $('.pagination a').removeClass('pagination-active');
    $(`.pagination .pageNumber:eq(${page - 1})`).addClass('pagination-active');

     updateButtonStatus(page);
    
  }

  // 初始化分頁
  setupPagination();

  // 為分頁按鈕添加點擊事件
  $(document).on('click', '.pageNumber', function () {
    let page = parseInt($(this).text());
    showPage(page);
  });

  // 為前一頁和後一頁按鈕添加點擊事件
  $('.prevPageBtn').click(function () {
    let currentPage = $('.pageNumber.pagination-active').index();
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  $('.nextPageBtn').click(function () {
    let currentPage = $('.pageNumber.pagination-active').index();
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });

  // 初始顯示第一頁的產品
  showPage(1);
  $('.form-select').on('change', function() {
    var selectedOption = $(this).val();
    if (selectedOption === "1") {
      // 價格由高到低排序
      sortProductsDescending();
    } else if (selectedOption === "2") {
      // 價格由低到高排序
      sortProductsAscending();
    } else {
      // 預設排序
      defaultSort();
    }
  });

  function sortProductsDescending() {
    // 在這裡實現價格由高到低的排序邏輯
    filteredProducts.sort((a, b) => b.price - a.price);
    showPage(1); // 重新顯示第一頁
  }
  
  function sortProductsAscending() {
    // 在這裡實現價格由低到高的排序邏輯
    filteredProducts.sort((a, b) => a.price - b.price);
    showPage(1); // 重新顯示第一頁
  }
  
  function defaultSort() {
    // 在這裡實現預設排序邏輯
    filteredProducts = products.filter(product => product.category == tabValue);
    showPage(1);
  }



})