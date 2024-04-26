import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueError,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';
import { queueNames } from 'src/queues-bull/queue-names';
import { EmailDataOnTicketUnassignFromUserEvent } from './interfaces';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';

@Processor(queueNames.EmailsOnTicketUnassign)
export class EmailsOnTicketUnassignProcessor {
  constructor(private readonly mailSenderService: MailSenderService) {}

  @Process()
  async process(job: Job<EmailDataOnTicketUnassignFromUserEvent>) {
    return this.mailSenderService.sendTicketUnassignedInfo(job.data);
  }

  @OnQueueActive()
  onActive(job: Job<EmailDataOnTicketUnassignFromUserEvent>) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueError()
  onError(error: Error) {
    console.error(`Error processing job: ${error.message}`);
  }

  @OnQueueFailed()
  onFailed(job: Job<EmailDataOnTicketUnassignFromUserEvent>, error: Error) {
    console.error(`Job ${job.id} failed with error: ${error.message}`);
  }
}
