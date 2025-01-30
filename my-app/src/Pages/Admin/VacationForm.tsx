import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface Vacation {
  id?: number;
  country: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  image_url: string;
}

interface VacationFormProps {
  initialData?: Vacation;
  onSubmit: () => void;
  onClose: () => void;
}

const VacationForm: React.FC<VacationFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Vacation>(
    initialData || {
      country: '',
      description: '',
      start_date: '',
      end_date: '',
      price: 0,
      image_url: '',
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `/api/vacations/${formData.id}` : '/api/vacations';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error saving vacation:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Country"
        fullWidth
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        required
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <TextField
        label="Start Date"
        type="date"
        fullWidth
        value={formData.start_date}
        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="End Date"
        type="date"
        fullWidth
        value={formData.end_date}
        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Price"
        type="number"
        fullWidth
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        required
      />
      <TextField
        label="Image URL"
        fullWidth
        value={formData.image_url}
        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default VacationForm;


// import React, { useState } from 'react';
// import { TextField, Button, Box } from '@mui/material';
// import styles from './VacationForm.module.css';

// interface Vacation {
//   id?: number;
//   country: string;
//   description: string;
//   start_date: string;
//   end_date: string;
//   price: number;
//   image_url: string;
// }

// interface VacationFormProps {
//   initialData?: Vacation;
//   onSubmit: () => void; // Callback to refresh the vacation list
//   onClose: () => void; // Callback to close the form
// }

// const VacationForm: React.FC<VacationFormProps> = ({ initialData, onSubmit, onClose }) => {
//   const [formData, setFormData] = useState<Vacation>(
//     initialData || {
//       country: '',
//       description: '',
//       start_date: '',
//       end_date: '',
//       price: 0,
//       image_url: '',
//     }
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const method = formData.id ? 'PUT' : 'POST';
//       const url = formData.id ? `/api/vacations/${formData.id}` : '/api/vacations';
//       await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       onSubmit();
//       onClose();
//     } catch (error) {
//       console.error('Error saving vacation:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <TextField
//         label="Country"
//         fullWidth
//         margin="normal"
//         value={formData.country}
//         onChange={(e) => setFormData({ ...formData, country: e.target.value })}
//         required
//       />
//       <TextField
//         label="Description"
//         fullWidth
//         margin="normal"
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         required
//       />
//       <TextField
//         label="Start Date"
//         type="date"
//         fullWidth
//         margin="normal"
//         value={formData.start_date}
//         onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
//         InputLabelProps={{ shrink: true }}
//         required
//       />
//       <TextField
//         label="End Date"
//         type="date"
//         fullWidth
//         margin="normal"
//         value={formData.end_date}
//         onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
//         InputLabelProps={{ shrink: true }}
//         required
//       />
//       <TextField
//         label="Price"
//         type="number"
//         fullWidth
//         margin="normal"
//         value={formData.price}
//         onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//         required
//       />
//       <TextField
//         label="Image URL"
//         fullWidth
//         margin="normal"
//         value={formData.image_url}
//         onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//         required
//       />
//       <Box className={styles.buttons}>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//         <Button type="submit" variant="contained" color="primary">
//           Save
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default VacationForm;



// import { useState } from 'react';
// import styles from './VacationForm.module.css';
// import type { Vacation, VacationFormData } from '../../types/vacation';

// interface VacationFormProps {
//   initialData?: Partial<VacationFormData>;
//   onSubmit: (data: Partial<Vacation>) => Promise<void>;
//   onCancel: () => void;
// }

// const VacationForm = ({ initialData, onSubmit, onCancel }: VacationFormProps) => {
//   const [formData, setFormData] = useState({
//     country: initialData?.country || '',
//     description: initialData?.description || '',
//     price: initialData?.price || '',
//     start_date: initialData?.start_date || '',
//     end_date: initialData?.end_date || '',
//     image_url: initialData?.image_url || '',
//     details: initialData?.details || {
//       activities: [],
//       includes: [],
//       location: ''
//     }
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onSubmit({
//       ...formData,
//       price: Number(formData.price)
//     });
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <h2>{initialData ? 'Edit Vacation' : 'Add New Vacation'}</h2>
      
//       <div className={styles.formGroup}>
//         <label>Country</label>
//         <input
//           type="text"
//           value={formData.country}
//           onChange={(e) => setFormData({...formData, country: e.target.value})}
//           required
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Description</label>
//         <textarea
//           value={formData.description}
//           onChange={(e) => setFormData({...formData, description: e.target.value})}
//           required
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Price</label>
//         <input
//           type="number"
//           value={formData.price}
//           onChange={(e) => setFormData({...formData, price: e.target.value})}
//           required
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Image URL</label>
//         <input
//           type="url"
//           value={formData.image_url}
//           onChange={(e) => setFormData({...formData, image_url: e.target.value})}
//           required
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Start Date</label>
//         <input
//           type="date"
//           value={formData.start_date}
//           onChange={(e) => setFormData({...formData, start_date: e.target.value})}
//           required
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>End Date</label>
//         <input
//           type="date"
//           value={formData.end_date}
//           onChange={(e) => setFormData({...formData, end_date: e.target.value})}
//           required
//         />
//       </div>

//       <div className={styles.buttons}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={onCancel}>Cancel</button>
//       </div>
//     </form>
//   );
// };

// export default VacationForm; 