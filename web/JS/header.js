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
