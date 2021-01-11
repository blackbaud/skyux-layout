/**
 * Specifies how to display the label-value pairs within a definition list.
 */
export enum SkyDefinitionListMode {

  /**
   * Displays labels and values side by side with the label on the left and the value
   * on the right. This mode provides a fixed width for labels and stacks label-value
   * pairs vertically.
   */
  fixedWidth = 'fixedWidth',

  /**
   * Displays labels and values vertically with the label above the value.
   * This mode provides a responsive layout and uses the definition list's `orientation`
   * property to determine how to group label-value pairs.
   */
  nameValuePair = 'nameValuePair',

  /**
   * Displays labels and values side by side with the label on the left and the value
   * on the right. This mode includes room for long values and uses a responsive layout
   * that stacks label-value pairs vertically.
   */
  termDescription = 'termDescription'

}
