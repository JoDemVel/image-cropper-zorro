import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ImageEditorComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  loading = false;
  transform: ImageTransform = {};
  fileName: string = 'cropped-image.png';

  @Output() croppedImageEmitter = new EventEmitter<string>();

  constructor(private notification: NzNotificationService) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.notification.error('Error', 'You can only upload JPG or PNG files!', {
        nzPlacement: 'bottomRight'
      });
      return false;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.notification.error('Error', 'Image must be smaller than 2MB!', {
        nzPlacement: 'bottomRight'
      });
      return false;
    }

    this.loading = true;
    this.handleImageChange(file);

    this.fileName = file.name ? `cropped-${file.name}` : 'cropped-image.png';
    return false;
  };

  handleImageChange(file: NzUploadFile): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageChangedEvent = { target: { files: [file] } };
      this.showCropper = true;
      this.loading = false;
    };
    reader.readAsDataURL(file as any);
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.croppedImageEmitter.emit(this.croppedImage);
  }

  imageLoaded(): void {
    this.showCropper = true;
  }

  cropperReady(): void {

  }

  loadImageFailed(): void {
    this.notification.error('Error', 'Failed to load image', {
      nzPlacement: 'bottomRight'
    });
  }

  rotateLeft(): void {
    const rotation = this.transform.rotate || 0;
    this.transform = {
      ...this.transform,
      rotate: rotation - 90,
    };
  }

  rotateRight(): void {
    const rotation = this.transform.rotate || 0;
    this.transform = {
      ...this.transform,
      rotate: rotation + 90,
    };
  }

  zoomIn(): void {
    const scale = this.transform.scale || 1;
    this.transform = {
      ...this.transform,
      scale: scale + 0.1,
    };
  }

  zoomOut(): void {
    const scale = this.transform.scale || 1;
    this.transform = {
      ...this.transform,
      scale: Math.max(0.1, scale - 0.1),
    };
  }

  reset(): void {
    this.imageChangedEvent = null;
    this.croppedImage = '';
    this.showCropper = false;
    this.transform = {};
    this.croppedImageEmitter.emit('');
  }

  downloadCroppedImage(): void {
    if (!this.croppedImage) {
      this.notification.error('Error', 'No image to download', {
        nzPlacement: 'bottomRight'
      });
      return;
    }

    const link = document.createElement('a');

    link.href = this.croppedImage;
    link.download = this.fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    this.notification.success('Success', 'Image downloaded successfully', {
      nzPlacement: 'bottomRight'
    });
  }
}
