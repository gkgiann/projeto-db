import { IsNotEmpty } from 'class-validator';

export class UpdateUserBody {
  @IsNotEmpty()
  name: string;
}
