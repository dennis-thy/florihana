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


function addToCart(productId) {
  // 取得商品數量
  
  // window.shoppingCart.clearCart();
  products.forEach((product) => {
    
    if (product.id == productId) {
      window.shoppingCart.addToCart(product, 1);
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

//sectionProduct

let lastVisibleProduct = 3; //起始顯示到序列3
let firstVisibleProduct = 0; // 第一個產品

$(()=>{
  // HTML加載完執行
  products.forEach((product,index)=>{
      
      let template = 
      `<div class="col productCard ${index>=4?'d-none':''}" id="product-${index}">
      <div class="card5 b-light flex-column align-items-center ">
        <img
        onclick="link('${product.shortDesc}')"
          class="img-fluid w-100"
          src="${product.Img[0]}"
        />
        <div class="container border h-100 text-center rounded card5Bg">
          <div class="card-header pb-2" style="color: #9c876f">
            <h3>${product.name}</h3>
          </div>
          <div class="card-body pt-5 pb-5" style="color: #9c876f">
            <p class="card-text">${product.specifications ?? '&nbsp'}</p>
            <p class="card-text">NT$${product.price}</p>
          </div>
          <a onclick="addToCart(${product.id})" class="card-link rounded-bottom">
              <p>加入購物車</p>
          </a>
        </div>
      </div>
      </div>`;

      $('.productSection').append(template);
      
  })
  // nextproduct();//test
  // previousProduct();//test
})


function nextProduct(){
  lastVisibleProduct++;
  // $('#product-4').css('display',' block')，上面用bootstrap的d-none，所以用css改不了
  $(`#product-${lastVisibleProduct}`).removeClass('d-none');
  $(`#product-${firstVisibleProduct}`).addClass('d-none');
  firstVisibleProduct++;

  
  

  // 判斷已經到最後一個商品，把按鈕disabled或消失
  // 判斷式的等於要用"=="， 如果用"="是賦予值得意思
  if(lastVisibleProduct == products.length-1){
      $(`.right`).addClass("d-none");
      $(`.left`).removeClass("d-none");
  }
  if(firstVisibleProduct > 0){
      $(`.left`).removeClass("d-none");
  }
}

function previousProduct(){
  
  firstVisibleProduct--;
  $(`#product-${firstVisibleProduct}`).removeClass(`d-none`);
  $(`#product-${lastVisibleProduct}`).addClass(`d-none`);
  lastVisibleProduct--;
  
  if(firstVisibleProduct == 0){
      $(`.left`).addClass("d-none");
      $(`.right`).removeClass("d-none");
  }
  

}



//sectionProduct end
