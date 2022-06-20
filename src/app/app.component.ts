import {ChangeDetectorRef, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {BackendService} from "./service/backend.service";
import {interval} from "rxjs";
import {PdfViewerComponent} from "ng2-pdf-viewer";

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
  voiceGender = 'female'
  playbackSpeed = 0
  language = 'english'
  pages = ''
  file: any
  audio = new Audio()
  pdfPage = 0
  @ViewChild('pdfViewer') pdf: PdfViewerComponent | undefined

  constructor(private service: BackendService, private ref: ChangeDetectorRef) {
    interval(500).subscribe(() => {
      this.ref.detectChanges()
    })
  }

  togglePlayPause() {
    this.audio.paused ? this.audio.play() : this.audio.pause()
  }

  onFileChange(event: any) {
    if (event.target.files) {
      this.file = event.target.files[0]
      this.fileType = this.getFileType(this.file.type)
      if (this.isImageFileType()) {
        this.handleImageUpload(this.file)
      } else if (this.isPdfFileType()) {
        this.handleDocumentUpload(this.file)
      }
    }
  }

  formatLabel(value: number) {
    const h = Math.floor(value / 3600);
    const m = Math.floor(value % 3600 / 60);
    const s = Math.floor(value % 3600 % 60);

    const hDisplay = h > 0 ? h + ":" : "";
    const mDisplay = m + ":";
    const sDisplay = s < 10 ? "0" + s : s
    return hDisplay + mDisplay + sDisplay;
  }

  setAudioTime(value: any) {
    this.audio.currentTime = value.value
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

  detect() {
    this.audio.pause()
    this.service.generateAudio(this.file, this.voiceGender, this.pages, this.language).subscribe( () => {
      setTimeout(()=> {}, 5000)
      this.playAudio(this.service.getAudioLink())
    })
  }

  onAudioSpeedChange(value: any) {
    if (value == 0) this.audio.playbackRate = 1
    else this.audio.playbackRate = 1 + value * 0.10
  }

  skipAudio(value: number) {
    this.audio.currentTime += value
  }

  audioLoaded() {
    return !isNaN(this.audio.duration)
  }

  playAudio(link: string) {
    this.audio.pause()
    this.audio.src = ''
    this.audio.src = link
    this.audio.load()
    this.audio.play()
  }

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
