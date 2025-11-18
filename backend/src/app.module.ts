import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { AuthModule } from "./auth/auth.module";
import { TransactionsModule } from './transactions/transactions.module';
import { MessageModule } from './message/message.module';


@Module({
  imports: [PrismaModule, UserModule, ProjectModule, AuthModule, TransactionsModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
