import { InjectionToken, Provider, Type } from '@angular/core';
import { FeatureDecorator } from './feature.decorator';

export const FEATURES = new InjectionToken('Features');

export function provideFeature<TFeature, TConfig>(type: string, feature: Type<FeatureDecorator<TFeature, TConfig>>): Provider[] {
    return [
        FeatureDecorator,
        { provide: FEATURES, useValue: { type, feature }, multi: true }
    ];
}
