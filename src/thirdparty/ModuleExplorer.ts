import * as vscode from 'vscode';
import { genModuleLink } from './ModuleAPI';
import { DenoModuleTreeProvider } from './ModuleTreeProvider';

export const COMMAND_OPEN_MODULE = 'extension.openDenoModule';

export class ThirdpartyDenoModuleExplorer {

    constructor(context: vscode.ExtensionContext, rootPath?: string) {
        const treeProvider = new DenoModuleTreeProvider(rootPath)
		context.subscriptions.push(vscode.window.createTreeView('denoModules', { 
            treeDataProvider: treeProvider 
        }));
		vscode.commands.registerCommand(
            COMMAND_OPEN_MODULE, 
            moduleName => vscode.commands.executeCommand('vscode.open', genModuleLink(moduleName))
        );
	}

}