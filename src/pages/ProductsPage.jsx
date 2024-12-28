import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import axios from "axios";

const ProductsPage = () => {
  document.title = "Products";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = query
          ? await axios.get(`https://dummyjson.com/products/search?q=${query}`)
          : await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="products-page">
      <div className="header">
        <SearchBar setQuery={setQuery} />
      </div>
      <ProductList products={products} loading={loading} />
    </div>
  );
};

export default ProductsPage;
