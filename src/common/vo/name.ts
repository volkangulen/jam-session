import { ValueObject } from './valueObject';
interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  get value(): string {
    return this.props.value;
  }
  // Can't use the `new` keyword from outside the scope of the class.
  private constructor(props: NameProps) {
    super(props);
  }

  public static async create(name: string): Promise<Name> {
    if (!!name) {
      if (name.length <= 2 || name.length > 50) {
        throw new Error('Name must be greater than 2 chars and less than 50.');
      } else {
        return new Name({ value: name });
      }
    }
    return undefined;
  }
  public static from(val: string) {
    return Name.create(val);
  }
  public static to(name: Name) {
    return name.value;
  }
}
