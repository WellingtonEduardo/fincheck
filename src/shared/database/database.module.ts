import { Global, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repository';

@Global()
@Module({
  providers: [UsersRepository, CategoriesRepository, PrismaService],
  exports: [UsersRepository, CategoriesRepository],
})
export class DatabaseModule {}
