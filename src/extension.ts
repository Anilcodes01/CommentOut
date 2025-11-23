import * as vscode from "vscode";

const C_STYLE_REGEX =
  /("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(\/\*[\s\S]*?\*\/)|(\/\/.*)/gm;
const HASH_STYLE_REGEX = /("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(#.*)/gm;
const HTML_STYLE_REGEX =
  /("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(<!--[\s\S]*?-->)/gm;
const SQL_STYLE_REGEX = /('(?:''|[^'])*')|(\/\*[\s\S]*?\*\/)|(--.*)/gm;
const CSS_STYLE_REGEX =
  /("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\/\*[\s\S]*?\*\/)/gm;

function applyRegex(text: string, regex: RegExp): string {
  return text.replace(regex, (match) => {
    const isComment =
      match.startsWith("//") ||
      match.startsWith("/*") ||
      match.startsWith("#") ||
      match.startsWith("<!--") ||
      match.startsWith("--");

    if (isComment) {
      return "";
    } else {
      return match;
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "comment-out.removeComments",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showInformationMessage("No file is open!");
        return;
      }

      const document = editor.document;
      const languageId = document.languageId;
      const originalText = document.getText();

      let newText = originalText;

      if (
        languageId === "html" ||
        languageId === "php" ||
        languageId === "vue"
      ) {
        newText = applyRegex(newText, HTML_STYLE_REGEX);

        newText = newText.replace(
          /(<script\b[^>]*>)([\s\S]*?)(<\/script>)/gim,
          (fullMatch, startTag, content, endTag) => {
            return startTag + applyRegex(content, C_STYLE_REGEX) + endTag;
          }
        );

        newText = newText.replace(
          /(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gim,
          (fullMatch, startTag, content, endTag) => {
            return startTag + applyRegex(content, CSS_STYLE_REGEX) + endTag;
          }
        );
      } else {
        let activeRegex: RegExp;

        switch (languageId) {
          case "javascript":
          case "javascriptreact":
          case "typescript":
          case "typescriptreact":
          case "java":
          case "c":
          case "cpp":
          case "csharp":
          case "go":
          case "dart":
          case "swift":
          case "rust":
          case "kotlin":
          case "jsonc":
          case "scss":
          case "less":
            activeRegex = C_STYLE_REGEX;
            break;

          case "python":
          case "ruby":
          case "perl":
          case "yaml":
          case "shellscript":
          case "dockerfile":
          case "r":
          case "powershell":
          case "makefile":
            activeRegex = HASH_STYLE_REGEX;
            break;

          case "sql":
            activeRegex = SQL_STYLE_REGEX;
            break;

          case "css":
            activeRegex = CSS_STYLE_REGEX;
            break;

          case "xml":
          case "markdown":
          case "svg":
            activeRegex = HTML_STYLE_REGEX;
            break;

          default:
            console.log(`Unknown language: ${languageId}, using C-Style.`);
            activeRegex = C_STYLE_REGEX;
            break;
        }

        newText = applyRegex(newText, activeRegex);
      }

      if (originalText === newText) {
        vscode.window.showInformationMessage("No comments found in code.");
        return;
      }

      editor
        .edit((editBuilder) => {
          const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(originalText.length)
          );
          editBuilder.replace(fullRange, newText);
        })
        .then((success) => {
          if (success) {
            vscode.commands.executeCommand("editor.action.formatDocument");
            vscode.window.showInformationMessage(
              "Comments removed & code formatted!"
            );
          } else {
            vscode.window.showErrorMessage("Failed to update the file.");
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
