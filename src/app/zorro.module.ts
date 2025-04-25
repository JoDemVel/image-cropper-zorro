import { NgModule } from '@angular/core';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import {
  UploadOutline,
  RotateLeftOutline,
  RotateRightOutline,
  ZoomInOutline,
  ZoomOutOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  UploadOutline,
  RotateLeftOutline,
  RotateRightOutline,
  ZoomInOutline,
  ZoomOutOutline,
];

@NgModule({
  exports: [
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzUploadModule,
    NzDividerModule,
    NzMessageModule,
    NzAvatarModule,
    NzTypographyModule,
    NzNotificationModule,
  ],
  imports: [
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzCardModule,
    NzUploadModule,
    NzDividerModule,
    NzMessageModule,
    NzAvatarModule,
    NzTypographyModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
})
export class ZorroModule {}
