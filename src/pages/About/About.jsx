import { useState } from "react";
import { Link } from "react-router-dom";
import "./About.scss";

const About = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Имитация отправки на сервер
    setTimeout(() => {
      console.log("Email подписан:", email);
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1000);
  };

  return (
    <div className="about">
      <div className="about__container">
        {/* Герой секция */}
        <section className="about-hero">
          <h1>О GeekShop</h1>
          <p>Магазин для тех, кто живет технологиями и любит стильный мерч</p>
        </section>

        {/* Основной контент */}
        <div className="about-content">
          {/* Наша история */}
          <section className="about-section">
            <div className="about-section__text">
              <h2>Наша история</h2>
              <p>
                GeekShop начался с простой идеи — создать место, где
                IT-специалисты, геймеры и tech-энтузиасты могут найти
                качественный мерч с крутыми принтами, который отражает их
                страсть к технологиям.
              </p>
              <p>
                Основанный в 2023 году, наш магазин быстро вырос из маленького
                стартапа в сообщество единомышленников, которые ценят качество,
                стиль и индивидуальность.
              </p>
            </div>
            <div className="about-section__image">
              <div className="about-image-placeholder">🚀</div>
            </div>
          </section>

          {/* Наши ценности */}
          <section className="about-section">
            <h2>Наши ценности</h2>
            <div className="cards-grid">
              <div className="card">
                <div className="card__icon">💻</div>
                <h3>Качество</h3>
                <p>Используем только лучшие материалы и технологии печати</p>
              </div>
              <div className="card">
                <div className="card__icon">❤️</div>
                <h3>Сообщество</h3>
                <p>Создаем продукты, которые объединяют людей</p>
              </div>
              <div className="card">
                <div className="card__icon">🌱</div>
                <h3>Устойчивость</h3>
                <p>Заботимся об экологии и используем sustainable материалы</p>
              </div>
              <div className="card">
                <div className="card__icon">🎨</div>
                <h3>Креативность</h3>
                <p>Каждый дизайн — это уникальное произведение искусства</p>
              </div>
            </div>
          </section>

          {/* Команда */}
          <section className="about-section">
            <h2>Наша команда</h2>
            <div className="cards-grid">
              <div className="card">
                <div className="card__icon">👨‍💻</div>
                <h3>Алексей</h3>
                <p>Основатель & CEO</p>
                <span>Бывший lead developer</span>
              </div>
              <div className="card">
                <div className="card__icon">👩‍🎨</div>
                <h3>Мария</h3>
                <p>Главный дизайнер</p>
                <span>Создает крутые принты</span>
              </div>
              <div className="card">
                <div className="card__icon">👨‍💼</div>
                <h3>Дмитрий</h3>
                <p>Операционный директор</p>
                <span>Следит за качеством</span>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="about-cta">
            <h2>Присоединяйтесь к нашему сообществу</h2>
            <p>Следите за нами в соцсетях и будьте в курсе новинок</p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="subscribe-form">
                <div className="subscribe-form__group">
                  <input
                    type="email"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="subscribe-form__input"
                  />
                  <button
                    type="submit"
                    className="cta-button cta-button--primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Отправка..." : "Подписаться"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="subscribe-success">
                <p>🎉 Спасибо за подписку! Проверьте вашу почту.</p>
              </div>
            )}

            <div className="about-cta__actions">
              <Link to="/catalog" className="cta-button cta-button--secondary">
                Смотреть каталог
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
