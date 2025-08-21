import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { addItem, getItemQuantity } = useCartStore();

  const quantityInCart = getItemQuantity(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Чтобы не переходить по ссылке при клике на кнопку
    e.stopPropagation(); // Останавливаем всплытие события
    addItem(product);
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        {/* Изображение товара */}
        <div className="product-card__image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
          {!product.inStock && (
            <div className="product-card__out-of-stock">Нет в наличии</div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="product-card__info">
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__description">{product.description}</p>

          <div className="product-card__footer">
            <span className="product-card__price">
              {product.price.toLocaleString("ru-RU")} ₽
            </span>

            {/* Кнопка добавления в корзину */}
            <button
              className={`product-card__add-btn ${
                quantityInCart > 0 ? "in-cart" : ""
              }`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              aria-label="Добавить в корзину"
            >
              {quantityInCart > 0
                ? `В корзине: ${quantityInCart}`
                : "В корзину"}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
