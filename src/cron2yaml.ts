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
        let previous = "";
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

            for (let line of text) {
                if (line.startsWith("#")) { // It's a comment
                    previous = line;
                }
                else {
                    let cron_values = line.split(" ");
                    if (cron_values.length < 6) {
                        console.log("Invalid cron entry: " + line);
                        yaml += line + "\n";
                    }
                    else {
                        yaml += "cronjob_:" + cron_values.slice(5).join("") + "\n" + "  " + "cron.present:" + "\n" + "    -name: " + cron_values.slice(5).join(" ") + "\n" + "    -user: root" + "\n";
                        if (cron_values[0] !== "*") {
                            yaml += "    -minute: " + cron_values[0] + "\n";
                        }
                        if (cron_values[1] !== "*") {
                            yaml += "    -hour: " + cron_values[1] + "\n";
                        }
                        if (cron_values[2] !== "*") {
                            yaml += "    -daymonth: " + cron_values[2] + "\n";
                        }
                        if (cron_values[3] !== "*") {
                            yaml += "    -month: " + cron_values[3] + "\n";
                        }
                        if (cron_values[4] !== "*") {
                            yaml += "    -dayweek: " + cron_values[4] + "\n";
                        }
                        if (previous.startsWith("#")) {
                            yaml += "    -comment:" + previous.replace('#', '') + "\n";
                        }
                        else {
                            yaml += "\n";
                        }
                    }
                }
                previous = line;
            }
            editor.edit(edit => {
                edit.replace(cur_selection, yaml);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
