import { Module } from '@nestjs/common';

import { TransactionsController } from './transactions.controller';

import { CategoriesModule } from '../categories/categories.module';
import { TransactionsService } from './services/transactions.service';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';
import { BankAccountsModule } from '../../modules/bank-accounts/bank-accounts.module';

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnershipService],
})
export class TransactionsModule {}
