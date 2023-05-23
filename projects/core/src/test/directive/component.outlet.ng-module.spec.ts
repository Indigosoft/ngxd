import { Compiler, Component, Injector, NgModule, NgModuleFactory } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxdModule } from '../../../index';

describe('NgxComponentOutlet check custom ngModule', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let compiler: Compiler;
  let content: string;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestModule] });
  });

  it('should use custom ngModuleFactory', fakeAsync(() => {
    compiler = TestBed.get(Compiler);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.componentInstance.module = compiler.compileModuleSync(DynamicModule);
    fixture.detectChanges();

    content = fixture.debugElement.nativeElement.innerHTML;
    expect(content).toContain('Dynamic Component');
  }));
});

@Component({
  selector: 'app-comp-dynamic',
  template: 'Dynamic Component',
})
class DynamicComponent {}

@NgModule({
  declarations: [DynamicComponent],
})
class DynamicModule {}

@Component({
  selector: 'app-test-comp',
  template:
    '<ng-container *ngxComponentOutlet="component; ngModuleFactory: module"></ng-container>',
})
class TestComponent {
  component: any = DynamicComponent;
  module: NgModuleFactory<any>;
}

@NgModule({
  imports: [NgxdModule],
  declarations: [TestComponent],
  exports: [TestComponent],
})
class TestModule {}
