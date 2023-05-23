import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {NgxdModule} from '../../../index';

describe('NgxComponentOutlet check binding outputs', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let content: string;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [TestModule]});
  });

  it('should bind outputs', fakeAsync(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.activatedComponent).toBeDefined();

    component.activatedComponent.action.emit('action');

    expect(component.receivedAction).toBe('action');
  }));

  it('should save previous output binding when component re-rendered', fakeAsync(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.activatedComponent).toBeDefined();

    component.activatedComponent.action.emit('action');

    expect(component.receivedAction).toBe('action');

    component.component = null;

    fixture.detectChanges();

    expect(component.activatedComponent).toBeNull();

    component.component = DynamicComponent;

    fixture.detectChanges();

    expect(component.activatedComponent).toBeDefined();

    component.activatedComponent.action.emit('action2');

    expect(component.receivedAction).toBe('action2');
  }));
});

class BaseHostComponent {
}

@Component({
  selector: 'app-comp-dynamic',
  template: 'Dynamic Component name: {{ name }}, label: {{ label }} <ng-content></ng-content>',
})
class DynamicComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() label: string;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  inputsOnChanges: any;
  simpleChanges: SimpleChanges;
  inputsOnInit: any;

  ngOnChanges(changes: SimpleChanges) {
    this.inputsOnChanges = {name: this.name, label: this.label};
    this.simpleChanges = changes;
  }

  ngOnInit() {
    this.inputsOnInit = {name: this.name, label: this.label};
  }
}

@Component({
  selector: 'app-comp-another-dynamic',
  template: 'Dynamic Another Component name: {{ name }}, label: {{ label }}',
})
class AnotherDynamicComponent {
  @Input() name: string;
  @Input() label: string;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  selector: 'app-comp-different-properties-dynamic',
  template: 'Dynamic Different Properties Component name: {{ customName }}, label: {{ label }}',
})
class DifferentPropertiesDynamicComponent {
  @Input('name') customName: string;
  @Input('customLabel') label: string;
  @Output('action') customAction: EventEmitter<any> = new EventEmitter<any>();
  @Output('customSubmit') submit: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  selector: 'app-comp-with-getter-dynamic',
  template: 'Dynamic With Getter Component name: {{ customName }}',
})
class WithGetterDynamicComponent {
  private _customName: string;

  @Input('name') get customName(): string {
    return this._customName;
  }
}

@Component({
  selector: 'app-comp-with-setter-dynamic',
  template: 'Dynamic With Setter Component name: {{ customName }}',
})
class WithSetterDynamicComponent {
  private _customName: string;

  @Input('name') set customName(name: string) {
    this._customName = name;
  }
}

@Component({
  selector: 'app-comp-with-getter-and-setter-dynamic',
  template: 'Dynamic With Getter And Setter Component name: {{ customName }}',
})
class WithGetterAndSetterDynamicComponent {
  private _customName: string;

  @Input('name')
  get customName(): string {
    return this._customName;
  }

  set customName(name: string) {
    this._customName = name;
  }
}

@Component({
  selector: 'app-comp-a',
  template: 'Dynamic Empty Component',
})
class EmptyDynamicComponent {
}

@Component({
  selector: 'app-test-host',
  template: '',
  providers: [{provide: BaseHostComponent, useExisting: TestHostComponent}],
})
class TestHostComponent extends BaseHostComponent {
  @Input() name: string;
  @Input() label: string;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  selector: 'app-test-host-with-getter',
  template: '',
  providers: [{provide: BaseHostComponent, useExisting: WithGetterTestHostComponent}],
})
class WithGetterTestHostComponent extends BaseHostComponent {
  getterCalled: boolean;

  get name(): string {
    this.getterCalled = true;
    return 'Angular';
  }
}

@Component({
  selector: 'app-test-host-with-setter',
  template: '',
  providers: [{provide: BaseHostComponent, useExisting: WithSetterTestHostComponent}],
})
class WithSetterTestHostComponent extends BaseHostComponent {
  setterCalled: boolean;
  _name: string;

  @Input() set name(name: string) {
    this.setterCalled = true;
    this._name = name;
  }
}

@Component({
  selector: 'app-test-host-with-getter-and-setter',
  template: '',
  providers: [{provide: BaseHostComponent, useExisting: WithGetterAndSetterTestHostComponent}],
})
class WithGetterAndSetterTestHostComponent extends BaseHostComponent {
  getterCalled: boolean;
  setterCalled: boolean;
  _name: string;

  @Input()
  get name(): string {
    this.getterCalled = true;
    return this._name;
  }

  set name(name: string) {
    this.setterCalled = true;
    this._name = name;
  }
}

@Component({
  selector: 'app-test-comp',
  template: `
    <ng-container [ngxComponentOutlet]="component"
                  (ngxComponentOutletActivate)="activatedComponent = $event"
                  (ngxComponentOutletDeactivate)="activatedComponent = null"
    >
      <ng-container>
  `
})
class TestComponent {
  component: any = DynamicComponent;
  activatedComponent: any;

  receivedAction: any;

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(BaseHostComponent) hostComponent: any;

  constructor() {
    this.action.subscribe((event: any) => {
      this.receivedAction = event;
    });
  }
}

@Component({
  selector: 'app-component',
  template: `
    <app-test-comp [name]="'Angular'">
      <app-test-comp [name]="'React'"></app-test-comp>
    </app-test-comp>
  `,
})
class AppComponent {
}

@NgModule({
  imports: [NgxdModule],
  declarations: [
    AppComponent,
    DynamicComponent,
    AnotherDynamicComponent,
    DifferentPropertiesDynamicComponent,
    EmptyDynamicComponent,
    WithGetterDynamicComponent,
    WithSetterDynamicComponent,
    WithGetterAndSetterDynamicComponent,
    TestComponent,
    TestHostComponent,
    WithGetterTestHostComponent,
    WithSetterTestHostComponent,
    WithGetterAndSetterTestHostComponent,
  ],
  exports: [
    AppComponent,
    TestComponent,
    TestHostComponent,
    WithGetterTestHostComponent,
    WithSetterTestHostComponent,
    WithGetterAndSetterTestHostComponent,
  ],
})
class TestModule {
}
