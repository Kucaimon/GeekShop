import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../api/mockData";
import useCartStore from "../../store/useCartStore";
import "./Product.scss";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addItem, getItemQuantity, updateItemQuantity } = useCartStore();
  const quantityInCart = getItemQuantity(product?.id);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Товар не найден");
        console.error("Ошибка загрузки товара:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleIncrease = () => {
    updateItemQuantity(product.id, quantityInCart + 1);
  };

  const handleDecrease = () => {
    updateItemQuantity(product.id, quantityInCart - 1);
  };

  if (isLoading) {
    return (
      <div className="product-loading">
        <p>Загрузка товара...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-error">
        <h2>{error || "Товар не найден"}</h2>
        <Link to="/catalog" className="back-link">
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  return (
    <div className="product">
      <div className="product__container">
        <nav className="product__breadcrumbs">
          <Link to="/">Главная</Link>
          <span> / </span>
          <Link to="/catalog">Каталог</Link>
          <span> / </span>
          <span>{product.name}</span>
        </nav>

        <div className="product__content">
          <div className="product__gallery">
            <div className="product__thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`product__thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="product__main-image">
              <img src={images[selectedImage]} alt={product.name} />
            </div>
          </div>

          <div className="product__info">
            <h1 className="product__title">{product.name}</h1>

            <div className="product__meta">
              <span className="product__category">
                Категория: {product.category}
              </span>
              <span
                className={`product__stock ${
                  product.inStock ? "in-stock" : "out-of-stock"
                }`}
              >
                {product.inStock ? "✓ В наличии" : "✗ Нет в наличии"}
              </span>
            </div>

            <p className="product__description">{product.description}</p>

            <div className="product__price-section">
              <span className="product__price">
                {product.price.toLocaleString("ru-RU")} ₽
              </span>

              <div className="product__cart-controls">
                {quantityInCart > 0 ? (
                  <div className="product__quantity-controls">
                    <button
                      onClick={handleDecrease}
                      className="product__quantity-btn"
                    >
                      −
                    </button>
                    <span className="product__quantity">{quantityInCart}</span>
                    <button
                      onClick={handleIncrease}
                      className="product__quantity-btn"
                      disabled={!product.inStock}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="product__add-btn"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Добавить в корзину" : "Нет в наличии"}
                  </button>
                )}
              </div>
            </div>

            <div className="product__actions">
              <button
                onClick={() => navigate(-1)}
                className="product__back-btn"
              >
                ← Назад
              </button>
              <Link to="/cart" className="product__cart-link">
                Перейти в корзину
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
