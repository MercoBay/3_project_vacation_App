export interface VacationDetails {
  activities: string[];
  includes: string[];
  location: string;
}

export interface Vacation {
  id: number;
  country: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  image_url: string;
  details: VacationDetails;
}

export interface VacationFormData extends Omit<Vacation, 'id'> {
  price: string;
} 