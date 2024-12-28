/* eslint-disable react/prop-types */
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = ({ products, loading }) => {
  const [modalProduct, setModalProduct] = useState(null);
  const [clickedProductId, setClickedProductId] = useState(null);

  const handleQuickView = (product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);

  const handleCardClick = (productId) => {
    setClickedProductId(clickedProductId === productId ? null : productId);
  };

  return (
    <div className="product-list-container">
      {loading ? (
        // Conditionally render skeleton loader or product list
        <>
          {Array(8)
            .fill()
            .map((_, index) => (
              <div key={index} className="product-card">
                <Skeleton height={200} />
                <Skeleton count={3} style={{ marginTop: 10 }} />
              </div>
            ))}
        </>
      ) : (
        <>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={handleQuickView}
              onCardClick={() => handleCardClick(product.id)}
              isClicked={clickedProductId === product.id}
            />
          ))}
          {modalProduct && (
            <ProductModal product={modalProduct} onClose={closeModal} />
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
