import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class BackendService {

  url = 'http://localhost:8080/'

  constructor(private http: HttpClient) {
  }

  generateAudio(file: any, voiceGender: string, pages: string, language: string) {
    let formData = new FormData();
    formData.append("file", file)
    formData.append("voiceGender", voiceGender)
    formData.append("pages", pages)
    formData.append("language", language)
    return this.http.post(this.url + 'generate-audio', formData, {
      //headers: { 'Accept': '*/*', 'Content-Type': 'audio/mp3' },
      responseType: "arraybuffer"
    })
  }

  getAudioLink() {
    return this.url + 'get-audio/' + Math.random();
  }
}
