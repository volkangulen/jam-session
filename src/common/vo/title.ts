import { BadRequestException } from '@nestjs/common';
import { ValueObject } from './valueObject';
interface TitleProps {
  value: string;
}

export class Title extends ValueObject<TitleProps> {
  get value(): string {
    return this.props.value;
  }
  // Can't use the `new` keyword from outside the scope of the class.
  private constructor(props: TitleProps) {
    super(props);
  }

  public static async create(title: string): Promise<Title> {
    if (title === undefined || title === null || title.length <= 2 || title.length > 50) {
      throw new BadRequestException('Title must be greater than 2 chars and less than 50.');
    } else {
      return new Title({ value: title });
    }
  }
  public static from(val: string) {
    return Title.create(val);
  }
  public static to(title: Title) {
    return title.value;
  }
}
