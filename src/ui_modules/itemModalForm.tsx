import { Item } from "../data/datamodels";

// Reusable form fields shared by Add and Edit modals
export const ItemForm: React.FC<{
  formData: Item;
  setFormData: React.Dispatch<React.SetStateAction<Item>>;
  showScanner: boolean;
  setShowScanner: (v: boolean) => void;
  handleScanResult: (error: unknown, result: { text?: string } | undefined) => void;
}> = ({ formData, setFormData, showScanner, setShowScanner, handleScanResult }) => (
  <>
    {/* ID */}
    <div className="field-group">
      <label className="field-label">Item ID</label>
      <div className="input-with-button">
        <input
          type="text"
          className="field-input"
          placeholder="ID"
          value={formData.id}
          onChange={(e) => { const v = e.target.value; setFormData((p) => ({ ...p, id: v })); }}
        />
        <button className="scan-button" onClick={() => setShowScanner(true)}>Scan</button>
      </div>
      <span className="helper-text">Scan barcode or enter manually</span>
    </div>

    {showScanner && (
      <div className="scanner-container">
        <SafeScanner onUpdate={handleScanResult} />
        <button onClick={() => setShowScanner(false)}>Cancel</button>
      </div>
    )}

    {/* Name */}
    <div className="field-group">
      <label className="field-label">Name</label>
      <input
        type="text"
        className="field-input"
        placeholder="Item name"
        value={formData.name}
        onChange={(e) => { const v = e.target.value; setFormData((p) => ({ ...p, name: v })); }}
      />
    </div>

    {/* Quantity */}
    <div className="field-group">
      <label className="field-label">Quantity</label>
      <div className="quantity-control">
        <button className="qty-btn"
          onClick={() => setFormData((p) => ({ ...p, quantity: Math.max(1, p.quantity - 1) }))}>−</button>
        <input
          type="number"
          className="field-input qty-input"
          min={1}
          value={formData.quantity}
          onChange={(e) => { const v = Math.max(1, Number(e.target.value)); setFormData((p) => ({ ...p, quantity: v })); }}
        />
        <button className="qty-btn"
          onClick={() => setFormData((p) => ({ ...p, quantity: p.quantity + 1 }))}>+</button>
      </div>
    </div>

    {/* Category */}
    <div className="field-group">
      <label className="field-label">Category</label>
      <select
        className="field-input field-select"
        value={formData.category}
        onChange={(e) => { const v = e.target.value; setFormData((p) => ({ ...p, category: v })); }}
      >
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Food">Food</option>
        <option value="Books">Books</option>
      </select>
    </div>
  </>
);