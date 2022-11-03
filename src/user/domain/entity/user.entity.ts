import { UniqueID } from '@common/vo/unique.id';
import { Name } from '@common/vo/name';
import { Role } from '@common/vo/role';
import { AggregateRoot } from '@nestjs/cqrs';
import { Email } from '@common/vo/email';
import { Password } from '@common/vo/password';

interface UserProps {
  role: Role;
  name: Name;
  email: Email;
  password: Password;
  id: UniqueID;
}

export class User extends AggregateRoot {
  private readonly _name: Name;
  private readonly _role: Role;
  private readonly _email: Email;
  private readonly _password: Password;
  private readonly _id: UniqueID;

  private constructor(props: UserProps) {
    super();
    this._name = props.name;
    this._role = props.role;
    this._email = props.email;
    this._password = props.password;
    this._id = props.id;
  }
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  get role() {
    return this._role;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }

  public static async create(props: UserProps): Promise<User> {
    return new User(props);
  }

  public async validatePassword(password: Password): Promise<boolean> {
    return this._password.equals(password);
  }
}
