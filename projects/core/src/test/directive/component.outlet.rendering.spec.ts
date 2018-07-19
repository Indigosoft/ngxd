import { Component, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxdModule } from '../../../index';

describe('NgxComponentOutlet check rendering component', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let content: string;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [ TestModule ] });
    });

    it('should render component', fakeAsync(() => {
        fixture = TestBed.createComponent(TestComponent);

        content = fixture.debugElement.nativeElement.innerHTML;
        expect(content).not.toContain('Dynamic Component');

        fixture.detectChanges();

        content = fixture.debugElement.nativeElement.innerHTML;
        expect(content).toContain('Dynamic Component');
    }));

    it('should destroy component', fakeAsync(() => {
        fixture = TestBed.createComponent(TestComponent);

        fixture.detectChanges();

        content = fixture.debugElement.nativeElement.innerHTML;
        expect(content).toContain('Dynamic Component');

        fixture.componentInstance.component = null;
        fixture.detectChanges();

        content = fixture.debugElement.nativeElement.innerHTML;
        expect(content).not.toContain('Dynamic Component');
    }));

    it('should emit activate component event when component created', fakeAsync(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        expect(component.activatedComponent).toBeUndefined();

        fixture.detectChanges();

        expect(component.activatedComponent).toEqual(jasmine.any(DynamicComponent));
    }));

    it('should emit deactivate component event when component destroyed', fakeAsync(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        expect(component.deactivatedComponent).toBeUndefined();

        component.component = null;
        fixture.detectChanges();

        expect(component.deactivatedComponent).toEqual(jasmine.any(DynamicComponent));
    }));

    it('should not raise exception when component is empty', fakeAsync(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        component.component = null;

        expect(fixture.detectChanges.bind(fixture)).not.toThrow();
    }));

    it('should render another component', fakeAsync(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        content = fixture.debugElement.nativeElement.innerHTML;

        expect(content).toContain('Dynamic Component');
        expect(component.activatedComponent).toEqual(jasmine.any(DynamicComponent));

        component.component = AnotherDynamicComponent;
        fixture.detectChanges();

        content = fixture.debugElement.nativeElement.innerHTML;

        expect(content).not.toContain('Dynamic Component');
        expect(content).toContain('Dynamic Another Component');
        expect(component.activatedComponent).toEqual(jasmine.any(AnotherDynamicComponent));
        expect(component.deactivatedComponent).toEqual(jasmine.any(DynamicComponent));
    }));

    it('should not re-render when component type is not changed', fakeAsync(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        content = fixture.debugElement.nativeElement.innerHTML;

        const activatedComponent: DynamicComponent = component.activatedComponent;

        expect(content).toContain('Dynamic Component');
        expect(activatedComponent).toEqual(jasmine.any(DynamicComponent));
        expect(component.deactivatedComponent).toBeUndefined();

        component.component = DynamicComponent;
        fixture.detectChanges();

        content = fixture.debugElement.nativeElement.innerHTML;

        expect(content).toContain('Dynamic Component');
        expect(component.activatedComponent).toBe(activatedComponent);
        expect(component.deactivatedComponent).toBeUndefined();
    }));
});

@Component({ selector: 'app-comp-dynamic', template: 'Dynamic Component' })
class DynamicComponent {}

@Component({ selector: 'app-comp-another-dynamic', template: 'Dynamic Another Component' })
class AnotherDynamicComponent {}

@Component({ selector: 'app-test-host', template: '' })
class TestHostComponent {}

@Component({
    selector: 'app-test-comp',
    template: `<app-test-host [ngxComponentOutlet]="component"
                       (ngxComponentOutletActivate)="onActivate($event)"
                       (ngxComponentOutletDeactivate)="onDeactivate($event)"></app-test-host>`
})
class TestComponent {
    component: any = DynamicComponent;
    activatedComponent: any;
    deactivatedComponent: any;

    onActivate($event) {
        this.activatedComponent = $event;
    }

    onDeactivate($event) {
        this.deactivatedComponent = $event;
    }
}

@NgModule({
    imports: [ NgxdModule ],
    declarations: [ DynamicComponent, AnotherDynamicComponent, TestComponent, TestHostComponent ],
    exports: [ TestComponent, TestHostComponent ],
    entryComponents: [ DynamicComponent, AnotherDynamicComponent ]
})
class TestModule {}
