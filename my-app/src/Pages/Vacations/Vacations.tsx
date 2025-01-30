import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { FavoriteOutlined, FavoriteBorderOutlined, Edit, Delete, Add } from '@mui/icons-material';
import styles from './Vacations.module.css';

interface Vacation {
  id: number;
  country_id: number;
  description: string;
  destination: string;
  image: string;
  start_date: string;
  end_date: string;
  price: number;
  followers_amount?: number;
  user_following?: boolean;
}

const countryMapping: Record<number, string> = {
  1: 'Spain',
  2: 'France',
  3: 'Italy',
  4: 'Bahamas',
  5: 'Greece',
  7: 'Japan',
  8: 'Australia',
  10: 'Dubai, UAE',
  11: 'Brazil',
  13: 'Spain',
  14: 'New Zealand',
  21: 'Argentina'
};

const getDestinationName = (countryId: number, description: string): string => {
  const country = countryMapping[countryId] || 'Unknown';
  if (description.includes('Beach')) return `${country} - Beach Paradise`;
  if (description.includes('Desert')) return `${country} - Desert Safari`;
  if (description.includes('Carnival')) return `${country} - Carnival`;
  if (description.includes('Alpine')) return `${country} - Alps`;
  if (description.includes('Cultural')) return `${country} - Cultural Tour`;
  if (description.includes('Adventure')) return `${country} - Adventure`;
  if (description.includes('Explorer')) return `${country} - Explorer`;
  if (description.includes('Tango')) return `${country} - Tango`;
  return country;
};

const getDefaultImage = (countryId: number, description: string): string => {
  if (description.includes('Tango')) {
    return 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849';
  }
  const destination = countryMapping[countryId] || 'vacation';
  return `https://source.unsplash.com/featured/?${destination.toLowerCase()},travel`;
};

