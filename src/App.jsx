import { CartProvider } from './components/CartContext';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <CartProvider>
      <ProductsPage />
    </CartProvider>
  );
}

export default App;
