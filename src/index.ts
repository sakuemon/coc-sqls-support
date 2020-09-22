import { ExtensionContext, workspace, listManager } from "coc.nvim";

import DatabaseList from "./databases";
import ConnectionList from "./connections";

export async function activate(context: ExtensionContext): Promise<void> {
  const { subscriptions } = context;
  const { nvim } = workspace;

  subscriptions.push(listManager.registerList(new DatabaseList(nvim)));

  subscriptions.push(listManager.registerList(new ConnectionList(nvim)));
}
