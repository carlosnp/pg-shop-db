import { UserModelCreate, UserRoles } from 'src/auth';

export const usersSeed: UserModelCreate[] = [
  {
    firstName: 'root',
    lastName: 'admin',
    email: 'root.admin@email.com',
    phone: '04121234567',
    password: 'Carro12+',
    roles: [UserRoles.ROOT, UserRoles.ADMIN],
  },
  {
    firstName: 'coollaborator',
    lastName: 'job',
    email: 'coollaborator.job@email.com',
    phone: '04121234567',
    password: 'Carro12+',
    roles: [UserRoles.COLLABORATOR],
  },
  {
    firstName: 'developer',
    lastName: 'master',
    email: 'developer.master@email.com',
    phone: '04121234567',
    password: 'Carro12+',
    roles: [UserRoles.DEVELOPER],
  },
  {
    firstName: 'jhon',
    lastName: 'down',
    email: 'jhon.down@email.com',
    phone: '04121234567',
    password: 'Carro12+',
  },
  {
    firstName: 'guest',
    lastName: 'wild',
    email: 'guest.wild@email.com',
    phone: '04121234567',
    password: 'Carro12+',
    roles: [UserRoles.GUEST],
  },
];
