import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmConfigService } from './config/database-config.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsModule } from './words/words.module';
import { UsersModule } from './users/users.module';
import { HashModule } from './hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { VocabulariesModule } from './vocabularies/vocabularies.module';
import { VocabularyWordsModule } from './vocabulary-words/vocabulary-words.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: configService.get<string>('email.smtp'),
        defaults: {
          from: `"No Reply" <${configService.get<string>('email.address')}>`,
        },
        template: {
          dir: join(__dirname, 'email/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ScheduleModule.forRoot(),
    WordsModule,
    UsersModule,
    HashModule,
    AuthModule,
    VocabulariesModule,
    VocabularyWordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
