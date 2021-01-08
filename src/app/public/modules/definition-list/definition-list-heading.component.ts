import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

/**
 * Specifies a title for the definition list.
 * @deprecated Do not use the `<sky-definition-list-heading>` component in your template
 * because it will be a breaking change in the next major version release. Instead,
 * include a header above the defintion list component that uses a SKY UX supported class:
 * `<h3 class="sky-subsection-heading sky-margin-stacked-compact">My list</h3>`
 * `<sky-definition-list>...</sky-definition-list>`
 */
@Component({
  selector: 'sky-definition-list-heading',
  templateUrl: './definition-list-heading.component.html',
  styleUrls: ['./definition-list-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListHeadingComponent { }
