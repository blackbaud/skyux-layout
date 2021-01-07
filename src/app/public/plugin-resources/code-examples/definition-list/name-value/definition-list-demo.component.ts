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
      label: 'College',
      value: 'Humanities and Social Sciences'
    },
    {
      label: 'Department',
      value: 'Anthropology'
    },
    {
      label: 'Advisor',
      value: 'Calandra Geer'
    },
    {
      label: 'Class year',
      value: '2024'
    }
  ];

}
