/**
 * @desc  BaseEntities are the base of identifiable entities
 */
export abstract class BaseEntity {
  protected readonly _id: string;
  get id() {
    return this._id;
  }


  public equals(object?: BaseEntity): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this._id == object._id;
  }
}
