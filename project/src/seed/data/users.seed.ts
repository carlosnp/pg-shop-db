import { UserModelCreate } from 'src/auth';

export const usersSeed: UserModelCreate[] = [
  {
    firstName: 'root',
    lastName: 'admin',
    email: 'root.admin@email.com',
    phone: '04121234567',
    password: 'Carro12+',
    roles: ['root', 'admin', 'user'],
  },
  {
    firstName: 'jhon',
    lastName: 'down',
    email: 'jhon.down@email.com',
    phone: '04121234567',
    password: 'Carro12+',
    roles: ['user'],
  },
];
