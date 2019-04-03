import {
  Component,
  Input,
  NgModule,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxdModule } from '../../../index';

describe('NgxComponentOutlet check custom projectable nodes', () => {
  let fixture: ComponentFixture<TestComponent>;
  let content: string;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestModule] });
  });

  it('should render projectable nodes', fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent) as any;

    fixture.detectChanges();
    content = fixture.nativeElement.innerHTML;

    expect(content).toContain('Dynamic Component');
    expect(content).toContain('name: Angular');
    expect(content).toContain('name: React');
  }));
});

@Component({
  selector: 'app-comp-dynamic',
  template: 'Dynamic Component name: {{ name }} <ng-content></ng-content>',
})
class DynamicComponent {
  @Input() name: string;
}

@Component({
  selector: 'app-test-host',
  template: '',
})
class TestHostComponent {
  @Input() name: string;
}

@Component({
  selector: 'app-test-comp',
  template: `
    <app-test-host
      [name]="name"
      [ngxComponentOutlet]="component"
      [ngxComponentOutletContent]="projectableNodes"
    ></app-test-host>
    <ng-template><ng-content></ng-content></ng-template>
  `,
})
class TestComponent {
  @Input() name: string;
  component: any = DynamicComponent;

  projectableNodes: any[][];

  @ViewChild(TemplateRef) set templateRef(templateRef: TemplateRef<any>) {
    if (this.viewContainerRef && templateRef) {
      this.projectableNodes = [this.viewContainerRef.createEmbeddedView(templateRef).rootNodes];
    }
  }

  constructor(private viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'app-component',
  template: `
    <app-test-comp [name]="'Angular'">
      <app-test-comp [name]="'React'"></app-test-comp>
    </app-test-comp>
  `,
})
class AppComponent {}

@NgModule({
  imports: [NgxdModule],
  declarations: [AppComponent, DynamicComponent, TestComponent, TestHostComponent],
  exports: [AppComponent, TestComponent, TestHostComponent],
  entryComponents: [DynamicComponent],
})
class TestModule {}
