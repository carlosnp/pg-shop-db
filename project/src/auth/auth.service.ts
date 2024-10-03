import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto';
import { User } from './entities';
import {
  CreatedUserPayload,
  DeletedUserPayload,
  FindUserPayload,
  ListUserPayload,
  UpdatedUserPayload,
} from './payloads';
import { JwtPayload } from './models';

@Injectable()
export class AuthService {
  /**
   * Instancia para el registro de eventos
   */
  private readonly logger = new Logger('UserServise');
  /**
   * Constructor
   * @param {Repository<User>} userRepository
   * @param {DataSource} dataSource
   * @param {ConfigService} configService
   * @param {JwtService} jwtService
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * Valida el usuario
   * @param {JwtPayload} payload
   * @returns {Promise<User>}
   */
  async validateJwt(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, talk with an admin');
    }
    return user;
  }
  /**
   * Listar usuarios registrados
   * @returns { Promise<ListUserPayload> }
   */
  async getAll(): Promise<ListUserPayload> {
    const list = await this.userRepository.find();
    const total = list.length;
    const result: ListUserPayload = { total, list };
    this.logger.log('Productos listados');
    return result;
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
  /**
   * Encontrar usuario por id
   * @param {string} id Identificador del usuario
   * @returns {Promise<FindUserPayload>}
   */
  async findById(id: string): Promise<FindUserPayload> {
    const find = await this.userRepository.findOneBy({ id });
    if (!find) {
      const error = this.handleDBExceptions(null, null, id);
      return { error };
    }
    this.logger.log('Usuario encontrado');
    return { id: find.id, entity: find };
  }
  /**
   * Encontrar usuario por email
   * @param {string} email Email
   * @returns {Promise<FindUserPayload>}
   */
  async findByEmail(email: string): Promise<FindUserPayload> {
    const find = await this.userRepository.findOneBy({ email });
    if (!find) {
      const error = this.handleDBExceptions(null, null, email);
      return { error };
    }
    this.logger.log('Usuario encontrado');
    return { id: find.id, entity: find };
  }
  /**
   * Crear usuario
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<CreatedUserPayload>}
   */
  async create(createUserDto: CreateUserDto): Promise<CreatedUserPayload> {
    try {
      const { password, ...userData } = createUserDto;
      const build = this.userRepository.create({
        ...userData,
        password: this.encrypt(password),
      });
      const result = await this.userRepository.save(build);
      this.logger.verbose('Usuario creado');
      return { id: result.id, entity: result };
    } catch (error) {
      const handlerError = this.handleDBExceptions(error);
      return { error: handlerError };
    }
  }
  /**
   * Actualizar Usuario
   * @param {string} id Identificador del usuario
   * @param {UpdateUserDto} updateUserDto
   * @returns { Promise<UpdatedUserPayload> }
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdatedUserPayload> {
    try {
      const build = await this.userRepository.preload({ id, ...updateUserDto });
      if (!build) {
        const error = this.handleDBExceptions(null, null, id);
        return { error };
      }
      const result = await this.userRepository.save(build);
      return { id: result.id, entity: result };
    } catch (error) {
      const handlerError = this.handleDBExceptions(error);
      return { error: handlerError };
    }
  }
  /**
   * Cambiar status del usuario
   * @param {string} id Identificador del usuario
   * @param {boolean} isActive Status
   * @returns { Promise<UpdatedUserPayload> }
   */
  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<UpdatedUserPayload> {
    try {
      const build = await this.findById(id);
      const user = build.entity;
      user.isActive = isActive;
      const result = await this.userRepository.save(user);
      return { id: result.id, entity: result };
    } catch (error) {
      const handlerError = this.handleDBExceptions(error);
      return { error: handlerError };
    }
  }
  /**
   * Agregar un rol a un usuario
   * @param {string} id Identificador del usuario
   * @param {string} role Role
   * @returns { Promise<UpdatedUserPayload> }
   */
  async addRole(id: string, role: string): Promise<UpdatedUserPayload> {
    try {
      const build = await this.findById(id);
      const user = build.entity;
      const roles = [role, ...user.roles];
      user.roles = roles;
      const result = await this.userRepository.save(user);
      return { id: result.id, entity: result };
    } catch (error) {
      const handlerError = this.handleDBExceptions(error);
      return { error: handlerError };
    }
  }
  /**
   * Cambiar los roles del usuario
   * @param {string} id Identificador del usuario
   * @param {string[]} roles Roles
   * @returns { Promise<UpdatedUserPayload> }
   */
  async changeRoles(id: string, roles: string[]): Promise<UpdatedUserPayload> {
    try {
      const build = await this.findById(id);
      const user = build.entity;
      user.roles = roles;
      const result = await this.userRepository.save(user);
      return { id: result.id, entity: result };
    } catch (error) {
      const handlerError = this.handleDBExceptions(error);
      return { error: handlerError };
    }
  }
  /**
   * Eliminar usuario
   * @param {string} id Identificador del usuario
   * @returns {Promise<DeletedUserPayload>}
   */
  async remove(id: string): Promise<DeletedUserPayload> {
    const find = await this.findById(id);
    const result = await this.userRepository.remove(find.entity);
    this.logger.log('Producto eliminado');
    return result;
  }
  /**
   * Eliminar todos los usuario
   * @returns {Promise<DeleteResult>}
   */
  async removeAll(): Promise<DeleteResult> {
    const query = this.userRepository.createQueryBuilder('user');
    try {
      const remove = await query.delete().where({}).execute();
      return remove;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  /**
   * iniciar sesión
   * @param {LoginDto} loginDto
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        firstName: true,
        lastName: true,
      },
    });
    if (!user || !this.validEncrypt(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    const token = this.getJwtToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    });
    return { id: user.id, email: user.email, token };
  }
  /**
   * Compara una valor contra un valor encriptado
   * @param {string} value Valor
   * @param {string} encryptValue Valor encriptado
   * @returns {boolean}
   */
  private validEncrypt(value: string, encryptValue: string): boolean {
    return bcrypt.compareSync(value, encryptValue);
  }
  /**
   * Encriptar data
   * @param {string | Buffer} data Data
   * @param {string | number} saltOrRounds
   * @returns {string} Data encriptada
   */
  private encrypt(
    data: string | Buffer,
    saltOrRounds: string | number = 10,
  ): string {
    return bcrypt.hashSync(data, saltOrRounds);
  }
  /**
   * Genera el token
   * @param {JwtPayload} payload
   * @returns {string}
   */
  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    console.log('token', token);
    return token;
  }
  /**
   * Manejo de errores
   * @param {any} error Error
   */
  private handleDBExceptions(error: any, entity?: any, id?: string) {
    const buildError = this.buildError(error, entity, id);
    /** Se imprim el error en el terminal */
    this.logger.error(buildError);
    return buildError;
  }
  /**
   * Construye el error
   * @param error
   * @param entity
   * @param id
   */
  private buildError(error: any, entity?: any, id?: string) {
    if (!error && !entity && id) {
      return new NotFoundException(`User with ${id} not found`);
    }
    if (error.code === '23505') {
      return new BadRequestException(error.detail);
    }
    if (error.criteria) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException('Unexpected error! save me!!!');
  }
}
