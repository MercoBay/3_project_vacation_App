import { useState } from 'react';
import styles from './VacationForm.module.css';
import type { Vacation, VacationFormData } from '../../types/vacation';

interface VacationFormProps {
  initialData?: Partial<VacationFormData>;
  onSubmit: (data: Partial<Vacation>) => Promise<void>;
  onCancel: () => void;
}

const VacationForm = ({ initialData, onSubmit, onCancel }: VacationFormProps) => {
  const [formData, setFormData] = useState({
    country: initialData?.country || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || '',
    image_url: initialData?.image_url || '',
    details: initialData?.details || {
      activities: [],
      includes: [],
      location: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      price: Number(formData.price)
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Vacation' : 'Add New Vacation'}</h2>
      
      <div className={styles.formGroup}>
        <label>Country</label>
        <input
          type="text"
          value={formData.country}
          onChange={(e) => setFormData({...formData, country: e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Image URL</label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Start Date</label>
        <input
          type="date"
          value={formData.start_date}
          onChange={(e) => setFormData({...formData, start_date: e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>End Date</label>
        <input
          type="date"
          value={formData.end_date}
          onChange={(e) => setFormData({...formData, end_date: e.target.value})}
          required
        />
      </div>

      <div className={styles.buttons}>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default VacationForm; 