import React, { useState } from 'react';
import { FiSave, FiPlus } from 'react-icons/fi';
import "../Styles/CrearTutoria.css";

const CrearTutoria = () => {
  // Categorías iniciales con descripción
  const initialCategories = [
    { name: "Matemáticas", description: "Álgebra, cálculo, geometría y más" },
    { name: "Ciencias", description: "Física, química, biología" },
    { name: "Literatura", description: "Análisis literario, escritura creativa" },
    { name: "Idiomas", description: "Inglés, francés, español para extranjeros" },
    { name: "Otro", description: "Otras áreas de conocimiento" }
  ];

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    duration: 4,
    price: 0
  });

  const [categories, setCategories] = useState(initialCategories);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() && !categories.some(cat => cat.name === newCategory.name)) {
      const categoryToAdd = {
        name: newCategory.name,
        description: newCategory.description || 'Sin descripción'
      };
      
      setCategories([...categories, categoryToAdd]);
      setFormData(prev => ({ ...prev, category: newCategory.name }));
      setNewCategory({ name: '', description: '' });
      setShowAddCategory(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.category) {
        throw new Error('Por favor selecciona o crea una categoría');
      }
      
      // Aquí iría la lógica para enviar los datos al backend
      console.log("Tutoría creada:", formData);
      // Redireccionar o mostrar mensaje de éxito
    } catch (err) {
      setError(err.message || 'Error al crear la tutoría');
    }
  };

  return (
    <div className="crear-tutoria-container">
      <form onSubmit={handleSubmit} className="crear-tutoria-form">
        <div className="crear-tutoria-header">
          <h1>Crear Nueva Tutoría</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-section">
          <div className="form-group">
            <label>Título de la tutoría</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ej: Matemáticas Básicas"
              required
            />
          </div>

          <div className="form-group">
            <div className="category-header">
              <label>Categoría</label>
              {!showAddCategory && (
                <button 
                  type="button" 
                  onClick={() => setShowAddCategory(true)}
                  className="add-category-btn"
                >
                  <FiPlus size={14} /> Añadir categoría
                </button>
              )}
            </div>
            
            {showAddCategory ? (
              <div className="category-form">
                <div className="form-group">
                  <label>Nombre de la categoría</label>
                  <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleCategoryInputChange}
                    placeholder="Nombre de la nueva categoría"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Descripción de la categoría</label>
                  <textarea
                    name="description"
                    value={newCategory.description}
                    onChange={handleCategoryInputChange}
                    placeholder="Breve descripción de la categoría"
                    rows="3"
                  />
                </div>
                
                <div className="category-actions">
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="btn btn-primary"
                    disabled={!newCategory.name.trim()}
                  >
                    Añadir categoría
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategory({ name: '', description: '' });
                    }}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Descripción de la tutoría</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe los temas que cubrirás, metodología, etc."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duración (horas)</label>
              <input
                type="number"
                name="duration"
                min="1"
                max="24"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Precio (por sesión)</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            <FiSave /> Crear Tutoría
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearTutoria;