import { ValueObject } from './valueObject';
import { createHash } from 'crypto';
import { BadRequestException } from '@nestjs/common';

interface PasswordProps {
  value?: string;
}
export class Password extends ValueObject<PasswordProps> {
  get value(): string {
    return this.props.value;
  }

  // Can't use the `new` keyword from outside the scope of the class.
  private constructor(props: PasswordProps) {
    super(props);
  }

  public static valid(password: string) {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    return regex.test(password);
  }

  public static async create(password: string, validate: boolean): Promise<Password> {
    if (validate) {
      if (!Password.valid(password)) {
        throw new BadRequestException(`Password must contain 1 number (0-9) 
                        Password must contain 1 uppercase letters 
                        Password must contain 1 lowercase letters 
                        Password must contain 1 non-alpha numeric number 
                        Password is 8-16 characters with no space`);
      }
      const hashed = createHash('sha256').update(password).digest('hex');
      return new Password({ value: hashed });
    }
    return new Password({ value: password });
  }
}
