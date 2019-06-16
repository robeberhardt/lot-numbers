import { expect } from "chai";
import { decodeLot, encodeLot } from "../../lib";

describe("Encode Lot Numbers", function() {
  it("index only", function() {
    const result = encodeLot(123);
    expect(result).to.equal("19PRD01Z");
  });

  it("index and product", function() {
    const result = encodeLot(246, "CUR");
    expect(result).to.equal("19CUR03Y");
  });

  it("index and date", function() {
    const result = encodeLot(627, "", "2020");
  });
});
