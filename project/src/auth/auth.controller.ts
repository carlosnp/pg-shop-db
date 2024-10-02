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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ChangeStatusDto, CreateUserDto, LoginDto, UpdateUserDto } from './dto';
import {
  DeletedUserPayload,
  FindUserPayload,
  ListUserPayload,
  UpdatedUserPayload,
} from './payloads';

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
   * Eliminar usuario
   * @param {string} id Id
   * @returns {Promise<DeletedUserPayload>}
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeletedUserPayload> {
    return this.authService.remove(id);
  }
}
