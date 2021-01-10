/**
 * Specifies the mode for the definition list.



 * Specifies how to display label-value pairs within the definition list.
 */
export enum SkyDefinitionListMode {

  /**
   * Specifies a layout where the labels have a fixed width.
   * Displays labels and values horizontally, with each label to the left and each value
   * on the right. This mode provides a fixed width for labels and stacks label-value
   * pairs vertically.
   */
  fixedWidth = 'fixedWidth',

  /**
   * Specifies a responsive layout where the labels are vertically paired with each value.
   * Displays labels and values vertically, with the label above the value.
   * This mode provides a responsive layout.
   */
  nameValuePair = 'nameValuePair',

  /**
   * Specifies a responsive layout where the labels are displayed in a left-hand column.
   * Displays labels and values horizontally, with the label on the left and the value
   * on the right. This mode provides a responsive layout.
   */
  termDescription = 'termDescription'

}
