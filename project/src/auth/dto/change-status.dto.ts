import { Transform, TransformFnParams } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class ChangeStatusDto {
  /**
   * Status del usuario
   */
  @IsBoolean()
  @Transform((data: TransformFnParams) => {
    return (
      data.value === 'true' ||
      data.value === true ||
      data.value === 1 ||
      data.value === '1'
    );
  })
  isActive: boolean;
}
