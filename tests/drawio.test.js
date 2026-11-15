import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("draw.io diagram editor", () => {
  it("creates a new diagram and interacts with the canvas", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://app.diagrams.net" });

    const assertResult = await testdriver.assert("draw.io editor canvas and shape library are visible");
    expect(assertResult).toBeTruthy();

    await testdriver.find("rectangle shape in the General shapes library on the left panel").click();
    await testdriver.type("TestDriver");

    const shapeAssert = await testdriver.assert("a rectangle shape containing the text TestDriver is displayed on the canvas");
    expect(shapeAssert).toBeTruthy();

    await testdriver.pressKeys(["escape"]);

    await testdriver.find("Light Blue preset color swatch in the Style panel").click();

    const colorAssert = await testdriver.assert("the rectangle shape on the canvas has a blue fill color");
    expect(colorAssert).toBeTruthy();
  });
});
