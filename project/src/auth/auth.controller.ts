import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  DeletedUserPayload,
  FindUserPayload,
  ListUserPayload,
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
   * Eliminar usuario
   * @param {string} id Id
   * @returns {Promise<DeletedUserPayload>}
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeletedUserPayload> {
    return this.authService.remove(id);
  }
}
