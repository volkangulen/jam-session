import { shallowEqual } from 'shallow-equal-object';

interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public async equals(vo?: ValueObject<T>): Promise<boolean> {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    const equals = shallowEqual(this.props, vo.props);
    return equals;
  }
}
