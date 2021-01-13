import {
  Component
} from '@angular/core';

import {
  SkyDocsDemoControlPanelChange,
  SkyDocsDemoControlPanelRadioChoice
} from '@skyux/docs-tools';

@Component({
  selector: 'app-description-list-docs',
  templateUrl: './description-list-docs.component.html',
  styleUrls: ['./description-list-docs.component.scss']
})
export class DescriptionListDocsComponent {

  public demoSettings: any = {};

  public nameValueItems: { label: string, value: string }[] = [
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

  public layoutChoices: SkyDocsDemoControlPanelRadioChoice[] = [
    { value: 'vertical', label: 'Vertical' },
    { value: 'horizontal', label: 'Horizontal' }
  ];

  public termDescriptionItems: { term: string, description: string }[] = [
    {
      term: 'Good Health and Well-being',
      description: 'Ensure healthy lives and promote well-being for all at all ages.'
    },
    {
      term: 'Quality Education',
      description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.'
    },
    {
      term: 'Gender Equity',
      description: 'Achieve gender equality and empower all women and girls.'
    }
  ];

  public onDemoSelectionChange(change: SkyDocsDemoControlPanelChange): void {
    if (change.orientation !== undefined) {
      this.demoSettings.orientation = change.orientation;
    }
  }

}
