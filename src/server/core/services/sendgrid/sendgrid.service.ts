import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger('SendgridService');
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_KEY'));
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    this.logger.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }
}
