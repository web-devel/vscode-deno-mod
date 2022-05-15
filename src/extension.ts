import * as vscode from 'vscode';
import { DenoInfoViewProvider } from './InfoViewProvider';
import { ThirdpartyDenoModuleExplorer } from './thirdparty/ModuleExplorer';
import { DenoModuleTreeProvider } from './thirdparty/ModuleTreeProvider';


export function activate(context: vscode.ExtensionContext) {

	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath 
		: undefined;

	// Thirdparty modules
	new ThirdpartyDenoModuleExplorer(context, rootPath);

	// const infoViewProvider = new DenoInfoViewProvider(context.extensionUri)
	// context.subscriptions.push(vscode.window.registerWebviewViewProvider('denoInfo', infoViewProvider));
}

// this method is called when your extension is deactivated
export function deactivate() {}
