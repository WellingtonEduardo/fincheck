import { CategoriesRepository } from './../../shared/database/repositories/categories.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllByUserId(userId: string) {
    return await this.categoriesRepository.findMany({
      where: {
        userId,
      },
    });
  }
}
