import { ValueObject } from './valueObject';
interface RoleProps {
  value: string;
}

export class Role extends ValueObject<RoleProps> {
  get value(): string {
    return this.props.value;
  }
  // Can't use the `new` keyword from outside the scope of the class.
  private constructor(props: RoleProps) {
    super(props);
  }

  public static async create(role: string): Promise<Role> {
    if (
      role === undefined ||
      role === null ||
      role.length <= 2 ||
      role.length > 50
    ) {
      throw new Error('Role must be greater than 2 chars and less than 50.');
    } else {
      return new Role({ value: role });
    }
  }
  public static from(val: string) {
    return Role.create(val);
  }
  public static to(role: Role) {
    return role.value;
  }
}
