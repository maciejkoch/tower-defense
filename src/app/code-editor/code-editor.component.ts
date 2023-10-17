import { Component, EventEmitter, Input, Output } from '@angular/core';
declare const monaco: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent {
  @Input() code: string = '';
  @Input() typings: string = '';

  @Output() codeChange = new EventEmitter<string>();

  ngAfterViewInit() {
    const container = document.getElementById('container');

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });

    const libUri = 'ts:filename/typings.d.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      this.typings,
      libUri
    );

    monaco.editor.createModel(
      this.typings,
      'typescript',
      monaco.Uri.parse(libUri)
    );

    if (container) {
      const editor = monaco.editor.create(container, {
        value: this.code,
        language: 'typescript',
        automaticLayout: true,
      });

      editor.getModel()?.onDidChangeContent(() => {
        const code = editor.getValue();

        this.codeChange.emit(code);
      });
    }
  }
}
