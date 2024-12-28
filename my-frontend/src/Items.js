import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function Items() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState(null);

useEffect(() => {
  axios.get(`${BACKEND_URL}/items`)
    .then(response => {
      console.log(response.data); 
      setItems(response.data);
    })
    .catch(err => console.error(err));
}, []);

  // Ajouter un article
  const addItem = () => {
    if (!newItemName) return;
    axios.post(`${BACKEND_URL}/items`, { name: newItemName })
      .then(response => setItems([...items, response.data]))
      .catch(err => console.error(err));
    setNewItemName('');
  };

  // Mettre à jour un article
  const updateItem = (id, name) => {
    axios.put(`${BACKEND_URL}/items/${id}`, { name })
      .then(response => {
        setItems(items.map(item => (item.id === id ? response.data : item)));
        setEditingItem(null);
      })
      .catch(err => console.error(err));
  };

  // Supprimer un article
  const deleteItem = id => {
    axios.delete(`${BACKEND_URL}/items/${id}`)
      .then(() => setItems(items.filter(item => item.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Gestion des articles</h2>
      <input
        type="text"
        value={newItemName}
        onChange={e => setNewItemName(e.target.value)}
        placeholder="Nom de l'article"
      />
      <button onClick={addItem}>Ajouter</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {editingItem === item.id ? (
              <>
                <input
                  type="text"
                  defaultValue={item.name}
                  onBlur={e => updateItem(item.id, e.target.value)}
                  autoFocus
                />
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => setEditingItem(item.id)}>Modifier</button>
                <button onClick={() => deleteItem(item.id)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;

