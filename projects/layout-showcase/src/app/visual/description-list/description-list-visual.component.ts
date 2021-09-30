import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-description-list-visual',
  templateUrl: './description-list-visual.component.html'
})
export class DescriptionListVisualComponent {

  public mode: any;

  public orgInfo: {label: string, value?: string}[] = [
    {
      label: 'Organization name',
      value: 'This name appears as the creator of the application on the App Marketplace card.'
    },
    {
      label: 'Organization name'
    },
    {
      label: 'Organization name',
      value: 'This name appears as the creator of the application on the App Marketplace card.'
    }
  ];

  public personalInfo: {label: string, value?: string}[] = [
    {
      label: 'College',
      value: 'Humanities and Social Sciences'
    },
    {
      label: 'Department',
      value: 'Anthropology'
    },
    {
      label: 'Advisor'
    },
    {
      label: 'Class Year',
      value: '2024'
    }
  ];
}
