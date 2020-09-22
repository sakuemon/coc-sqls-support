import { BasicList, ListContext, ListItem, Neovim, services } from "coc.nvim";

export default class DatabaseList extends BasicList {
  public readonly name = "databases";
  public readonly defaultAction = "switch";
  public description = "get database list";

  constructor(nvim: Neovim) {
    super(nvim);

    this.addAction("switch", async (item: ListItem) => {
      await this.switchDatabase(item.data.dbName);
    });
  }

  public async loadItems(_context: ListContext): Promise<ListItem[]> {
    const logger = require("coc.nvim/lib/util/logger")("sqls-support");

    const s = services.getService("sql");
    const params = {
      command: "showDatabases",
    };

    const dbs: string = await s.client.sendRequest("workspace/executeCommand", params);

    const source: ListItem[] = [];
    for (const db of dbs.split("\n")) {
      source.push({
        label: db,
        data: {
          dbName: db,
        },
      });
    }

    return source;
  }

  private async switchDatabase(dbName: string) {
    const s = services.getService("sql");
    const params = {
      command: "switchDatabase",
      arguments: [dbName],
    };
    s.client.sendRequest("workspace/executeCommand", params);
  }
}
