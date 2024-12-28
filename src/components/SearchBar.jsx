/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SearchBar = ({ setQuery }) => {
  const [localQuery, setLocalQuery] = useState("");
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setQuery(localQuery);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [localQuery]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search products..."
        className="search-input"
      />
      <div className="cart-icon">
        <ShoppingCartIcon />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div>
    </div>
  );
};

export default SearchBar;
