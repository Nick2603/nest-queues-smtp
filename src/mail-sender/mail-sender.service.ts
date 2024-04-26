import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDataOnUserCreatedEvent } from 'src/user/interfaces';
import { EMAIL_FROM } from './constants';
import {
  EmailDataOnTicketAssignToUserEvent,
  EmailDataOnTicketUnassignFromUserEvent,
} from 'src/ticket/interfaces';

@Injectable()
export class MailSenderService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserCreationWelcome({
    email,
    firstName,
    lastName,
  }: EmailDataOnUserCreatedEvent): Promise<void> {
    try {
      const success = await this.mailerService.sendMail({
        to: email,
        from: EMAIL_FROM,
        subject: 'Welcome',
        template: 'welcome',
        context: {
          firstName,
          lastName,
        },
      });
      console.log(success);
    } catch (err) {
      console.error(err);
    }
  }

  async sendTicketAssignedInfo({
    userEmail,
    userFirstName,
    userLastName,
    event,
    date,
  }: EmailDataOnTicketAssignToUserEvent): Promise<void> {
    try {
      const success = await this.mailerService.sendMail({
        to: userEmail,
        from: EMAIL_FROM,
        subject: 'Ticket assigned',
        template: 'ticket-assigned',
        context: {
          event,
          firstName: userFirstName,
          lastName: userLastName,
          date: new Date(date).toLocaleDateString(),
        },
      });
      console.log(success);
    } catch (err) {
      console.error(err);
    }
  }

  async sendTicketUnassignedInfo({
    userEmail,
    userFirstName,
    userLastName,
    event,
    date,
  }: EmailDataOnTicketUnassignFromUserEvent): Promise<void> {
    try {
      const success = await this.mailerService.sendMail({
        to: userEmail,
        from: EMAIL_FROM,
        subject: 'Ticket unassigned',
        template: 'ticket-unassigned',
        context: {
          event,
          firstName: userFirstName,
          lastName: userLastName,
          date: new Date(date).toLocaleDateString(),
        },
      });
      console.log(success);
    } catch (err) {
      console.error(err);
    }
  }
}
