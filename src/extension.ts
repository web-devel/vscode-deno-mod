import * as vscode from 'vscode';
import { DenoInfoViewProvider } from './InfoViewProvider';
import { DenoModulesTreeProvider } from './ModulesTreeProvider';


export function activate(context: vscode.ExtensionContext) {

	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath 
		: undefined;

	context.subscriptions.push(vscode.commands.registerCommand('deno-modules.helloWorld', () => {
		//
	}));

	const modulesTreeProvider = new DenoModulesTreeProvider(rootPath);
	context.subscriptions.push(vscode.window.registerTreeDataProvider('denoModules', modulesTreeProvider));

	const infoViewProvider = new DenoInfoViewProvider(context.extensionUri)
	context.subscriptions.push(vscode.window.registerWebviewViewProvider('denoInfo', infoViewProvider));
}

// this method is called when your extension is deactivated
export function deactivate() {}
