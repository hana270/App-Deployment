import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

function SmartWatches() {
  const [watches, setWatches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [watchesRes, categoriesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/smartwatches'),
        axios.get('http://localhost:5000/api/categories')
      ]);
      setWatches(watchesRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/smartwatches/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/smartwatches', formData);
      }
      fetchData();
      setFormData({ name: '', categoryId: '', price: '', image: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:5000/api/smartwatches/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h2>Smartwatches</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Price"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Smartwatch</button>
      </form>

      <div className="grid-container">
        {watches.map(watch => (
          <div key={watch.id} className="card">
            <img src={watch.image} alt={watch.name} className="card-image" />
            <div className="card-content">
              <h3>{watch.name}</h3>
              <p>Category: {watch.category}</p>
              <p>Price: ${watch.price}</p>
              <div className="card-actions">
                <button onClick={() => {
                  setFormData(watch);
                  setEditingId(watch.id);
                }}>Edit</button>
                <button onClick={() => handleDelete(watch.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmartWatches;

