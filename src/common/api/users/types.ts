export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  bonuses?: number;
  avatar?: string;
};
