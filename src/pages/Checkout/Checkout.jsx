import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import "./Checkout.scss";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    // Шаг 1: Данные клиента
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Шаг 2: Доставка
    deliveryMethod: "courier",
    city: "",
    address: "",
    postalCode: "",

    // Шаг 3: Оплата
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const totalPrice = getTotalPrice();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Здесь будет отправка данных на бэкенд
    console.log("Заказ оформлен:", {
      orderData,
      items,
      totalPrice,
      orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
    });

    // Очищаем корзину и показываем подтверждение
    clearCart();
    setCurrentStep(4); // Переходим к шагу подтверждения
  };

  // Шаг 1: Данные клиента
  const renderStep1 = () => (
    <div className="checkout-step">
      <h2>Ваши данные</h2>
      <div className="checkout-form__grid">
        <div className="checkout-form__group">
          <label>Имя *</label>
          <input
            type="text"
            name="firstName"
            value={orderData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form__group">
          <label>Фамилия *</label>
          <input
            type="text"
            name="lastName"
            value={orderData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form__group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={orderData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form__group">
          <label>Телефон *</label>
          <input
            type="tel"
            name="phone"
            value={orderData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );

  // Шаг 2: Доставка
  const renderStep2 = () => (
    <div className="checkout-step">
      <h2>Способ доставки</h2>

      <div className="checkout-form__group">
        <label>Метод доставки</label>
        <select
          name="deliveryMethod"
          value={orderData.deliveryMethod}
          onChange={handleInputChange}
        >
          <option value="courier">Курьерская доставка</option>
          <option value="pickup">Самовывоз</option>
          <option value="post">Почта России</option>
        </select>
      </div>

      {orderData.deliveryMethod !== "pickup" && (
        <div className="checkout-form__grid">
          <div className="checkout-form__group">
            <label>Город *</label>
            <input
              type="text"
              name="city"
              value={orderData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="checkout-form__group">
            <label>Адрес *</label>
            <input
              type="text"
              name="address"
              value={orderData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="checkout-form__group">
            <label>Почтовый индекс</label>
            <input
              type="text"
              name="postalCode"
              value={orderData.postalCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
    </div>
  );

  // Шаг 3: Оплата
  const renderStep3 = () => (
    <div className="checkout-step">
      <h2>Способ оплаты</h2>

      <div className="checkout-form__group">
        <label>Метод оплаты</label>
        <select
          name="paymentMethod"
          value={orderData.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="card">Банковская карта</option>
          <option value="cash">Наличные при получении</option>
          <option value="online">Онлайн-перевод</option>
        </select>
      </div>

      {orderData.paymentMethod === "card" && (
        <div className="checkout-form__grid">
          <div className="checkout-form__group">
            <label>Номер карты *</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={orderData.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="checkout-form__group">
            <label>Срок действия *</label>
            <input
              type="text"
              name="cardExpiry"
              placeholder="MM/YY"
              value={orderData.cardExpiry}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="checkout-form__group">
            <label>CVV *</label>
            <input
              type="text"
              name="cardCvv"
              placeholder="123"
              value={orderData.cardCvv}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      )}
    </div>
  );

  // Шаг 4: Подтверждение
  const renderStep4 = () => (
    <div className="checkout-step checkout-step--success">
      <div className="checkout-success">
        <div className="checkout-success__icon">🎉</div>
        <h2>Заказ оформлен!</h2>
        <p>
          Спасибо за ваш заказ. Номер вашего заказа:{" "}
          <strong>
            GEEK-{Math.random().toString(36).substr(2, 6).toUpperCase()}
          </strong>
        </p>
        <p>На вашу почту отправлено подтверждение заказа.</p>
        <button
          onClick={() => navigate("/")}
          className="checkout-success__button"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );

  if (items.length === 0 && currentStep !== 4) {
    return (
      <div className="checkout">
        <div className="checkout__container">
          <h1>Оформление заказа</h1>
          <div className="checkout-empty">
            <p>Ваша корзина пуста</p>
            <button onClick={() => navigate("/catalog")}>
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout__container">
        <h1>Оформление заказа</h1>

        {/* Прогресс-бар */}
        {currentStep < 4 && (
          <div className="checkout-progress">
            <div className="checkout-progress__steps">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`checkout-progress__step ${
                    step === currentStep
                      ? "active"
                      : step < currentStep
                      ? "completed"
                      : ""
                  }`}
                >
                  <span className="checkout-progress__number">{step}</span>
                  <span className="checkout-progress__label">
                    {step === 1 && "Данные"}
                    {step === 2 && "Доставка"}
                    {step === 3 && "Оплата"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="checkout-content">
          {/* Левая колонка: Форма */}
          <div className="checkout-form">
            <form onSubmit={handleSubmitOrder}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              {currentStep < 4 && (
                <div className="checkout-form__actions">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="checkout-form__button checkout-form__button--secondary"
                    >
                      Назад
                    </button>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="checkout-form__button"
                    >
                      Продолжить
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="checkout-form__button checkout-form__button--primary"
                    >
                      Оформить заказ
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Правая колонка: Итоги заказа */}
          {currentStep < 4 && (
            <div className="checkout-summary">
              <h3>Ваш заказ</h3>

              <div className="checkout-summary__items">
                {items.map((item) => (
                  <div key={item.id} className="checkout-summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="checkout-summary-item__info">
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} × {item.price.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-summary__total">
                <div className="checkout-summary__row">
                  <span>Промежуточный итог:</span>
                  <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="checkout-summary__row">
                  <span>Доставка:</span>
                  <span>Бесплатно</span>
                </div>
                <div className="checkout-summary__row checkout-summary__row--total">
                  <span>Итого:</span>
                  <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
