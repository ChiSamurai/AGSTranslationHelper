import { Component } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private dec = new TextDecoder("ISO-8859-1");
  title = "AGSTranslationHelper";

  mainFile: File;
  additionalFiles: File[] = [];
  translationLines: Map<string, string[]> = new Map();

  constructor() {}

  onSelectMain(event) {
    this.mainFile = event.addedFiles[0];
    this.mainFile.arrayBuffer().then((arrayBuffer) => {
      const decodedString = this.dec.decode(arrayBuffer);
      const splittedLines = decodedString.split("\n");
      for (var i = 0; i < splittedLines.length; i++) {
        const langString = splittedLines[i];
        if (!langString.startsWith("//")) {
          this.translationLines.set(langString, [splittedLines[i + 1]]);
          i++;
        }
      }
    });
  }

  onSelectAdditional(event) {
    this.additionalFiles.push(...event.addedFiles);
    event.addedFiles.forEach((file: File) => {
      file.arrayBuffer().then((arrayBuffer) => {
        const decodedString = this.dec.decode(arrayBuffer);
        const splittedLines = decodedString.split("\n");

        for (var i = 0; i < splittedLines.length; i++) {
          // search for the "main string" in the translation map
          const translationEntry = this.translationLines.get(splittedLines[i]);
          if (translationEntry) {
            translationEntry.push(splittedLines[i + 1]);
            i++;
          }
        }
      });
    });
  }

  onRemove(event) {
    console.log("onRemove", event);
    /*     this.files.splice(this.files.indexOf(event), 1); */
  }
}
