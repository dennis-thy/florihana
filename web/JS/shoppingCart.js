class ShoppingCart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  }

  getCart() {
    return this.cart;
  }

  // 添加商品到購物車
  addToCart(product, quantity) {
    let index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }
    this.updateCart();
  }
  
  increaseQuantity(productId, quantity) {
    let index = this.cart.findIndex(item => item.id === productId);
    console.log(index);
    if (index !== -1) {
      this.cart[index].quantity += quantity;
    }
    this.updateCart();
  }

  decreaseQuantity(productId, quantity) {
    let index = this.cart.findIndex(item => item.id === productId);
    console.log(index);
    if (index !== -1) {
      this.cart[index].quantity -= quantity;
  
      // 如果數量降至 0 或以下，則從購物車中移除商品
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
    }
    this.updateCart();
  }

  // 更新 localStorage 中的購物車
  updateCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.displayCart();
  }

  // 顯示購物車
  displayCart() {
    // 使用 document.getElementById 或其他方法顯示購物車內容
    // 例如：顯示購物車內每個商品的名稱、數量和價格
    console.log(this.cart);
  }

  // 移除商品
  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCart();
  }

  // 清空購物車
  clearCart() {
    this.cart = [];
    this.updateCart();
  }
}
window.shoppingCart = new ShoppingCart();
// 實例化購物車對象
// let shoppingCart = new ShoppingCart();

// 示例：添加商品
// shoppingCart.addToCart({ id: 1, name: '產品1', price: 100 }, 1);

// 示例：顯示購物車
// shoppingCart.displayCart();

// 示例：移除商品
// shoppingCart.removeFromCart(1);

// 示例：清空購物車
// shoppingCart.clearCart();
