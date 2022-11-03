import { BadRequestException } from '@nestjs/common';
import { ValueObject } from './valueObject';

interface DescriptionProps {
  value: string;
}
export class Description extends ValueObject<DescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  // Can't use the `new` keyword from outside the scope of the class.
  private constructor(props: DescriptionProps) {
    super(props);
  }

  public static async create(description: string):Promise<Description> {
    if (
      description === undefined ||
      description === null ||
      description.length <= 5 ||
      description.length > 255
    ) {
      throw new BadRequestException(
        'Description must be greater than 5 chars and less than 255.',
      );
    } else {
    return new Description({ value: description });
    }
  }
  public static from(val: string) {
    return Description.create(val);
  }
  public static to(description: Description) {
    return description.value;
  }
}
