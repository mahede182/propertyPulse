import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { ProjectService } from "./project.service";
import { PostController } from "./project.controller";

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [ProjectService],
})
export class ProjectModule {}
