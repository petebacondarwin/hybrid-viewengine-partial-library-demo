import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-the-lib',
  template: `<p>{{name}} works!</p>
  `
})
export class TheLibComponent {
  name = 'the-lib';
}
