import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { Project as ProjectModel } from "@prisma/client";
import { CreateProjectDto, ProjectResponseDto } from "./dto";
import { ProjectService } from "./project.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/utils/jwt-auth.guard";
import { RequestWithUser } from "src/common/@types/user.type";

@UseGuards(JwtAuthGuard)
@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectResponseDto> {
    const userId = req.user.id;
    return this.projectService.createProject(userId, createProjectDto);
  }
  
  @Get()
  async findAll(@Req() req: RequestWithUser): Promise<ProjectResponseDto[]> {
    const userId = req.user.id;
    return this.projectService.getProjects(userId);
  }

  @Put(":id")
  async updateProject(@Param("id") id: string): Promise<ProjectModel> {
    return this.projectService.updateProject({
      where: { id: id },
      data: {},
    });
  }

  @Delete(":id")
  async deleteProject(@Param("id") id: string): Promise<ProjectModel> {
    return this.projectService.deleteProject({ id: id });
  }
}
