import './CheckoutModal.css';

export default function CheckoutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} aria-hidden="true">
      <div 
        className="checkout-modal" 
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <div className="modal-icon" aria-hidden="true">⏳</div>
        <h2 id="modal-title">Sequence Authorized</h2>
        <p id="modal-desc">Your timelines have been successfully booked. Our chrononaut specialists will contact you shortly with departure protocols.</p>
        <button onClick={onClose} className="modal-close-btn" aria-label="Acknowledge and close modal">Acknowledge</button>
      </div>
    </div>
  );
}