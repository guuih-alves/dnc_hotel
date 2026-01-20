import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { UserModule } from './modules/users/user.module.js';
import { AuthModule } from './modules/auth/auth.model.js';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { HotelsModule } from './modules/hotels/hotels.module.js';
import { ReservationsModule } from './modules/reservations/reservations.module.js';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 3,
      },
    ]),
    MailerModule.forRoot({
      transport: process.env.SMTP,
      defaults: {
        from: `"dnc_hotel" <${process.env.EMAIL_USER}>`,
      },
    }),
    HotelsModule,
    ReservationsModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerModule,
    },
  ],
})
export class AppModule {}
