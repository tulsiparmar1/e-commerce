export const getGuestCard = (): any[] => {
  const cart = localStorage.getItem("guestCart");
  return cart ? JSON.parse(cart) : [];
};

export const saveGuestCart = (cart: any[]) => {
  localStorage.setItem("guestCart", JSON.stringify(cart));
  const total = cart.reduce((acc, item) => acc + item.quantity, 0);
};
export const addItemToGuestCart = (newItem: any) => {
  const cart = getGuestCard();
  const existingIndex = cart.findIndex(
    (item) =>
      item.productId === newItem.productId &&
      item.size === newItem.size &&
      item.color === newItem.color
  );
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }

  saveGuestCart(cart);
};
