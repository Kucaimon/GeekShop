import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import "./Cart.scss";

const Cart = () => {
  const { items, updateItemQuantity, removeItem, clearCart, getTotalPrice } =
    useCartStore();

  const totalPrice = getTotalPrice();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <div className="cart__container">
          <h1>Корзина пуста</h1>
          <p>Добавьте товары из каталога, чтобы сделать заказ</p>
          <Link to="/catalog" className="cart__continue-shopping">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">
        <h1>Корзина</h1>

        {/* Список товаров */}
        <div className="cart__items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item__info">
                <h3 className="cart-item__name">{item.name}</h3>
                <p className="cart-item__price">
                  {item.price.toLocaleString("ru-RU")} ₽
                </p>
              </div>

              <div className="cart-item__quantity">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="cart-item__quantity-btn"
                >
                  −
                </button>
                <span className="cart-item__quantity-value">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="cart-item__quantity-btn"
                >
                  +
                </button>
              </div>

              <div className="cart-item__total">
                <span className="cart-item__total-price">
                  {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="cart-item__remove"
                aria-label="Удалить товар"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Итоговая сумма и действия */}
        <div className="cart__summary">
          <div className="cart__total">
            <h2>Итого: {totalPrice.toLocaleString("ru-RU")} ₽</h2>
          </div>

          <div className="cart__actions">
            <button onClick={clearCart} className="cart__clear-btn">
              Очистить корзину
            </button>

            <Link to="/checkout" className="cart__checkout-btn">
              Оформить заказ
            </Link>

            <Link to="/catalog" className="cart__continue-shopping">
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
