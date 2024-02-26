export interface AppInitializer {
  /**
   * Use this function to initialize a resource.
   *
   * This could include:
   * - perform the first fetch to a ~static result
   * - set static state parts
   *
   * @param args implementation detail of the user
   */
  initialize: <T = unknown>(...args: T[]) => void;
}
