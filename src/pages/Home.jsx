import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products"
import { Link } from "react-router-dom"
export default function Home() {
  const products = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShopHub</h1>
        <p className="home-description">Your one-stop shop for all your needs. Discover amazing products and unbeatable prices.</p>
      </div>
      <div className="container">
        <h2 className="page-title">Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
           <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}