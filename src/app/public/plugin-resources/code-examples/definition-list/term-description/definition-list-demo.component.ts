import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-definition-list-demo',
  templateUrl: './definition-list-demo.component.html'
})
export class DefinitionListDemoComponent {

  public items: { label: string, value: string }[] = [
    {
      label: 'Good Health and Well-being',
      value: 'Ensure healthy lives and promote well-being for all at all ages.'
    },
    {
      label: 'Quality Education',
      value: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.'
    },
    {
      label: 'Gender Equity',
      value: 'Achieve gender equality and empower all women and girls.'
    }
  ];

}
