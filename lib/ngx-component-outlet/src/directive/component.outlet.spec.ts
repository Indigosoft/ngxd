import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxComponentOutletModule } from '../index';

describe('NgxComponentOutlet', () => {
    describe('check rendering component', () => {
        let fixture: ComponentFixture<TestComponent>;
        let component: TestComponent;
        let content: string;

        beforeEach(() => {
            TestBed.configureTestingModule({ imports: [ TestModule ] });
        });

        it('should render component', fakeAsync(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;

            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).not.toContain('Dynamic Component');

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('Dynamic Component');
        }));

        it('should destroy component', fakeAsync(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();

            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('Dynamic Component');

            component.component = null;

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).not.toContain('Dynamic Component');
        }));

        it('should emit activate component event when component created', fakeAsync(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;

            content = fixture.debugElement.nativeElement.innerHTML;

            expect(component.activatedComponent).toBeFalsy();

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(component.activatedComponent).toEqual(jasmine.any(DynamicComponent));
        }));

        it('should emit deactivate component event when component destroyed', fakeAsync(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();

            expect(component.deactivatedComponent).toBeFalsy();

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
            expect(component.deactivatedComponent).toBeFalsy();

            component.component = DynamicComponent;

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('Dynamic Component');
            expect(component.activatedComponent).toBe(activatedComponent);
            expect(component.deactivatedComponent).toBeFalsy();
        }));
    });

    describe('check binding inputs', () => {
        let fixture: ComponentFixture<TestComponent>;
        let component: TestComponent;
        let content: string;

        beforeEach(() => {
            TestBed.configureTestingModule({ imports: [ TestModule ] });
        });

        it('should bind inputs', fakeAsync(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('name: Angular');
            expect(content).toContain('label: Framework');

            component.name = 'React';
            component.label = 'Library';

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('name: React');
            expect(content).toContain('label: Library');
        }));

        it('should save previous state of inputs when component re-rendered', fakeAsync(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('Dynamic Component');
            expect(content).toContain('name: Angular');
            expect(content).toContain('label: Framework');

            component.component = AnotherDynamicComponent;

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('Dynamic Another Component');
            expect(content).toContain('name: Angular');
            expect(content).toContain('label: Framework');
        }));

        it('should detect changes when component OnPush', fakeAsync(() => {
            TestBed.overrideComponent(DynamicComponent, { set: { changeDetection: ChangeDetectionStrategy.OnPush } });
            TestBed.overrideComponent(AnotherDynamicComponent, { set: { changeDetection: ChangeDetectionStrategy.OnPush } });

            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('Dynamic Component');
            expect(content).toContain('name: Angular');
            expect(content).toContain('label: Framework');

            component.component = AnotherDynamicComponent;

            fixture.detectChanges();
            content = fixture.debugElement.nativeElement.innerHTML;

            expect(content).toContain('Dynamic Another Component');
            expect(content).toContain('name: Angular');
            expect(content).toContain('label: Framework');
        }));

        it('should binding when host have input with getter only', fakeAsync(() => {
            pending();
        }));

        it('should binding when host have input with setter only', fakeAsync(() => {
            pending();
        }));

        it('should binding when host have input with getter and setter', fakeAsync(() => {
            pending();
        }));

        it('should have input value when lifecycle hook onInit called', fakeAsync(() => {
            pending();
        }));

        it('should have input value when lifecycle hook onChanges called', fakeAsync(() => {
            pending();
        }));
    });

    describe('check binding outputs', () => {
        let fixture: ComponentFixture<TestComponent>;
        let component: TestComponent;
        let content: string;

        beforeEach(() => {
            TestBed.configureTestingModule({ imports: [ TestModule ] });
        });

        it('should bind outputs', fakeAsync(() => {
            pending();
        }));

        it('should save previous output binding when component re-rendered', fakeAsync(() => {
            pending();
        }));
    });

    describe('check lifecycle hooks', () => {
        let fixture: ComponentFixture<TestComponent>;
        let component: TestComponent;
        let content: string;

        beforeEach(() => {
            TestBed.configureTestingModule({ imports: [ TestModule ] });
        });

        describe('should calls lifecycle hooks', () => {

            it('when dynamic component have onChanges only', fakeAsync(() => {
                pending();
            }));

            it('when dynamic component have onInit only', fakeAsync(() => {
                pending();
            }));

            it('when dynamic component have doCheck only', fakeAsync(() => {
                pending();
            }));

            it('when dynamic component have onChanges and onInit only', fakeAsync(() => {
                pending();
            }));

            it('when dynamic component have onChanges and doCheck only', fakeAsync(() => {
                pending();
            }));

            it('when dynamic component have onInit and doCheck only', fakeAsync(() => {
                pending();
            }));

            it('when dynamic component have onChanges, onInit and doCheck', fakeAsync(() => {
                pending();
            }));

        });

        it('should call lifecycle hooks of parent class', fakeAsync(() => {
            pending();
        }));

        it('should call lifecycle hooks of extendable class', fakeAsync(() => {
            pending();
        }));
    });

    describe('check custom ngModule', () => {
    });

    describe('check custom injector', () => {
    });

    describe('check custom injector', () => {
    });

    describe('check custom projectable nodes', () => {
    });
});

@Component({
    selector: 'app-test-host',
    template: ''
})
class TestHostComponent {
    @Input() name: string;
    @Input() label: string;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
    selector: 'app-test-comp',
    template: `
        <app-test-host [name]="name" [label]="label" (action)="action = $event" (submit)="submit = $event"
                       [ngxComponentOutlet]="component"
                       (ngxComponentOutletActivate)="activatedComponent = $event"
                       (ngxComponentOutletDeactivate)="deactivatedComponent = $event"></app-test-host>`
})
class TestComponent {
    name = 'Angular';
    label = 'Framework';
    component: any = DynamicComponent;
    activatedComponent: any;
    deactivatedComponent: any;
    action: any;
    submit: any;

    @ViewChild(TestHostComponent) hostComponent: TestHostComponent;
}

@Component({
    selector: 'app-comp-dynamic',
    template: 'Dynamic Component name: {{ name }}, label: {{ label }}'
})
class DynamicComponent {
    @Input() name: string;
    @Input() label: string;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
    selector: 'app-comp-another-dynamic',
    template: 'Dynamic Another Component name: {{ name }}, label: {{ label }}'
})
class AnotherDynamicComponent {
    @Input() name: string;
    @Input() label: string;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
    selector: 'app-comp-a',
    template: 'Dynamic Empty Component'
})
class EmptyDynamicComponent {
}

@NgModule({
    imports: [ NgxComponentOutletModule.forRoot() ],
    declarations: [ DynamicComponent, AnotherDynamicComponent, EmptyDynamicComponent, TestComponent, TestHostComponent ],
    exports: [ TestComponent, TestHostComponent ],
    entryComponents: [ DynamicComponent, AnotherDynamicComponent, EmptyDynamicComponent ]
})
class TestModule {
}
