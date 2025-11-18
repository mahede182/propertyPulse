import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Project } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { createCustomError } from "src/common/utils/helpers";
import { CreateProjectDto, ProjectResponseDto } from "./dto";

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger("Posts service");

  async createProject(
    userId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectResponseDto> {
    const project = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        createdBy: {
          connect: { id: userId },
        },
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return project;
  }

  async getProjectById(
    projectId: string,
    userId: string,
  ): Promise<ProjectResponseDto> {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id: projectId, createdById: userId },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!project) {
        throw createCustomError('Project not found', HttpStatus.NOT_FOUND);
      }

      return plainToInstance(ProjectResponseDto, project);
    } catch (error) {
      this.logger.error(`Error fetching project ${projectId}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getProjects(userId: string): Promise<ProjectResponseDto[]> {
    const projects = await this.prisma.project.findMany({
      where: {
        createdById: userId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects.map(project => plainToInstance(ProjectResponseDto, project));
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
