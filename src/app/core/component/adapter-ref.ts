import { ComponentFactory, ComponentRef, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class ComponentAdapterRef<TComponent> {

    private attachedOutputs: Subscription[] = [];

    constructor(public componentFactory: ComponentFactory<TComponent>, public componentRef: ComponentRef<TComponent>) {}

    attachOutputs(parent: TComponent) {
        this.disposeOutputs();

        const filteredOutputs: string[] =
            this.componentFactory.outputs.map(({ propName }) => propName)
                .filter((propName) => parent.hasOwnProperty(propName));

        this.attachedOutputs =
            filteredOutputs.map((propName) =>
                this.componentRef.instance[ propName ].subscribe(parent[ propName ]));
    }

    attachInputs(changes: SimpleChanges) {
        const hasChanges: boolean = this.componentFactory.inputs.some(({ propName }) => changes.hasOwnProperty(propName));

        if (!hasChanges) {
            return;
        }

        this.componentFactory.inputs
            .filter(({ propName }) => changes.hasOwnProperty(propName))
            .forEach(({ propName }) =>
                this.componentRef.instance[ propName ] = changes[ propName ].currentValue);

        if (typeof (this.componentRef.instance as any).ngOnChanges === 'function') {
            (this.componentRef.instance as any).ngOnChanges(changes);
        }

        this.componentRef.changeDetectorRef.detectChanges();
    }

    dispose() {
        this.disposeOutputs();
        this.componentRef.destroy();
    }

    private disposeOutputs() {
        if (this.attachedOutputs) {
            this.attachedOutputs.splice(0).forEach((subscription) => subscription.unsubscribe());
        }
    }

}
