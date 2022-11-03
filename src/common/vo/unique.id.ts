import { ValueObject } from './valueObject';
import { v4 as uuidv4 } from 'uuid';

interface IdProps {
  value?: string;
}

export class UniqueID extends ValueObject<IdProps> {
  get value(): string {
    return this.props.value;
  }
  // Can't use the `new` keyword from outside the scope of the class.
  private constructor(props: IdProps) {
    super(props);
  }
  public static async create(id?: string): Promise<UniqueID> {
    return new UniqueID({ value: id ?? uuidv4() });
  }
  public static from(id: string) {
    return UniqueID.create(id);
  }
  public static to(uid: UniqueID) {
    return uid.value;
  }
}
