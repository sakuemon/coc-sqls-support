import { BasicList, ListContext, ListItem, Neovim, services } from "coc.nvim";

export default class ConnectionList extends BasicList {
  public readonly name = "connections";
  public readonly defaultAction = "switch";
  public description = "get connection list";

  constructor(nvim: Neovim) {
    super(nvim);

    this.addAction("switch", async (item: ListItem) => {
      /* const logger = require("coc.nvim/lib/util/logger")("sqls-support"); */
      /* logger.info(item); */
      await this.switchConnection(item.data.index);
    });
  }

  public async loadItems(_context: ListContext): Promise<ListItem[]> {
    /* const logger = require("coc.nvim/lib/util/logger")('sqls-support'); */

    const s = services.getService("sql");
    const params = {
      command: "showConnections",
    };

    const consStr: string = await s.client.sendRequest("workspace/executeCommand", params);

    const source: ListItem[] = [];
    for (const conStr of consStr.split("\n")) {
      const con = conStr.split(" ");
      source.push({
        label: `${con[2]}` + ` <${con[1]}>`,
        data: {
          index: con[0],
          alias: con[2],
          driver: con[1],
        },
      });
    }
    return source;
  }

  private async switchConnection(conIdx: string) {
    const s = services.getService("sql");
    const params = {
      command: "switchConnections",
      arguments: [conIdx],
    };
    s.client.sendRequest("workspace/executeCommand", params);
  }
}
