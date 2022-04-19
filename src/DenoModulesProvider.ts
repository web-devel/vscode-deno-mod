import * as vscode from 'vscode';
import { fetchModules } from './DemoModuleSearchService';


export class DenoModulesProvider implements vscode.TreeDataProvider<DenoModuleTreeItem> {

	constructor(private workspaceRoot: string | undefined) {
	}


    getChildren(element?: DenoModuleTreeItem): Thenable<DenoModuleTreeItem[]> {
        return  fetchModules(1, 30, '').then(res => {
            return res?.results.map(denoModule => {
                return new DenoModuleTreeItem(denoModule.name)
            })
        })
    }
    
    getTreeItem(element: DenoModuleTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element
    }

    onDidChangeTreeData?: vscode.Event<void | DenoModuleTreeItem | DenoModuleTreeItem[] | null | undefined> | undefined;

}

export class DenoModuleTreeItem extends vscode.TreeItem {

	constructor(
		public readonly label: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None)
    }


}
