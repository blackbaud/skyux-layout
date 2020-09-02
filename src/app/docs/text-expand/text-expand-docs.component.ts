import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-text-expand-docs',
  templateUrl: './text-expand-docs.component.html'
})
export class TextExpandDocsComponent {

  // tslint:disable-next-line
  public longText = 'The text expand component truncates long blocks of text with an ellipsis and a link to expand the full text. When users click the link, the component expands to display the full text inline unless it exceeds limits on text characters or newline characters. If the text exceeds those limits, then the link expands the full text in a modal view instead. The component does not truncate text that is shorter than a specified threshold, but it always truncates text that includes newline characters and removes those newline characters from the truncated text.';

 }
