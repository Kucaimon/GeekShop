import { useState, useEffect } from "react";
import { fetchProducts } from "../../api/mockData";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Catalog.scss";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  useEffect(() => {
    let result = [...products];

    // 1. Фильтрация по категории
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // 2. ФИЛЬТРАЦИЯ ПО НАЛИЧИЮ - ПОКАЗЫВАЕМ ТОЛЬКО ТОВАРЫ В НАЛИЧИИ
    result = result.filter((product) => product.inStock);

    // 3. Сортировка
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
      default:
        result.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy]);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="catalog">
      <div className="catalog__container">
        <h1>Каталог товаров</h1>

        <div className="catalog__controls">
          <div className="catalog__filters">
            <span>Категория:</span>
            {categories.map((category) => (
              <button
                key={category}
                className={`catalog__filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category === "all" ? "Все" : category}
              </button>
            ))}
          </div>

          <div className="catalog__sort">
            <span>Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="catalog__sort-select"
            >
              <option value="popularity">По популярности</option>
              <option value="price-asc">По цене (дешевые first)</option>
              <option value="price-desc">По цене (дорогие first)</option>
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="catalog__loading">
            <p>Загружаем товары...</p>
          </div>
        )}

        {!isLoading && (
          <div className="catalog__grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="catalog__empty">
            <p>Товары не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
