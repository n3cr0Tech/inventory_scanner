import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { createMockData } from './data/createMockData';
import { EMPTY_FORM, Item } from './data/datamodels';
import { PlusIcon } from './ui_modules/symbols';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [items, setItems] = useState<Item[]>(createMockData());
  const [addForm, setAddForm] = useState<Item>(EMPTY_FORM);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Item>(EMPTY_FORM);
  const [editShowScanner, setEditShowScanner] = useState(false);

  const handleScanResult = (error: unknown, result: { text?: string } | undefined) => {
    if (result?.text) {
      setAddForm((p) => ({ ...p, id: result.text! }));
      setShowScanner(false);
    }
  };

  const handleEditScanResult = (error: unknown, result: { text?: string } | undefined) => {
    if (result?.text) {
      setEditForm((p) => ({ ...p, id: result.text! }));
      setEditShowScanner(false);
    }
  };

  const handleAdd = () => {
    if (!addForm.id.trim()) return;
    setItems((p) => [...p, addForm]);
    setAddForm(EMPTY_FORM);
    setShowAddModal(false);
  };

  const handleCardTap = (index: number) => {
    setEditIndex(index);
    setEditForm({ ...items[index] });
  };

  const handleEditSave = () => {
    if (editIndex === null) return;
    setItems((p) => p.map((item, i) => (i === editIndex ? editForm : item)));
    setEditIndex(null);
  };

  const handleDelete = () => {
    if (editIndex === null) return;
    setItems((p) => p.filter((_, i) => i !== editIndex));
    setEditIndex(null);
  };

  const visibleItems = items;

  return (
    <div className="App">
      <div className="cards-wrapper">
        <div className="card-container">
          {items.length === 0 && (
            <p className="empty-state">No items yet. Tap + to add one.</p>
          )}
          {items.length > 0 && visibleItems.length === 0 && (
            <p className="empty-state">No items match "{searchQuery}".</p>
          )}
          {visibleItems.map((item, index) => {
            const realIndex = items.indexOf(item);
            return (
              <div key={realIndex} className="card" onClick={() => handleCardTap(realIndex)}>
                <h3>{item.name || item.id}</h3>
                <p className="card-id">{item.id}</p>
                <p><strong>Qty:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
              </div>
            );
          })}
        </div>
      </div>

      <button className="plus-button" onClick={() => setShowAddModal(true)}>
        <PlusIcon />
      </button>

      {/* ── Add Modal ── */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Item</h2>
            <ItemForm
              formData={addForm}
              setFormData={setAddForm}
              showScanner={showScanner}
              setShowScanner={setShowScanner}
              handleScanResult={handleScanResult}
            />
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => { setShowAddModal(false); setAddForm(EMPTY_FORM); }}>Cancel</button>
              <button className="btn-submit" onClick={handleAdd}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editIndex !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Item</h2>
              <button className="btn-trash" onClick={handleDelete}><TrashIcon /></button>
            </div>
            <ItemForm
              formData={editForm}
              setFormData={setEditForm}
              showScanner={editShowScanner}
              setShowScanner={setEditShowScanner}
              handleScanResult={handleEditScanResult}
            />
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setEditIndex(null)}>Cancel</button>
              <button className="btn-submit" onClick={handleEditSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default App;
