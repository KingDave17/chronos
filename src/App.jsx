import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard';
import destinations from './data/destinations.json';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [era, setEra] = useState("");
  const [price, setPrice] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [text, setText] = useState("") 

  let processedDestinations = [...destinations]; 

  if (era) {
    processedDestinations = processedDestinations.filter(item => item.era.toLowerCase() === era);
  }

  if (price === "low") {
    processedDestinations.sort((a, b) => a.price - b.price);
  } else if (price === "high") {
    processedDestinations.sort((a, b) => b.price - a.price);
  }

  const finalCards = processedDestinations.map(item => (
    <ProductCard
      key={item.id}
      id={item.id}
      title={item.title} 
      era={item.era}
      year={item.year}
      price={item.price}
      description={item.description}
      imageUrl={item.imageUrl}
      cartClick={cartClick}
    />
  ));

  function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(prevCart => {
        return prevCart.map(cartItem => {
          if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      });
    } else {
      setCart(prev => [...prev, {...item, quantity: 1}]);
    }
  }
  
  function cartClick(id) {
    destinations.map((item) => {
      if (item.id === id) {
        addToCart(item);
      }
    })
  }

  function renderCart() {
    setDrawerOpen(prev => !prev)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const data = event.currentTarget
    // const formData = new FormData(data)
    // const name = formData.get("name")
    // const email = formData.get("email")
    // const message = formData.get("message")
    data.reset()
  }
  
  return (
    <div className="app-container">
      <header className="main-header" role="banner">
        <h1 className="logo">CHRONOS</h1>
        <nav className="nav-links" aria-label="Main Navigation">
          <a href="#destinations">Eras</a>
          <a href="#contact">Contact Support</a>
        </nav>
        <button 
          onClick={renderCart} 
          className="cart-btn"
          aria-label={`Open shopping cart with ${cart.length} items`}
        >
          Cart ({cart.length})
        </button>
      </header>

      <main role="main">
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="badge">TIMELINE STABLE</span>
            <h2>Master Your Timeline</h2>
            <p>Bespoke temporal voyages for the discerning traveler. Experience history not as it was written, but as it was lived!</p>
          </div>
          
          <div className="booking-bar" aria-label="Filter and Sort options">
            <div className="input-group">
              <label htmlFor="era-filter">Destination Era</label>
              <select id="era-filter" onChange={(event) => setEra(event.currentTarget.value)} defaultValue="">
                <option value="">All Epochs</option>
                <option value="past">The Ancient Past</option>
                <option value="future">The Distant Future</option>
                <option value="alternate">Alternate Timelines</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="price-sort">Sort By</label>
              <select id="price-sort" onChange={(event) => setPrice(event.currentTarget.value)} defaultValue="">
                <option value="">Default Sort</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </section>

        <section id="destinations" className="products-section" aria-label="Time Travel Destinations">
          {finalCards}
        </section>

        <section id="contact" className="contact-section">
          <h2>Contact Chronos Support</h2>
          <p>Have questions about a timeline or experiencing a temporal paradox? Send a transmission to our specialists below.</p>
          
          <form className="contact-form" onSubmit={handleSubmit} aria-label="Support Contact Form">
            <input type="text" name="name" placeholder="Your Name" aria-label="Your Name" aria-required="true" onChange={(event) => setName(event.currentTarget.value)} />
            <input type="email" name="email" placeholder="Email Address" aria-label="Email Address" aria-required="true" onChange={(event) => setEmail(event.currentTarget.value)} />
            <textarea name="message" rows="5" placeholder="Your Message..." aria-label="Your Message" aria-required="true" onChange={(event) => setText(event.currentTarget.value)} ></textarea>
            <button disabled={!name || !email || !text} type="submit" className="submit-btn" aria-label="Send Transmission">Send Transmission</button>
          </form>
          

          <div className="contact-links">
            <a href="mailto:ajibaveday@gmail.com">Email Me</a>
            <a href="https://linkedin.com/in/kingdave17" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/KingDave17" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>

        <CartDrawer 
          isOpen={drawerOpen} 
          onClose={() => setDrawerOpen(false)} 
          cart={cart}
          setCart={setCart}
          onCheckoutSuccess={() => setIsModalOpen(true)}
        />
        
        <CheckoutModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </main>

      <footer className="main-footer" role="contentinfo">
        <p>&copy; {new Date().getFullYear()} CHRONOS Temporal Booking Agency. All rights reserved across all timelines.</p>
      </footer>
    </div>
  )
}