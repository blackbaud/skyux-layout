/**
 * Specifies how to display the term-description pairs within a description list.
 */
export enum SkyDescriptionListMode {

  /**
   * Displays terms and description vertically with the term above the description.
   * This mode provides a responsive layout and uses the description list's `orientation`
   * property to determine how to group term-description pairs.
   */
  standard = 'standard',

  /**
   * Displays terms and descriptions side by side with the term on the left and the description
   * on the right. This mode includes room for long descriptions and uses a responsive layout
   * that stacks term-description pairs vertically.
   */
  longDescription = 'longDescription'

}
