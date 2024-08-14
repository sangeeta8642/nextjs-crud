"use client";
import { useState, useEffect } from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

export default function Home() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data.data);
  }

  async function CreateOrUpdate(form) {
    if (editingItem) {
      await fetch(`/api/items/${editingItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      setEditingItem(null);
    } else {
      await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
    }
    fetchItems();
  }

  async function Delete(id) {
    await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });
    fetchItems();
    alert("Are you sure to delete this item?")
  }

  function Edit(item) {
    setEditingItem(item);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">CRUD App</h1>
      <ItemForm onSubmit={CreateOrUpdate} initialData={editingItem} />
      <ItemList items={items} onDelete={Delete} onEdit={Edit} />
    </div>
  );
}
