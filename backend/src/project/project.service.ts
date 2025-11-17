import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Project } from "@prisma/client";
import { plainToInstance } from "class-transformer";

import { createCustomError } from "src/common/utils/helpers";
import { ProjectsDto } from "./dto/project.dto";

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger("Posts service");

  async project(
    projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    this.logger.log("projectById");
    try {
      const project = await this.prisma.project.findUnique({
        where: projectWhereUniqueInput,
      });
      if (!project) {
        throw createCustomError("Project not found", HttpStatus.NOT_FOUND);
      }
      return plainToInstance(ProjectsDto, project);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async projects(params: {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[]> {
    this.logger.log("getAllProjects");
    try {
      const projects = await this.prisma.project.findMany({
        where: params.where,
        orderBy: params.orderBy,
      });
      return plainToInstance(ProjectsDto, projects);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async getPublishedProjects(): Promise<Project[]> {
  this.logger.log("getPublishedProjects");
  try {
    const projects = await this.prisma.project.findMany();
    return plainToInstance(ProjectsDto, projects);
  } catch (e) {
    throw createCustomError(
      e.message || "Something went wrong",
      e.status || HttpStatus.BAD_REQUEST,
    );
  }
}

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    this.logger.log("createProject");
    try {
      const createProject = await this.prisma.project.create({
        data,
      });
      return createProject;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    this.logger.log("updateProject");
    try {
      const { data, where } = params;
      const updateProject = await this.prisma.project.update({
        where: where,
        data: data,
      });
      return updateProject;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    this.logger.log("deleteProject");
    try {
      const deleteProject = await this.prisma.project.delete({
        where,
      });
      return deleteProject;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
