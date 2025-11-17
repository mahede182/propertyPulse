import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User as UserModel } from "@prisma/client";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("users")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get("user/:id")
  async getUser(@Param("id") id: string) {
    return this.userService.user({ id: id });
  }

  @Post("user")
  async signupUser(
    @Body() userData: { email: string; password: string; name: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put("user/:id")
  async updateUser(
    @Param("id") id: string,
    @Body() userData: { email: string; name: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: id },
      data: userData,
    });
  }

  @Delete("user/:id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}
