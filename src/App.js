import './App.css';
import Categories from './components/Categories';
import ProductPage from './components/ProductsPage';
import Dashboard from './layouts/Dashboard';

function App() {
  return (
    <div className="App">
      <h1>Product Page</h1>
      <Dashboard />
     <ProductPage />
     <Categories />
    </div>
  );
}

export default App;
