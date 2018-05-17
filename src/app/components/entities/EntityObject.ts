export interface EntityObject {
    id: string;
    name: string;
    icon: string;

    flatten(): EntityObject[];
}
