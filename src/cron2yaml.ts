// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
"use strict";
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "cron2yaml" is now active!');

    let disposable = vscode.commands.registerCommand("cron2yaml.convert", () => {
        let editor = vscode.window.activeTextEditor;
        if (typeof editor !== "undefined") {
            let doc = editor.document;
            let cur_selection = editor.selection;
            if (editor.selection.isEmpty) {
                let startPos = new vscode.Position(0, 0);
                let endPos = new vscode.Position(doc.lineCount - 1, 10000);
                cur_selection = new vscode.Selection(startPos, endPos);
            }

            let yaml = "";
            let text = doc.getText(cur_selection).split(/\r\n|\r|\n/);
            //let crons = text.split(/\r\n|\r|\n/);

            for (let line of text) {
                if (line.startsWith("#")) { // It's a comment
                    yaml += line + "\n";
                }
                else {
                    let cron_values = line.split(" ");
                    if (cron_values.length < 6) {
                        console.log('Invalid cron entry: ' + line);
                        yaml += line + "\n";
                    }
                    else {
                        // Just starting the logic
                        yaml += cron_values[-1] + ":" + "\n";
                    }
                }
            }
            editor.edit(edit => {
                edit.replace(cur_selection, yaml);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
