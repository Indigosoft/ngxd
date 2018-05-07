import {
    AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, Inject, Input,
    NgModule, OnChanges, OnDestroy, OnInit, SimpleChanges, Type
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxComponentOutletModule } from '../../src';
import { TestCaseBuilder } from '../../testing/test-case';

const ANGULAR = 'Angular';
const REACT = 'React';
const FRAMEWORK = 'Framework';
const LIBRARY = 'Library';

class HookLogger {
    hooks: { ctor: Type<any>, name: string, state: { name: string, label: string }, changes?: SimpleChanges }[] = [];

    log(ctor: Type<any>, name: string, state: { name: string, label: string }, changes?: SimpleChanges) {
        this.hooks.push({ ctor, name, state, changes });
    }
}

class DynamicComponentBase {
    @Input() name: string;
    @Input() label: string;

    get componentName(): string {
        return this.constructor.name;
    }

    constructor(@Inject(HookLogger) private logger: HookLogger) {}

    protected log(name: string, changes?: SimpleChanges) {
        this.logger.log(this.constructor as Type<any>, name, { name: this.name, label: this.label }, changes);
    }
}

const DYNAMIC_COMPONENT_TEMPLATE = 'component: {{componentName}} name: {{ name }}, label: {{ label }}';

@Component({ selector: 'app-comp-dynamic-on-changes', template: DYNAMIC_COMPONENT_TEMPLATE })
class OnChangesDynamicComponent extends DynamicComponentBase implements OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
        this.log('ngOnChanges', changes);
    }
}

@Component({ selector: 'app-comp-dynamic-on-init', template: DYNAMIC_COMPONENT_TEMPLATE })
class OnInitDynamicComponent extends DynamicComponentBase implements OnInit {
    ngOnInit(): void {
        this.log('ngOnInit');
    }
}

@Component({ selector: 'app-comp-dynamic-do-check', template: DYNAMIC_COMPONENT_TEMPLATE })
class DoCheckDynamicComponent extends DynamicComponentBase implements DoCheck {
    ngDoCheck(): void {
        this.log('ngDoCheck');
    }
}

@Component({ selector: 'app-comp-dynamic-on-changes-on-init', template: DYNAMIC_COMPONENT_TEMPLATE })
class OnChangesOnInitDynamicComponent extends DynamicComponentBase implements OnChanges, OnInit {
    ngOnChanges(changes: SimpleChanges): void {
        this.log('ngOnChanges', changes);
    }

    ngOnInit(): void {
        this.log('ngOnInit');
    }
}

@Component({ selector: 'app-comp-dynamic-on-changes-do-check', template: DYNAMIC_COMPONENT_TEMPLATE })
class OnChangesDoCheckDynamicComponent extends DynamicComponentBase implements OnChanges, DoCheck {
    ngOnChanges(changes: SimpleChanges): void {
        this.log('ngOnChanges', changes);
    }

    ngDoCheck(): void {
        this.log('ngDoCheck');
    }
}

@Component({ selector: 'app-comp-dynamic-on-init-do-check', template: DYNAMIC_COMPONENT_TEMPLATE })
class OnInitDoCheckDynamicComponent extends DynamicComponentBase implements OnInit, DoCheck {
    ngOnInit(): void {
        this.log('ngOnInit');
    }

    ngDoCheck(): void {
        this.log('ngDoCheck');
    }
}

@Component({ selector: 'app-comp-dynamic-on-changes-on-init-do-check', template: DYNAMIC_COMPONENT_TEMPLATE })
class OnChangesOnInitDoCheckDynamicComponent extends DynamicComponentBase implements OnChanges, OnInit, DoCheck {
    ngOnChanges(changes: SimpleChanges): void {
        this.log('ngOnChanges', changes);
    }

    ngOnInit(): void {
        this.log('ngOnInit');
    }

    ngDoCheck(): void {
        this.log('ngDoCheck');
    }
}

@Component({ selector: 'app-comp-dynamic-full-lifecycle', template: DYNAMIC_COMPONENT_TEMPLATE })
class FullLifecycleDynamicComponent extends DynamicComponentBase
    implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    ngAfterContentChecked(): void {
        this.log('ngAfterContentChecked');
    }

    ngAfterContentInit(): void {
        this.log('ngAfterContentInit');
    }

    ngAfterViewChecked(): void {
        this.log('ngAfterViewChecked');
    }

    ngAfterViewInit(): void {
        this.log('ngAfterViewInit');
    }

    ngDoCheck(): void {
        this.log('ngDoCheck');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.log('ngOnChanges', changes);
    }

    ngOnDestroy(): void {
        this.log('ngOnDestroy');
    }

    ngOnInit(): void {
        this.log('ngOnInit');
    }
}

@Component({ selector: 'app-comp-dynamic-child-of-on-changes', template: DYNAMIC_COMPONENT_TEMPLATE })
class ChildOfOnChangesDynamicComponent extends OnChangesDynamicComponent {}

@Component({ selector: 'app-comp-dynamic-child-of-on-init', template: DYNAMIC_COMPONENT_TEMPLATE })
class ChildOfOnInitDynamicComponent extends OnInitDynamicComponent {}

@Component({ selector: 'app-comp-dynamic-child-of-do-check', template: DYNAMIC_COMPONENT_TEMPLATE })
class ChildOfDoCheckDynamicComponent extends DoCheckDynamicComponent {}

