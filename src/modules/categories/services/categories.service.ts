import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../../shared/database/repositories/categories.repository';

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
