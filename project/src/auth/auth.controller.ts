import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Headers,
} from '@nestjs/common';
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
  CreatedUserPayload,
  DeletedUserPayload,
  FindUserPayload,
  ListUserPayload,
  UpdatedUserPayload,
} from './payloads';
import { AuthComp, GetCustomUser, RawHeaders } from './decorators';
import { User } from './entities';
import { IncomingHttpHeaders } from 'http';
import { UserRoles } from './models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Listar todos
   * @returns { Promise<ListUserPayload>}
   */
  @Get()
  @AuthComp([UserRoles.ROOT, UserRoles.ADMIN], {})
  getAll(): Promise<ListUserPayload> {
    return this.authService.getAll();
  }
  /**
   * Encontrar por Id
   * @param {string} id Id
   * @returns {Promise<FindUserPayload>}
   */
  @Get(':id')
  @AuthComp([], {})
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<FindUserPayload> {
    return this.authService.findById(id);
  }
  /**
   * Ruta privada
   */
  @Get('private/user')
  @AuthComp([], {})
  testPrivate() {
    return 'Hola mundo';
  }
  /**
   * Ruta con decorador custom ara los headers
   */
  @Get('private/headers')
  @AuthComp([], {})
  rawHeaders(
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return { message: 'HEADERS del request', rawHeaders, headers };
  }
  /**
   * Ruta con custom decorator roles
   * @param user
   */
  @Get('private/roles')
  @AuthComp([UserRoles.ROOT, UserRoles.ANALYST], { strictRole: true })
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
  @AuthComp([UserRoles.ROOT, UserRoles.ANALYST], { strictRole: true })
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
   * Refresca el toekn
   * @param {User} user usuario
   * @returns
   */
  @Get('private/refresh')
  @AuthComp([], {})
  refreshToken(@GetCustomUser() user: User) {
    return this.authService.refreshToken(user);
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
  create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserPayload> {
    return this.authService.create(createUserDto);
  }
  /**
   * Actualizar usuario
   * @param {string} id Id
   * @param {UpdateUserDto} updateUserDto
   * @returns
   */
  @Patch(':id')
  @AuthComp([], {})
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
  @AuthComp([UserRoles.ROOT, UserRoles.ADMIN], {})
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
  @AuthComp([UserRoles.ROOT, UserRoles.ADMIN], {})
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
  @AuthComp([UserRoles.ROOT, UserRoles.ADMIN], {})
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
  @AuthComp([UserRoles.ROOT, UserRoles.ADMIN], {})
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeletedUserPayload> {
    return this.authService.remove(id);
  }
}