@Component({ selector: 'app-comp-dynamic-child-of-on-changes-on-init', template: DYNAMIC_COMPONENT_TEMPLATE })
class ChildOfOnChangesOnInitDynamicComponent extends OnChangesOnInitDynamicComponent {}

@Component({ selector: 'app-comp-dynamic-child-of-on-changes-do-check', template: DYNAMIC_COMPONENT_TEMPLATE })
class ChildOfOnChangesDoCheckDynamicComponent extends OnChangesDoCheckDynamicComponent {}

@Component({ selector: 'app-comp-dynamic-child-of-on-init-do-check', template: DYNAMIC_COMPONENT_TEMPLATE })
class ChildOfOnInitDoCheckDynamicComponent extends OnInitDoCheckDynamicComponent {}

@Component({ selector: 'app-comp-dynamic-child-of-on-changes-on-init-do-check', template: DYNAMIC_COMPONENT_TEMPLATE })
class ChildOfOnChangesOnInitDoCheckDynamicComponent extends OnChangesOnInitDoCheckDynamicComponent {}

@Component({ selector: 'app-comp-dynamic-child-of-full-lifecycle', template: DYNAMIC_COMPONENT_TEMPLATE })
class ChildOfFullLifecycleDynamicComponent extends FullLifecycleDynamicComponent {}

@Component({ selector: 'app-test-host', template: '' })
class TestHostComponent {
    @Input() name: string;
    @Input() label: string;
}

@Component({
    selector: 'app-test-comp',
    template: `
        <app-test-host [name]="name" [label]="label" [ngxComponentOutlet]="component"
                       (ngxComponentOutletActivate)="activatedComponent = $event"></app-test-host>`
})
class TestComponent {
    name;
    label;
    component: any;
    activatedComponent: any;
}

const DYNAMIC_COMPONENTS = [
    OnChangesDynamicComponent,
    OnInitDynamicComponent,
    DoCheckDynamicComponent,
    OnChangesOnInitDynamicComponent,
    OnChangesDoCheckDynamicComponent,
    OnInitDoCheckDynamicComponent,
    OnChangesOnInitDoCheckDynamicComponent,
    FullLifecycleDynamicComponent
];

const CHILDREN_DYNAMIC_COMPONENTS = [
    ChildOfOnChangesDynamicComponent,
    ChildOfOnInitDynamicComponent,
    ChildOfDoCheckDynamicComponent,
    ChildOfOnChangesOnInitDynamicComponent,
    ChildOfOnChangesDoCheckDynamicComponent,
    ChildOfOnInitDoCheckDynamicComponent,
    ChildOfOnChangesOnInitDoCheckDynamicComponent,
    ChildOfFullLifecycleDynamicComponent
];

const TEST_COMPONENTS = [ TestComponent, TestHostComponent ];

@NgModule({
    imports: [ NgxComponentOutletModule.forRoot() ],
    declarations: [ DYNAMIC_COMPONENTS, CHILDREN_DYNAMIC_COMPONENTS, TEST_COMPONENTS ],
    exports: [ TEST_COMPONENTS ],
    entryComponents: [ DYNAMIC_COMPONENTS, CHILDREN_DYNAMIC_COMPONENTS ],
    providers: [ HookLogger, TestCaseBuilder ]
})
class TestModule {}

function makeTest(componentType: Type<any>) {
    const builder: TestCaseBuilder = TestBed.get(TestCaseBuilder);
    const logger: HookLogger = TestBed.get(HookLogger);
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);

    const report = builder.operations([
        builder.operation([
            builder.changeComponent(componentType),
            builder.changeInput('name', ANGULAR),
            builder.changeInput('label', FRAMEWORK)
        ]),
        builder.operation([
            builder.changeInput('name', REACT),
            builder.changeInput('label', LIBRARY)
        ]),
        builder.operation([
            builder.changeInput('name', ANGULAR)
        ]),
        builder.operation([
            builder.changeInput('name', ANGULAR)
        ]),
        builder.operation([
            builder.changeInput('label', FRAMEWORK)
        ]),
        builder.operation([]),
        builder.operation([
            builder.resetComponent(),
            builder.resetInput('name'),
            builder.resetInput('label')
        ]),
        builder.operation([]),
        builder.operation([
            builder.changeComponent(componentType),
            builder.changeInput('name', REACT),
            builder.changeInput('label', LIBRARY)
        ])
    ]).execute(fixture).report();

    expect(logger.hooks).toEqual(report.lifecycle);
}

describe('NgxComponentOutlet check lifecycle hooks', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [ TestModule ] });
    });

    describe('should calls lifecycle hooks', () => {

        [ DYNAMIC_COMPONENTS, CHILDREN_DYNAMIC_COMPONENTS ].forEach((components) => {
            components.forEach((component) =>
                it(`with ${component.prototype.constructor.name} dynamic component`, fakeAsync(() => {
                    makeTest(component);
                }))
            );

            components.forEach((component) =>
                it(`with ${component.prototype.constructor.name} dynamic component and change detection strategy OnPush`, fakeAsync(() => {
                    TestBed.overrideComponent(component, { set: { changeDetection: ChangeDetectionStrategy.OnPush } });
                    makeTest(component);
                }))
            );
        });

    });

    it('should call lifecycle hooks of extendable class', fakeAsync(() => {
        pending();
    }));
});
