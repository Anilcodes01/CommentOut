# Comment Remover

**Clean up your code instantly.**

Comment Remover is an intelligent Visual Studio Code extension that automatically strips single-line and multi-line comments from your files while preserving strings, URLs, and regex patterns. It detects the language you are working in and applies the correct logic instantly.

Perfect for preparing code for production, minifying files manually, or simply cleaning up a cluttered workspace.

## 🚀 Features

*   **🔥 Smart String Detection:** Unlike simple find-and-replace tools, this extension understands your code. It will **NOT** break URLs (e.g., `https://google.com`) or string variables containing comment characters (e.g., `var x = "// comment"`).
*   **✨ Auto-Formatting:** Automatically triggers your configured code formatter (Prettier, built-in, etc.) immediately after cleaning to fix indentation and remove empty lines.
*   **🌍 Universal Language Support:** Now supports C-Style, Python-Style, HTML, SQL, and CSS languages.
*   **⚡ Deep HTML Cleaning:** intelligently cleans `<script>` (JS) and `<style>` (CSS) blocks *inside* HTML files.
*   **⌨️ Shortcuts & UI:** Use the Command Palette, Keyboard Shortcut, or the Toolbar button.

---

## ✅ Supported Languages

This extension automatically detects the file type and applies the correct removal logic:

| Style | Languages Supported | What gets removed? |
| :--- | :--- | :--- |
| **C-Style** | JavaScript, TypeScript, Java, C, C++, C#, PHP, Go, Swift, Rust, Dart, Kotlin, JSONC, SCSS, Less | `// Line` and `/* Block */` |
| **Script / Hash** | Python, Ruby, Perl, YAML, Shell (Bash/Zsh), PowerShell, R, Dockerfile, Makefile | `# Line comments` |
| **Markup** | HTML, XML, Markdown, SVG, Vue | `<!-- Comments -->` (Plus JS/CSS inside HTML!) |
| **Database** | SQL | `-- Line` and `/* Block */` |
| **Styles** | CSS | `/* Block comments */` |

---

## 📖 How to Use

### 1. The Toolbar Button (Easiest)
Look for the **Trash Can icon** (or your custom logo) in the top-right editor title bar. Click it to instantly strip comments and format the file.

### 2. Keyboard Shortcut
*   **Windows / Linux:** `Ctrl` + `Alt` + `C`
*   **macOS:** `Cmd` + `Alt` + `C`

### 3. Command Palette
1.  Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2.  Type `Remove All Comments`.
3.  Press Enter.

---

## ⚠️ Notes & Limitations

*   **Python Docstrings:** In Python, multi-line strings using triple quotes (`""" ... """`) are technically string objects, not comments. This extension **preserves** them to avoid breaking documentation variables or multi-line strings used in logic. Only lines starting with `#` are removed.
*   **JSX/TSX:** Standard JavaScript comments inside JSX expressions are supported, but complex nesting should always be double-checked.

---

## 📝 Release Notes

### 0.0.3 (Latest Update)
*   **Huge Update:** Added support for **Python, HTML, SQL, Shell, YAML, and CSS**.
*   **HTML Logic:** Now recursively cleans JavaScript inside `<script>` tags and CSS inside `<style>` tags within HTML files.
*   **Auto-Format:** Code is now automatically formatted after comments are removed.
*   **Feedback:** Added "No comments found" notification if the code is already clean.

### 0.0.1 - 0.0.5
*   Initial release with C-Style support (JS/TS).
*   Added Toolbar button and Shortcuts.
*   Fixed issue where URLs were incorrectly deleted.

---

**Enjoy cleaner code!**