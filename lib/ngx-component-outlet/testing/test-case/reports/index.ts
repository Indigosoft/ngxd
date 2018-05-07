import { LifecycleReport } from '../test-case.interfaces';

import { AfterContentInitLifecycleReport } from './after-content-init-lifecycle.report';
import { AfterViewInitLifecycleReport } from './after-view-init-lifecycle.report';
import { OnChangesLifecycleReport } from './on-changes-lifecycle.report';
import { OnDestroyLifecycleReport } from './on-destroy-lifecycle.report';
import { OnInitLifecycleReport } from './on-init-lifecycle.report';
import { SimpleLifecycleReport } from './simple-lifecycle.report';

export const LIFECYCLE_REPORTS: LifecycleReport[] = [
    new OnChangesLifecycleReport(),
    new OnInitLifecycleReport(),
    new SimpleLifecycleReport('ngDoCheck'),
    new AfterContentInitLifecycleReport(),
    new SimpleLifecycleReport('ngAfterContentChecked'),
    new AfterViewInitLifecycleReport(),
    new SimpleLifecycleReport('ngAfterViewChecked'),
    new OnDestroyLifecycleReport()
];
