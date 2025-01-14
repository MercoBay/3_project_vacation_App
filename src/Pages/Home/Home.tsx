// Home.tsx
import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Button,
  CircularProgress,
  Alert 
} from '@mui/material';
import { apiService } from '../../Services/api';
import styles from './Home.module.css';

interface Vacation {
  id: number;
  country_id: number;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  image_url?: string;
}

const Home = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVacations = async () => {
      try {
        const response = await apiService.vacations.getAll();
        setVacations(response);
      } catch (err) {
        setError('Error al cargar las vacaciones');
      } finally {
        setLoading(false);
      }
    };

    loadVacations();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container className={styles.container}>
      <Typography variant="h2" component="h1" className={styles.title}>
        Welcome to the Vacation Planner!
      </Typography>

      {error && (
        <Alert severity="error" className={styles.alert}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4} className={styles.vacationsGrid}>
        {vacations.map((vacation) => (
          <Grid item xs={12} sm={6} md={4} key={vacation.id}>
            <Card className={styles.vacationCard}>
              <CardMedia
                component="img"
                height="200"
                image={vacation.image_url || '/default-vacation-image.jpg'}
                alt={vacation.description}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {vacation.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${vacation.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  From: {new Date(vacation.start_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To: {new Date(vacation.end_date).toLocaleDateString()}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
