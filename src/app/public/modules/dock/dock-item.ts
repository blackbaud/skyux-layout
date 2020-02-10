import {
  Observable,
  Subject
} from 'rxjs';

export class SkyDockItem<T> {

  public readonly componentInstance: T;

  public get destroyed(): Observable<void> {
    return this._destroyed.asObservable();
  }

  private _destroyed = new Subject<void>();

  constructor(
    componentRef: T
  ) {
    this.componentInstance = componentRef;
  }

  public destroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

}
