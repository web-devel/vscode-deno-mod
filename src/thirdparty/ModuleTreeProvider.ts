import * as vscode from 'vscode';
import { DenoModuleInfo, fetchModules } from './ModuleAPI';
import { COMMAND_OPEN_MODULE } from './ModuleExplorer';


export class DenoModuleTreeProvider implements vscode.TreeDataProvider<DenoModuleTreeItem> {

	constructor(private workspaceRoot: string | undefined) {
	}


    getChildren(element?: DenoModuleTreeItem): Thenable<DenoModuleTreeItem[]> {
        return  fetchModules(1, 30, '').then(res => {
            return res?.results.map(denoModule => new DenoModuleTreeItem(denoModule))
        })
    }
    
    getTreeItem(element: DenoModuleTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element
    }

    onDidChangeTreeData?: vscode.Event<void | DenoModuleTreeItem | DenoModuleTreeItem[] | null | undefined> | undefined;

}

export class DenoModuleTreeItem extends vscode.TreeItem {

	constructor(
		public readonly moduleInfo: DenoModuleInfo,
    ) {
        super(moduleInfo.name, vscode.TreeItemCollapsibleState.None);
        this.description = moduleInfo.description;
        this.command = {
            command: COMMAND_OPEN_MODULE,
            title: '',
            arguments: [moduleInfo.name]
        }
    }


}