const Vacations: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  console.log('Current user:', user);
  console.log('Is admin?:', isAdmin);
  console.log('User role_id:', user?.role_id);
  
  const navigate = useNavigate();
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 8;

  // Estados para el formulario de vacaciones
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVacation, setEditingVacation] = useState<Vacation | null>(null);
  const [formData, setFormData] = useState({
    country_id: '',
    description: '',
    start_date: '',
    end_date: '',
    price: '',
    image_url: ''
  });

  const fetchVacations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/vacations');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log('Raw vacation data:', data);

      const uniqueMap = new Map();
      
      data.forEach((curr: any) => {
        const destination = getDestinationName(curr.country_id, curr.description);
        const key = `${destination}-${curr.description}`;
        
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, {
            id: curr.id,
            country_id: curr.country_id,
            destination,
            description: curr.description || 'No description available',
            image: curr.image_url || getDefaultImage(curr.country_id, curr.description),
            start_date: curr.start_date,
            end_date: curr.end_date,
            price: parseFloat(curr.price),
            followers_amount: curr.followers_amount || 0,
            user_following: curr.user_following || false,
          });
        }
      });

      const uniqueVacations = Array.from(uniqueMap.values());
      console.log('Filtered vacations:', uniqueVacations);

      setVacations(uniqueVacations);
      setTotalPages(Math.ceil(uniqueVacations.length / itemsPerPage));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vacations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVacations();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = async (vacationId: number) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/vacations/${vacationId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': user.token
        },
        body: JSON.stringify({ vacation_id: vacationId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update like');
      }
      
      setVacations(prevVacations => 
        prevVacations.map(v => {
          if (v.id === vacationId) {
            return {
              ...v,
              user_following: !v.user_following,
              followers_amount: (v.followers_amount || 0) + 1
            };
          }
          return v;
        })
      );

      await fetchVacations();
    } catch (error) {
      console.error('Error updating like:', error);
      setError(error instanceof Error ? error.message : 'Failed to update like');
    }
  };

  const handleUnlike = async (vacationId: number) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/vacations/${vacationId}/like`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': user.token
        },
        body: JSON.stringify({ vacation_id: vacationId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove like');
      }

      setVacations(prevVacations => 
        prevVacations.map(v => {
          if (v.id === vacationId) {
            return {
              ...v,
              user_following: false,
              followers_amount: Math.max(0, (v.followers_amount || 1) - 1)
            };
          }
          return v;
        })
      );

      await fetchVacations();
    } catch (error) {
      console.error('Error removing like:', error);
      setError(error instanceof Error ? error.message : 'Failed to remove like');
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentVacations = vacations.slice(startIndex, startIndex + itemsPerPage);

  const handleAddVacation = () => {
    setEditingVacation(null);
    setFormData({
      country_id: '',
      description: '',
      start_date: '',
      end_date: '',
      price: '',
      image_url: ''
    });
    setOpenDialog(true);
  };

  const handleEditVacation = (vacation: Vacation) => {
    setEditingVacation(vacation);
    setFormData({
      country_id: vacation.country_id.toString(),
      description: vacation.description,
      start_date: vacation.start_date,
      end_date: vacation.end_date,
      price: vacation.price.toString(),
      image_url: vacation.image
    });
    setOpenDialog(true);
  };

  const handleDeleteVacation = async (vacationId: number) => {
    if (!window.confirm('Are you sure you want to delete this vacation?')) return;
    if (!user?.token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/vacations/${vacationId}`, {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': user.token
        }
      });

      if (!response.ok) throw new Error('Failed to delete vacation');

      await fetchVacations();
      alert('✅ Vacation deleted successfully!');
    } catch (error) {
      alert('❌ Failed to delete vacation');
      setError('Failed to delete vacation');
    }
  };

  const handleSubmitVacation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!user?.token) {
        throw new Error('No authentication token available');
      }

      // Formatear los datos antes de enviar
      const formattedData = {
        country_id: parseInt(formData.country_id),
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        price: parseFloat(formData.price),
        image_url: formData.image_url
      };

      console.log('Sending vacation data:', formattedData);
      console.log('Using token:', user.token);  // Debug log

      const url = editingVacation 
        ? `http://127.0.0.1:5000/vacations/${editingVacation.id}`
        : 'http://127.0.0.1:5000/vacations';
        
      const method = editingVacation ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': user.token,
          'Accept': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      console.log('Request headers:', {
        'Content-Type': 'application/json',
        'X-Auth-Token': user.token,
        'Accept': 'application/json'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || errorData.message || 'Failed to save vacation');
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);  // Debug log

      setOpenDialog(false);
      await fetchVacations();
      alert(editingVacation 
        ? '✅ Vacation updated successfully!' 
        : '✅ New vacation added successfully!');
    } catch (error) {
      console.error('Error details:', error);
      alert('❌ Failed to save vacation: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setError('Failed to save vacation');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container className={styles.container}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
        <Typography variant="h4" component="h1">
          Available Vacations
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user?.email === 'admin@admin.com' && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddVacation}
            >
              Add Vacation
            </Button>
          )}
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1">Welcome, {user.name}!</Typography>
                <Avatar sx={{ bgcolor: 'primary.main' }}>{user.name.charAt(0).toUpperCase()}</Avatar>
              </Box>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => navigate('/profile')}
                size="small"
              >
                Profile
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={logout}
                size="small"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/login')}
                size="small"
              >
                Login
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => navigate('/register')}
                size="small"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Grid container spacing={3}>
        {currentVacations.map((vacation) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={vacation.id}>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                height="140"
                image={vacation.image}
                alt={vacation.destination}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {vacation.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {vacation.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Price: ${vacation.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(vacation.start_date).toLocaleDateString()} - {new Date(vacation.end_date).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => vacation.user_following ? handleUnlike(vacation.id) : handleLike(vacation.id)}
                      color={vacation.user_following ? 'error' : 'default'}
                    >
                      {vacation.user_following ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
                    </IconButton>
                    <Typography variant="body2">
                      {vacation.followers_amount || 0}
                    </Typography>
                  </Box>
                  {user?.email === 'admin@admin.com' && (
                    <Box>
                      <IconButton onClick={() => handleEditVacation(vacation)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteVacation(vacation.id)} color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Dialog para agregar/editar vacaciones */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingVacation ? 'Edit Vacation' : 'Add New Vacation'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmitVacation} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Country ID"
              value={formData.country_id}
              onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              type="date"
              label="End Date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitVacation} variant="contained" color="primary">
            {editingVacation ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Botón Add Vacation */}
      {user?.email === 'admin@admin.com' && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddVacation}
            sx={{ borderRadius: 28 }}
          >
            Add Vacation
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Vacations;
