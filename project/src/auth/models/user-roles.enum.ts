export enum UserRoles {
  // Administrador: Tiene acceso completo a todas las funcionalidades de la aplicación.
  ADMIN = 'admin',
  // Analista: Tiene acceso a datos y herramientas de análisis para tomar decisiones.
  ANALYST = 'analyst',
  // Colaborador: Trabaja en equipo en proyectos dentro de la aplicación.
  COLLABORATOR = 'collaborator',
  // Contribuidor: Puede crear y modificar contenido, pero no tiene privilegios administrativos.
  CONTRIBUTOR = 'contributor',
  // Cliente: Realiza compras o utiliza los servicios de la aplicación.
  CUSTOMER = 'customer',
  // Desarrollador: Tiene acceso al código fuente y puede realizar cambios en la aplicación.
  DEVELOPER = 'developer',
  // Invitado: Tiene acceso limitado a ciertas funcionalidades de la aplicación sin necesidad de registrarse.
  GUEST = 'guest',
  // Moderador: Puede gestionar contenido, usuarios y tiene ciertos privilegios administrativos.
  MODERATOR = 'moderator',
  // Root: Tiene privilegios máximos sobre la aplicación.
  ROOT = 'root',
  // Suscriptor: Tiene acceso a contenido premium o servicios exclusivos.
  SUBSCRIBER = 'subscriber',
  // Usuario: Tiene acceso a las funcionalidades básicas de la aplicación.
  USER = 'user',
}
