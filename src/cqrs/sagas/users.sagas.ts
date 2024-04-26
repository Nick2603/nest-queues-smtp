import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { SendEmailToCreatedUserCommand } from 'src/cqrs/commands/users/send-email-to-created-user.command';
import { UserCreatedEvent } from 'src/cqrs/events/users/user-created.event';

@Injectable()
export class UsersSagas {
  @Saga()
  userCreated = (
    events$: Observable<UserCreatedEvent>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(
        (event) =>
          new SendEmailToCreatedUserCommand(
            event.firstName,
            event.lastName,
            event.email,
          ),
      ),
    );
  };
}
