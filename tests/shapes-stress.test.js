import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("draw.io shapes stress test", () => {
  it("adds, styles, deletes, and restores a collection of shapes on the canvas", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://app.diagrams.net" });

    // Add a collection of distinct shapes from the General shapes library
    await testdriver.find("rectangle shape in the General shapes library on the left panel").click();
    await testdriver.find("ellipse shape in the General shapes library on the left panel").click();
    await testdriver.find("cylinder shape in the General shapes library on the left panel").click();
    await testdriver.find("cloud shape in the General shapes library").click();
    await testdriver.find("triangle shape in the General shapes library on the left panel").click();

    // Select all shapes using keyboard shortcut
    await testdriver.pressKeys(["ctrl", "a"]);

    // Apply green preset style to all selected shapes
    await testdriver.find("Style tab in the format panel on the right").click();
    await testdriver.find("Light Green preset color swatch in the Style panel").click();

    const styledAssert = await testdriver.assert("the selected shapes on the canvas have a green fill color");
    expect(styledAssert).toBeTruthy();

    // Delete all shapes
    await testdriver.pressKeys(["delete"]);

    // Undo deletion to restore the shapes
    await testdriver.pressKeys(["ctrl", "z"]);

    const restoreAssert = await testdriver.assert("the shapes are restored to the canvas with their green styling");
    expect(restoreAssert).toBeTruthy();
  });
});
