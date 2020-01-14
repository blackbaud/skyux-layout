import {
  Injectable
} from '@angular/core';

@Injectable()
export class SkyPageThemeService {

  private styleEl: HTMLStyleElement;

  public addTheme() {
    if (!this.styleEl) {
      this.styleEl = document.createElement('style');
      this.styleEl.appendChild(document.createTextNode('body { background-color: #fff; }'));

      document.head.appendChild(this.styleEl);
    }
  }

  public removeTheme() {
    if (this.styleEl) {
      document.head.removeChild(this.styleEl);
      this.styleEl = undefined;
    }
  }

}
