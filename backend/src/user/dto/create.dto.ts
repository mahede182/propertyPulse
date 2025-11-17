import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
  email: string;

  @IsNotEmpty({ message: "password is required" })
  password: string;
}
