import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  CardMedia, 
  Typography, 
  Box, 
  CircularProgress,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

interface Vacation {
  id: number;
  destination: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  price: number;
}

const defaultImage = 'https://source.unsplash.com/random/?vacation,travel';

const VacationDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacation, setVacation] = useState<Vacation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacationDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/vacations/${id}`);
        if (!response.ok) throw new Error('Vacation not found');
        const data = await response.json();
        setVacation({
          ...data,
          image: data.image_url || defaultImage
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load vacation details');
      } finally {
        setLoading(false);
      }
    };

    fetchVacationDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/vacations');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !vacation) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error || 'Vacation not found'}</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Back to Vacations
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Back to Vacations
      </Button>
      
      <Paper elevation={3}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={vacation.image}
            alt={vacation.destination}
            sx={{ objectFit: 'cover' }}
          />
          <Box sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom color="primary">
              {vacation.destination}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom color="text.secondary">
                Trip Details
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                {vacation.description}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom color="text.secondary">
                Travel Dates
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                From: {new Date(vacation.start_date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                To: {new Date(vacation.end_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom color="text.secondary">
                Package Price
              </Typography>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                ${Number(vacation.price).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                * Price per person, includes all taxes and fees
              </Typography>
            </Box>
          </Box>
        </Card>
      </Paper>
    </Container>
  );
};

export default VacationDetails; 