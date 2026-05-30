import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { OrganizationsController } from './organizations/organizations.controller';
import { RequestsController } from './requests/requests.controller';
import { OffersController } from './offers/offers.controller';
import { AppointmentsController } from './appointments/appointments.controller';
import { MessagesController } from './messages/messages.controller';
import { ReportsController } from './reports/reports.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AuthController, UsersController, OrganizationsController, RequestsController, OffersController, AppointmentsController, MessagesController, ReportsController],
  providers: [PrismaService],
})
export class AppModule {}
