export abstract class FeatureDecorator<TFeature, TConfig> {
    decorate(context: {}, config: TConfig): TFeature {
        return context;
    }
}
