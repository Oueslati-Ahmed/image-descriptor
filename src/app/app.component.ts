import {Component, ViewEncapsulation} from '@angular/core';
import {Track} from "ngx-audio-player";

export enum FileType {
  PDF, WORD, IMAGE, NONE, UNSUPPORTED
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'image-descriptor';
  imageUrl = ''
  pdfSrc = ''
  fileType: FileType = FileType.NONE
  audio: Track[] = []
  playbackType = 'male'
  playbackSpeed = 0


  onFileChange(event: any) {
    if (event.target.files) {
      const file = event.target.files[0]
      this.fileType = this.getFileType(file.type)
      if (this.isImageFileType()) {
        this.handleImageUpload(file)
      } else if (this.isPdfFileType()) {
        this.handleDocumentUpload(file)
      }
    }
  }

  handleImageUpload(file: any) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result
    }
  }

  handleDocumentUpload(file: any) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event: any) => {
      this.pdfSrc = event.target.result;
    };
  }

  /*playAudio(file: any) {
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      let audio = new Audio()
      audio.src = e.target.result
      audio.load()
      audio.play()
      this.audio = [
        {
          title: 'test',
          link: e.target.result,
          artist: 'artist',
          duration: 123
        }
      ]
    };
  }*/

  getFileType(type: string): FileType {
    if (type.includes('image')) return FileType.IMAGE
    else if (type.includes('pdf')) return FileType.PDF
    else if (type.includes('word')) return FileType.WORD
    else return FileType.UNSUPPORTED
  }

  isImageFileType() {
    return this.fileType === FileType.IMAGE
  }

  isPdfFileType() {
    return this.fileType === FileType.PDF
  }

  isUnsupportedFileType() {
    return this.fileType === FileType.UNSUPPORTED
  }

  isNoneFileType() {
    return this.fileType === FileType.NONE
  }
}
