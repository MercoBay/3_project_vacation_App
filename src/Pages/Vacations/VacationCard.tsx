import React, { useState } from 'react';
import styles from './VacationCard.module.css';
import VacationDetailsModal from './VacationDetailsModal';

interface VacationPreview {
  id: number;
  country: string;
  mainImage: string;
  shortDescription: string;
  price: {
    amount: number;
    currency: string;
    includes: string[];  // "Vuelos incluidos", "Desayuno incluido", etc.
  };
  start_date: string;
  end_date: string;
  duration: number;  // días
}

// Ejemplo de datos:
const vacationExample: VacationPreview = {
  id: 1,
  country: "Italia",
  mainImage: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80",
  shortDescription: "Roma: 7 días de historia, arte y gastronomía italiana",
  price: {
    amount: 1299,
    currency: "USD",
    includes: [
      "Vuelos ida y vuelta",
      "Hotel 4 estrellas",
      "Desayuno buffet"
    ]
  },
  start_date: "2024-06-15",
  end_date: "2024-06-22",
  duration: 7
};

const VacationCard = ({ vacation }: { vacation: VacationPreview }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={styles.card}>
      {/* Vista previa */}
      <img src={vacation.mainImage} alt={vacation.country} />
      <h3>{vacation.country}</h3>
      <p>{vacation.shortDescription}</p>
      <p>Precio: ${vacation.price.amount} {vacation.price.currency}</p>
      
      {/* Botón Ver Detalles */}
      <button onClick={() => setShowDetails(true)}>
        Ver Detalles
      </button>

      {/* Modal con detalles completos */}
      {showDetails && (
        <VacationDetailsModal 
          vacationId={vacation.id}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default VacationCard; 