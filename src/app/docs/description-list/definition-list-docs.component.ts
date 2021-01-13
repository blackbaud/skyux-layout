import {
  Component
} from '@angular/core';

import {
  SkyDocsDemoControlPanelChange, SkyDocsDemoControlPanelRadioChoice
} from '@skyux/docs-tools';

@Component({
  selector: 'app-definition-list-docs',
  templateUrl: './definition-list-docs.component.html',
  styleUrls: ['./definition-list-docs.component.scss']
})
export class DefinitionListDocsComponent {

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

  public termDescriptionItems: { label: string, value: string }[] = [
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

  public onDemoSelectionChange(change: SkyDocsDemoControlPanelChange): void {
    if (change.orientation !== undefined) {
      this.demoSettings.orientation = change.orientation;
    }
  }

}
