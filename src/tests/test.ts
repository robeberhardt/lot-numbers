import { expect } from "chai";
import { decodeLot, encodeLot } from "../../lib";

describe("Encode Lot Numbers", function() {
  it("index only", function() {
    const result = encodeLot(123);
    expect(result).to.equal("19???01Z");
  });

  it("index and product", function() {
    const result = encodeLot(246, "CUR");
    expect(result).to.equal("19CUR03Y");
  });

  it("index and date", function() {
    const result = encodeLot(12420, "DOP", "2020");
    expect(result).to.equal("20DOP3ek");
  });

  it("rollover index value", function() {
    const result = encodeLot(242042, "ABC", "19");
    expect(result).to.equal("19ABC0XU");
  });
});

describe("Decode Lot Numbers", function() {
  it("small index value", function() {
    const result = decodeLot("21TER002");
    expect(result).to.have.keys(["year", "product", "index"]);
    expect(result).to.eql({ year: "2021", product: "TER", index: 2 });
  });

  it("large index value", function() {
    const result = decodeLot("19CUR0zF");
    expect(result).to.have.keys(["year", "product", "index"]);
    expect(result).to.eql({ year: "2019", product: "CUR", index: 2211 });
  });

  it("max index value", function() {
    const result = decodeLot("20KUSZZZ");
    expect(result).to.have.keys(["year", "product", "index"]);
    expect(result).to.eql({ year: "2020", product: "KUS", index: 238327 });
  });
});
