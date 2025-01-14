import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button 
} from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <Container className={styles.container}>
      <Paper elevation={3} className={styles.header}>
        <Typography variant="h4" component="h1">
          Panel de Administración
        </Typography>
      </Paper>

      <Grid container spacing={3} className={styles.grid}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <BeachAccessIcon className={styles.icon} />
              <Typography variant="h6">
                Administrar Vacaciones
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                component={Link} 
                to="/admin/vacations" 
                variant="contained" 
                fullWidth
              >
                Acceder
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <PeopleIcon className={styles.icon} />
              <Typography variant="h6">
                Administrar Usuarios
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                component={Link} 
                to="/admin/users" 
                variant="contained" 
                fullWidth
              >
                Acceder
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <BookOnlineIcon className={styles.icon} />
              <Typography variant="h6">
                Ver Reservas
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                component={Link} 
                to="/admin/bookings" 
                variant="contained" 
                fullWidth
              >
                Acceder
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
