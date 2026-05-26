import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cart, setCart, onCheckoutSuccess }) {
  
  const itemPrice = cart.map((value) => {
    return (value.quantity * value.price)
  })
  const totalPrice = itemPrice.reduce((acc, curr) => acc + curr, 0)
  
  
  
  function increaseItem(id) {
    setCart(prev => prev.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  }

  function decreaseItem(id) {
    setCart(prev => prev.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  }

  function deleteItem(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    onCheckoutSuccess();
    setCart([]);
    onClose();
  }

  return (
    <>
      <div 
        className={`cart-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      ></div>

      <div 
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="cart-header">
          <h2 id="cart-title">Your Timelines</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart drawer">&times;</button>
        </div>
        
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.title} className="cart-item-img" />
              
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <span className="cart-item-era">{item.era} Epoch</span>
                
                <div className="cart-item-price-row">
                  <div className="item-price-calc">
                    <span className="unit-price">{item.price.toLocaleString()} TC</span>
                    <span className="subtotal-price">{(item.price * item.quantity).toLocaleString()} TC</span>
                  </div>
                  
                  <div className="qty-controls">
                    <button onClick={() => decreaseItem(item.id)} className="qty-btn" aria-label="Decrease quantity">-</button>
                    <span aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                    <button onClick={() => increaseItem(item.id)} className="qty-btn" aria-label="Increase quantity">+</button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => deleteItem(item.id)} 
                className="remove-btn" 
                title="Remove Timeline"
                aria-label={`Remove ${item.title} from cart`}
              >&times;</button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total" aria-live="polite">
            <span>Total Temporal Cost</span>
            <span className="total-price">{totalPrice.toLocaleString()} TC</span>
          </div>
          <button 
            className="checkout-btn" 
            onClick={handleCheckout} 
            disabled={cart.length === 0}
          >
            Authorize Sequence
          </button>
        </div>
      </div>
    </>
  );
}