import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import VacationForm from './VacationForm';

interface Vacation {
  id?: number;
  country: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  image_url: string;
}

const AdminDashboard: React.FC = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const fetchVacations = async () => {
    try {
      const response = await fetch('/api/vacations');
      const data = await response.json();
      setVacations(data);
    } catch (error) {
      console.error('Error fetching vacations:', error);
    }
  };

  useEffect(() => {
    fetchVacations();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this vacation?')) {
      try {
        await fetch(`/api/vacations/${id}`, { method: 'DELETE' });
        fetchVacations();
      } catch (error) {
        console.error('Error deleting vacation:', error);
      }
    }
  };

  const handleAdd = () => {
    setSelectedVacation(null);
    setOpenFormDialog(true);
  };

  const handleEdit = (vacation: Vacation) => {
    setSelectedVacation(vacation);
    setOpenFormDialog(true);
  };

  const closeDialog = () => {
    setOpenFormDialog(false);
    setSelectedVacation(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <Typography variant="h4">Vacation Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Vacation
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacations.map((vacation) => (
              <TableRow key={vacation.id}>
                <TableCell>{vacation.country}</TableCell>
                <TableCell>{vacation.description}</TableCell>
                <TableCell>{new Date(vacation.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(vacation.end_date).toLocaleDateString()}</TableCell>
                <TableCell>${vacation.price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(vacation)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(vacation.id!)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openFormDialog} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedVacation ? 'Edit Vacation' : 'Add Vacation'}
        </DialogTitle>
        <DialogContent>
          <VacationForm
            initialData={selectedVacation || undefined}
            onClose={closeDialog}
            onSubmit={fetchVacations}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;





// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
// import styles from './Dashboard.module.css';

// interface Vacation {
//   id?: number;
//   country: string;
//   description: string;
//   start_date: string;
//   end_date: string;
//   price: number;
//   image_url: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [vacations, setVacations] = useState<Vacation[]>([]);
//   const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);
//   const [openFormDialog, setOpenFormDialog] = useState(false);

//   // Fetch vacations from API
//   const fetchVacations = async () => {
//     try {
//       const response = await fetch('/api/vacations');
//       const data = await response.json();
//       setVacations(data);
//     } catch (error) {
//       console.error('Error fetching vacations:', error);
//     }
//   };

//   useEffect(() => {
//     fetchVacations();
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this vacation?')) {
//       try {
//         await fetch(`/api/vacations/${id}`, { method: 'DELETE' });
//         fetchVacations();
//       } catch (error) {
//         console.error('Error deleting vacation:', error);
//       }
//     }
//   };

//   const handleAdd = () => {
//     setSelectedVacation(null); // Clear form for new vacation
//     setOpenFormDialog(true);
//   };

//   const handleEdit = (vacation: Vacation) => {
//     setSelectedVacation(vacation); // Pass vacation data to form
//     setOpenFormDialog(true);
//   };

//   const closeDialog = () => {
//     setOpenFormDialog(false);
//     setSelectedVacation(null);
//   };

//   return (
//     <div className={styles.dashboard}>
//       <div className={styles.header}>
//         <h1>Vacation Management</h1>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={handleAdd}
//         >
//           Add Vacation
//         </Button>
//       </div>

//       <TableContainer component={Paper} className={styles.tableContainer}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Country</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {vacations.map((vacation) => (
//               <TableRow key={vacation.id}>
//                 <TableCell>{vacation.country}</TableCell>
//                 <TableCell>{vacation.description}</TableCell>
//                 <TableCell>{new Date(vacation.start_date).toLocaleDateString()}</TableCell>
//                 <TableCell>{new Date(vacation.end_date).toLocaleDateString()}</TableCell>
//                 <TableCell>${vacation.price}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEdit(vacation)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(vacation.id!)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog for VacationForm */}
//       <Dialog open={openFormDialog} onClose={closeDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {selectedVacation ? 'Edit Vacation' : 'Add Vacation'}
//         </DialogTitle>
//         <DialogContent>
//           <VacationForm
//             initialData={selectedVacation || undefined}
//             onClose={closeDialog}
//             onSubmit={fetchVacations}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
// import styles from './AdminDashboard.module.css';

// interface Vacation {
//   id: number;
//   country_id: number;
//   description: string;
//   start_date: string;
//   end_date: string;
//   price: number;
//   image_url: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [vacations, setVacations] = useState<Vacation[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);
//   const [countries, setCountries] = useState<{id: number, name: string}[]>([]);

//   useEffect(() => {
//     // Fetch vacations and countries when component mounts
//     fetchVacations();
//     fetchCountries();
//   }, []);

//   const fetchVacations = async () => {
//     try {
//       const response = await fetch('/api/vacations');
//       const data = await response.json();
//       setVacations(data);
//     } catch (error) {
//       console.error('Error fetching vacations:', error);
//     }
//   };

//   const fetchCountries = async () => {
//     try {
//       const response = await fetch('/api/countries');
//       const data = await response.json();
//       setCountries(data);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//     }
//   };

//   const handleAdd = () => {
//     setSelectedVacation(null);
//     setOpenDialog(true);
//   };

//   const handleEdit = (vacation: Vacation) => {
//     setSelectedVacation(vacation);
//     setOpenDialog(true);
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this vacation?')) {
//       try {
//         await fetch(`/api/vacations/${id}`, { method: 'DELETE' });
//         fetchVacations();
//       } catch (error) {
//         console.error('Error deleting vacation:', error);
//       }
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const formData = new FormData(event.target as HTMLFormElement);
//     const vacationData = {
//       country_id: formData.get('country_id'),
//       description: formData.get('description'),
//       start_date: formData.get('start_date'),
//       end_date: formData.get('end_date'),
//       price: formData.get('price'),
//       image_url: formData.get('image_url'),
//     };

//     try {
//       const url = selectedVacation
//         ? `/api/vacations/${selectedVacation.id}`
//         : '/api/vacations';
//       const method = selectedVacation ? 'PUT' : 'POST';

//       await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(vacationData),
//       });

//       setOpenDialog(false);
//       fetchVacations();
//     } catch (error) {
//       console.error('Error saving vacation:', error);
//     }
//   };

//   return (
//     <div className={styles.dashboard}>
//       <div className={styles.header}>
//         <h1>Vacation Management</h1>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={handleAdd}
//         >
//           Add Vacation
//         </Button>
//       </div>

//       <TableContainer component={Paper} className={styles.tableContainer}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Country</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {vacations.map((vacation) => (
//               <TableRow key={vacation.id}>
//                 <TableCell>{vacation.id}</TableCell>
//                 <TableCell>
//                   {countries.find(c => c.id === vacation.country_id)?.name}
//                 </TableCell>
//                 <TableCell>{vacation.description}</TableCell>
//                 <TableCell>{new Date(vacation.start_date).toLocaleDateString()}</TableCell>
//                 <TableCell>{new Date(vacation.end_date).toLocaleDateString()}</TableCell>
//                 <TableCell>${vacation.price}</TableCell>
//                 <TableCell>
//                   <img 
//                     src={vacation.image_url} 
//                     alt="Vacation" 
//                     style={{ width: '100px', height: '60px', objectFit: 'cover' }} 
//                   />
//                 </TableCell>
//                 <TableCell className={styles.actionCell}>
//                   <IconButton onClick={() => handleEdit(vacation)} color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(vacation.id)} color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
//         <form onSubmit={handleSubmit}>
//           <DialogTitle>
//             {selectedVacation ? 'Edit Vacation' : 'Add New Vacation'}
//           </DialogTitle>
//           <DialogContent className={styles.dialogContent}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Country</InputLabel>
//               <Select
//                 name="country_id"
//                 defaultValue={selectedVacation?.country_id || ''}
//                 required
//               >
//                 {countries.map(country => (
//                   <MenuItem key={country.id} value={country.id}>
//                     {country.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
            
//             <TextField
//               name="description"
//               label="Description"
//               multiline
//               rows={4}
//               fullWidth
//               margin="normal"
//               defaultValue={selectedVacation?.description || ''}
//               required
//             />

//             <TextField
//               name="start_date"
//               label="Start Date"
//               type="date"
//               fullWidth
//               margin="normal"
//               defaultValue={selectedVacation?.start_date || ''}
//               InputLabelProps={{ shrink: true }}
//               required
//             />

//             <TextField
//               name="end_date"
//               label="End Date"
//               type="date"
//               fullWidth
//               margin="normal"
//               defaultValue={selectedVacation?.end_date || ''}
//               InputLabelProps={{ shrink: true }}
//               required
//             />

//             <TextField
//               name="price"
//               label="Price"
//               type="number"
//               fullWidth
//               margin="normal"
//               defaultValue={selectedVacation?.price || ''}
//               inputProps={{ min: 0, max: 10000 }}
//               required
//             />

//             <TextField
//               name="image_url"
//               label="Image URL"
//               fullWidth
//               margin="normal"
//               defaultValue={selectedVacation?.image_url || ''}
//               required
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//             <Button type="submit" variant="contained" color="primary">
//               {selectedVacation ? 'Update' : 'Add'}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminDashboard;
