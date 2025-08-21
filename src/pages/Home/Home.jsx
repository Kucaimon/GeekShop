import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../api/mockData";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.scss";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await fetchProducts();
        // Выбираем 4 самых популярных товара для главной
        const featured = products
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 4);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div className="home">
      {/* Герой секция */}
      <section className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__title">
            Добро пожаловать в{" "}
            <span className="home-hero__accent">GeekShop</span>
          </h1>
          <p className="home-hero__subtitle">
            Магазин мерча для настоящих гиков. Футболки, худи, аксессуары и
            многое другое с крутыми IT-принтами.
          </p>
          <div className="home-hero__actions">
            <Link to="/catalog" className="home-hero__cta">
              Смотреть каталог
            </Link>
            <Link to="/about" className="home-hero__secondary">
              О нас
            </Link>
          </div>
        </div>
        <div className="home-hero__image">
          <div className="home-hero__placeholder">🚀 👨‍💻 🎮</div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="home-features">
        <div className="home-features__container">
          <h2 className="home-features__title">Почему выбирают нас</h2>
          <div className="home-features__grid">
            <div className="home-feature">
              <div className="home-feature__icon">🚚</div>
              <h3>Быстрая доставка</h3>
              <p>Доставляем заказы по всей России за 2-5 дней</p>
            </div>
            <div className="home-feature">
              <div className="home-feature__icon">⭐</div>
              <h3>Качественные товары</h3>
              <p>Только качественные материалы и печать</p>
            </div>
            <div className="home-feature">
              <div className="home-feature__icon">💳</div>
              <h3>Удобная оплата</h3>
              <p>Любые способы оплаты: картой, наличными, онлайн</p>
            </div>
            <div className="home-feature">
              <div className="home-feature__icon">👕</div>
              <h3>Уникальный дизайн</h3>
              <p>Эксклюзивные принты для IT-специалистов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="home-products">
        <div className="home-products__container">
          <div className="home-products__header">
            <h2>Популярные товары</h2>
            <Link to="/catalog" className="home-products__link">
              Все товары →
            </Link>
          </div>

          {isLoading ? (
            <div className="home-products__loading">
              <p>Загружаем популярные товары...</p>
            </div>
          ) : (
            <div className="home-products__grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA секция */}
      <section className="home-cta">
        <div className="home-cta__container">
          <h2>Готовы начать покупки?</h2>
          <p>Откройте для себя весь наш ассортимент в каталоге товаров</p>
          <Link to="/catalog" className="home-cta__button">
            Перейти в каталог
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
