/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductCard = ({ product, onQuickView, onCardClick, isClicked }) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    getProductQuantity,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setQuantity(getProductQuantity(product.id));
  }, [cart, product.id, getProductQuantity]);

  useEffect(() => {
    setIsFavorited(isFavorite(product.id));
  }, [product.id, isFavorite]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isInCart = cart.some((item) => item.id === product.id);

  const oldPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;
  const discount = (oldPrice - product.price).toFixed(2);

  const handleAddToCart = () => {
    setQuantity((prev) => prev + 1);
    addToCart(product);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    addToCart(product);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      removeFromCart(product.id);
    } else {
      setQuantity(0);
      removeFromCart(product.id);
    }
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      className={`product-card ${isClicked ? "clicked" : ""}`}
      onClick={isMobile ? onCardClick : undefined}
    >
      <div className="discount-badge">- ৳ {discount} </div>
      <div className="favorite-icon" onClick={toggleFavorite}>
        {isFavorited ? (
          <FavoriteIcon style={{ color: "red", fontSize: 32 }} />
        ) : (
          <FavoriteBorderIcon style={{ fontSize: 32 }} />
        )}
      </div>
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
        <div className="hover-buttons">
          {isInCart ? (
            <div className="add-to-cart-button added">
              <button className="quantity-btn" onClick={handleDecrease}>
                <RemoveShoppingCartIcon />
              </button>
              <span>{quantity} Added in Cart</span>
              <button className="quantity-btn" onClick={handleIncrease}>
                <AddShoppingCartIcon />
              </button>
            </div>
          ) : (
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              <AddShoppingCartIcon /> Add to Cart
            </button>
          )}
          <button
            className="quick-view-button"
            onClick={() => onQuickView(product)}
          >
            <VisibilityIcon /> Quick View
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div>
          <span className="product-price">৳ {product.price}</span>
          {oldPrice && <span className="product-old-price">৳ {oldPrice}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
