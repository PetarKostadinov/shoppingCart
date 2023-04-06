export const fetchOrderHistory = async (token) => {
    const response = await fetch('/api/orders/mine', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  export async function createOrder(cart, userInfo) {
    const order = {
      orderItems: cart.cartItems,
      shippingInfo: cart.shippingInfo,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    };
  
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(order),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }
  

  
 
  
  
 