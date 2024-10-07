import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Headers,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  AddRoleDto,
  ChangeRolesDto,
  ChangeStatusDto,
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
} from './dto';
import {
  DeletedUserPayload,
  FindUserPayload,
  ListUserPayload,
  UpdatedUserPayload,
} from './payloads';
import { AuthComp, GetCustomUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards';
import { UserRoles } from './models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Listar todos
   * @returns { Promise<ListUserPayload>}
   */
  @Get()
  getAll(): Promise<ListUserPayload> {
    return this.authService.getAll();
  }
  /**
   * Encontrar por Id
   * @param {string} id Id
   * @returns {Promise<FindUserPayload>}
   */
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<FindUserPayload> {
    return this.authService.findById(id);
  }
  /**
   * Ruta privada
   */
  @Get('private/user')
  @UseGuards(AuthGuard())
  testPrivate() {
    return 'Hola mundo';
  }
  /**
   * Ruta con decorador custom para el usuario
   */
  @Get('private/decorator')
  @UseGuards(AuthGuard())
  customDecorator(
    @GetCustomUser() user: User,
    @GetCustomUser('email') userEmail: string,
    @GetCustomUser(['phone', 'roles'])
    items: { email: string; roles: string[] },
  ) {
    return { message: 'Hola mundo', user, userEmail, items };
  }
  /**
   * Ruta con decorador custom ara los headers
   */
  @Get('private/headers')
  @UseGuards(AuthGuard())
  rawHeaders(
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return { message: 'HEADERS del request', rawHeaders, headers };
  }
  /**
   * Ruta con custom guard
   * @param user
   */
  @Get('private/guard')
  @SetMetadata('roles', ['root', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  customGuard(
    @GetCustomUser(['phone', 'roles'])
    user: {
      email: string;
      roles: string[];
    },
  ) {
    return { message: 'Hola mundo', user };
  }
  /**
   * Ruta con custom decorator roles
   * @param user
   */
  @Get('private/roles')
  @RoleProtected(UserRoles.ROOT, UserRoles.ROOT)
  @UseGuards(AuthGuard(), UserRoleGuard)
  customRoles(
    @GetCustomUser(['phone', 'roles'])
    user: {
      email: string;
      roles: string[];
    },
  ) {
    return { message: 'Hola mundo', user };
  }
  /**
   * Ruta con decorador compuesto
   * @param user
   */
  @Get('private/composition')
  @AuthComp(UserRoles.ROOT, UserRoles.ADMIN)
  compositionDecorators(
    @GetCustomUser(['phone', 'roles'])
    user: {
      email: string;
      roles: string[];
    },
  ) {
    return { message: 'Hola mundo', user };
  }
  /**
   * Iniciar sesión
   * @param {LoginDto} loginDto
   * @returns
   */
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  /**
   * Crear/registrar un usuario
   * @param {CreateUserDto} createUserDto
   * @returns
   */
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  /**
   * Actualizar usuario
   * @param {string} id Id
   * @param {UpdateUserDto} updateUserDto
   * @returns
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.update(id, updateUserDto);
  }
  /**
   * Cambiar status del usuario
   * @param {string} id Identificador del usuario
   * @param {ChangeStatusDto} input
   * @returns { Promise<UpdatedUserPayload> }
   */
  @Patch('status/:id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: ChangeStatusDto,
  ): Promise<UpdatedUserPayload> {
    return this.authService.changeStatus(id, input.isActive);
  }
  /**
   * Agregar un rol
   * @param {string} id Identificador del usuario
   * @param {AddRoleDto} input
   * @returns { Promise<UpdatedUserPayload> }
   */
  @Patch('roles/add/:id')
  addRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: AddRoleDto,
  ): Promise<UpdatedUserPayload> {
    return this.authService.addRole(id, input.role);
  }
  /**
   * Cambiar roles
   * @param {string} id Identificador del usuario
   * @param {ChangeRolesDto} input
   * @returns { Promise<UpdatedUserPayload> }
   */
  @Patch('roles/:id')
  changeRoles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: ChangeRolesDto,
  ): Promise<UpdatedUserPayload> {
    return this.authService.changeRoles(id, input.roles);
  }
  /**
   * Eliminar usuario
   * @param {string} id Id
   * @returns {Promise<DeletedUserPayload>}
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeletedUserPayload> {
    return this.authService.remove(id);
  }
}
