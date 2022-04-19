import * as vscode from 'vscode';
import { DenoModulesProvider } from './DenoModulesProvider';


export function activate(context: vscode.ExtensionContext) {

	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
	? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	const disposable = vscode.commands.registerCommand('deno-modules.helloWorld', () => {
		//
	});

	const nodeDependenciesProvider = new DenoModulesProvider(rootPath);
	vscode.window.registerTreeDataProvider('denoModules', nodeDependenciesProvider);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
