import { Injectable } from '@nestjs/common';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-Bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, name, date, value, type } =
      createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });

    return this.transactionsRepository.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        date,
        value,
        type,
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, name, date, value, type } =
      updateTransactionDto;
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepository.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        name,
        date,
        value,
        type,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionsRepository.delete({
      where: { id: transactionId },
    });

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),

      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),

      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
