import { BadRequestException } from '@nestjs/common';
import { ValueObject } from './valueObject';

interface EmailProps {
  value: string;
}
export class Email extends ValueObject<EmailProps> {
  get value(): string {
    return this.props.value;
  }

  // Can't use the `new` keyword from outside the scope of the class.
  private constructor(props: EmailProps) {
    super(props);
  }

  public static valid(email: string) {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
  }

  public static  async create(email: string): Promise<Email> {
    if (!Email.valid(email)) {
      throw new BadRequestException('Email is not valid!');
    } else {
      return new Email({ value: email });
    }
  }
}
