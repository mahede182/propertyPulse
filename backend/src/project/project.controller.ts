import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Project as ProjectModel } from "@prisma/client";
import { CreateProjectDto } from "./dto";
import { ProjectService } from "./project.service";

@Controller("projects")
export class PostController {
  constructor(private readonly postService: ProjectService) {}

  @Get(":id")
  async getPostById(@Param("id") id: string): Promise<ProjectModel> {
    return this.postService.project({ id: id });
  }

  @Get("project/feed")
  async getPublishedPosts() {
    try {
      const publishedPosts = await this.postService.getPublishedProjects();
      return publishedPosts;
    } catch (error) {
      return error;
    }
  }

  @Get("filtered-posts/:searchString")
  async getFilteredPosts(
    @Param("searchString") searchString: string,
  ): Promise<ProjectModel[]> {
    return this.postService.projects({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            description: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  async createPost(@Body() postData: CreateProjectDto): Promise<ProjectModel> {
    const { name, description, createdBy } = postData;
    return this.postService.createProject({
      name,
      description,
      createdBy: { connect: { id: createdBy } },
    });
  }

  @Put(":id")
  async updatePost(@Param("id") id: string): Promise<ProjectModel> {
    return this.postService.updateProject({
      where: { id: id },
      data: {},
    });
  }

  @Delete(":id")
  async deletePost(@Param("id") id: string): Promise<ProjectModel> {
    return this.postService.deleteProject({ id: id });
  }
}
