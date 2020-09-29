import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-page-summary-demo',
  templateUrl: './page-summary-demo.component.html'
})
export class PageSummaryDemoComponent {

  public items: { label: string, value: string }[] = [
    {
      label: 'Field 1',
      value: 'Field 1 value'
    },
    {
      label: 'Field 2',
      value: 'Field 2 value'
    },
    {
      label: 'Field 3',
      value: undefined
    },
    {
      label: 'Field 4',
      value: 'Field 4 value'
    }
  ];

}
