import * as path from "node:path";
import { Workspace, PackageManager } from "../js/dist/index.js";

describe("Workspace", () => {
  it("finds a workspace", async () => {
    const workspace = await Workspace.find();
    const expectedRoot = path.resolve(__dirname, "../../..");
    expect(workspace.absolutePath).toBe(expectedRoot);
  });

  it("finds a package manager", async () => {
    const workspace = await Workspace.find();
    const packageManager: PackageManager = workspace.packageManager;
    expect(packageManager.name).toBe("pnpm");
  });
});
