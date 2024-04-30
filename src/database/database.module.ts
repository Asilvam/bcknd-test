import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useFactory: () => ({
        type: 'mongodb',
        url: process.env.MONGODB_URI,
        database: 'Testing',
        entities: [User],
        synchronize: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }),
  ],
  providers: [Logger],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  constructor(private readonly logger: Logger) {}

  async onModuleInit() {
    this.logger.log(`Connected to MongoDB database`);
  }
}
