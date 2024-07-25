// Определяем роль пользователя
export const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
  GENERAL: ['admin', 'user']
} as const;
