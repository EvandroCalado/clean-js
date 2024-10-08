/**
 * @description This class not should be instanced directly, use Either.left or Either.right
 */

module.exports = class Either {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static left(left) {
    return new Either(left, null);
  }

  static right(right) {
    return new Either(null, right);
  }

  static valueRegistered(value) {
    return { message: `${value} already registered` };
  }
};
