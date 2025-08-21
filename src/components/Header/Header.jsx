// src/components/Header/Header.jsx
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import "./Header.scss";

const Header = () => {
  // Пробуем использовать хранилище. Если его нет - будет 0.
  let totalItems = 0;
  try {
    totalItems = useCartStore((state) => state.getTotalItems());
  } catch (error) {
    console.error("Ошибка загрузки хранилища корзины:", error);
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/geekshop/" className="header__logo">
          {" "}
          GeekShop
        </Link>
        <nav className="header__nav">
          <Link to="/catalog">Каталог</Link>
          <Link to="/cart" className="header__cart-link">
            Корзина
            {totalItems > 0 && (
              <span className="header__cart-count">{totalItems}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
