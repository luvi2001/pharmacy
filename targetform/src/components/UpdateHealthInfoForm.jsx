import React, { useState } from 'react';

const UpdateHealthInfoForm = ({ info, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: info.name,
    target: info.target,
    achievement: info.achievement
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...info, ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name of Medicine:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Target:</label>
        <input type="number" name="target" value={formData.target} onChange={handleChange} />
      </div>
      <div>
        <label>Achievement:</label>
        <input type="number" name="achievement" value={formData.achievement} onChange={handleChange} />
      </div>
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UpdateHealthInfoForm;
