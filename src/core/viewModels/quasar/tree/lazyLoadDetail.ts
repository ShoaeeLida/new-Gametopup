export interface LazyLoadDetail<T> {
 /**
     * The node to which the new nodes (the children) will be appended
     */
  node: T;
  /**
   * The key of the node getting the newly loaded child nodes
   */
  key: string;
  /**
   * The callback to be carried out when the loading is successful
   */
  done: (children: T[]) => void;
  /**
   * The callback to be carried out should the loading fails
   */
  fail: () => void;
}
