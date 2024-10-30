import { IsNotEmpty, IsEmail } from 'class-validator';

export class DeleteUserParams {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
