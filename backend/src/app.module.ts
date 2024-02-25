import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmConfigService } from './config/database-config.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsModule } from './words/words.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { HashModule } from './hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { VocabulariesModule } from './vocabularies/vocabularies.module';
import { VocabularyWordsModule } from './vocabulary-words/vocabulary-words.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRoot({
      transport:
        'smtps://irememberverify@mail.ru:xQjf5YtDUZUQ3DSivef0@smtp.mail.ru',
      defaults: {
        from: '"No Reply" <irememberverify@mail.ru>',
      },
      template: {
        dir: join(__dirname, '../templates/email-templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    WordsModule,
    UsersModule,
    TasksModule,
    HashModule,
    AuthModule,
    VocabulariesModule,
    VocabularyWordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
