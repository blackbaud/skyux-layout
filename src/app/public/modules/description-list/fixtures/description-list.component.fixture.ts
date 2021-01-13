import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './description-list.component.fixture.html'
})
export class SkyDescriptionListTestComponent {

  public personalInfo: {term: string, description?: string}[] = [
    {
      term: 'Job title',
      description: 'Engineer'
    },
    {
      term: 'Hobby',
      description: 'Volleyball'
    },
    {
      term: 'Experience'
    }
  ];

  public systemInfo: {term: string, description?: string}[] = [
    {
      term: 'Username',
      description: 'user1'
    },
    {
      term: 'Role',
      description: 'Admin'
    },
    {
      term: 'Last log-in time'
    }
  ];

}
