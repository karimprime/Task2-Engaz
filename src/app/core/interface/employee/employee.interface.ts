
export interface Employee {
  nameEn: string;
  nameAr: string;
  idNumber: string;
  gender: 'male' | 'female';
  birthdate: string;
  religion?: 'muslim' | 'christian' | '';
  mobile: string;
  email: string;
}
