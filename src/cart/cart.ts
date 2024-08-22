//Definir la variable del CART , seria un [] de cartitem
//crear un metodo para agregar un item al cart
//crear un metoro para eliminar un item dekl cart
// crear un metodo para obtener el total
// renderizar el carro en el DOM

import { CartItem } from "./cart-item-interface";
import { renderCartList } from "./cartList";

//111111
export const cartArray: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

//222222
interface itemAddToCart {
  title: string;
  id: number;
  price: number;
}

export const addToCart = ({ title, id, price }: itemAddToCart) => {
  const itemInCart = cartArray.find((cartItem) => cartItem.id === id);
  itemInCart
    ? (itemInCart.quantity += 1)
    : cartArray.push({ title, id, price, quantity: 1 });
  console.log(cartArray);
  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCartList();
};

export const removeCartItem = (id: number) => {
  let index = cartArray.findIndex((cartItem) => cartItem.id === id);
  if (index !== -1) {
    if (cartArray[index].quantity > 1) {
      cartArray[index].quantity -= 1;
    } else {
      cartArray.splice(index, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCartList();
};

///333333
export const cartTotal = () => {
  return cartArray.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
