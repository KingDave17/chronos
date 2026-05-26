import { useState, useEffect } from "react";
import "./ProductCard.css";

export default function ProductCard(props) {
  const [addTrigger, setAddTrigger] = useState(0);

  useEffect(() => {
    if (addTrigger > 0) {
      const timer = setTimeout(() => {
        setAddTrigger(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [addTrigger]);

  function handleAddToCart() {
    props.cartClick(props.id);
    setAddTrigger(prev => prev + 1);
  }

  return (
    <article className="product-card" aria-labelledby={`product-title-${props.id}`}>
      <div className="card-image-wrapper">
        <img src={props.imageUrl} alt={`Destination: ${props.title}`} className="product-image" />
        <span className={`era-badge era-${props.era.toLowerCase()}`} aria-label={`Era: ${props.era}`}>{props.era}</span>
        <span className="year-tag" aria-label={`Year: ${props.year}`}>{props.year}</span>
      </div>
      <div className="card-body">
        <h3 id={`product-title-${props.id}`} className="product-name">{props.title}</h3>
        <p className="product-description">{props.description}</p>
        <div className="card-footer">
          <span className="product-price" aria-label={`Price: ${props.price.toLocaleString()} Temporal Credits`}>{props.price.toLocaleString()} TC</span>
          <div className="button-container">
            <button 
              onClick={handleAddToCart} 
              className="add-to-cart-btn"
              aria-label={`Add ${props.title} to cart`}
            >
              Add to Cart
            </button>
            {addTrigger > 0 && <span key={addTrigger} className="added-popup" aria-live="polite">Added!</span>}
          </div>
        </div>
      </div>
    </article>
  );
}