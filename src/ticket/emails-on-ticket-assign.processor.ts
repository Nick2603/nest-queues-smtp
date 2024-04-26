import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueError,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';
import { queueNames } from 'src/queues-bull/queue-names';
import { EmailDataOnTicketAssignToUserEvent } from './interfaces';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';

@Processor(queueNames.EmailsOnTicketAssign)
export class EmailsOnTicketAssignProcessor {
  constructor(private readonly mailSenderService: MailSenderService) {}

  @Process()
  async process(job: Job<EmailDataOnTicketAssignToUserEvent>) {
    return this.mailSenderService.sendTicketAssignedInfo(job.data);
  }

  @OnQueueActive()
  onActive(job: Job<EmailDataOnTicketAssignToUserEvent>) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueError()
  onError(error: Error) {
    console.error(`Error processing job: ${error.message}`);
  }

  @OnQueueFailed()
  onFailed(job: Job<EmailDataOnTicketAssignToUserEvent>, error: Error) {
    console.error(`Job ${job.id} failed with error: ${error.message}`);
  }
}
