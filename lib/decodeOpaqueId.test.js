import { jest } from "@jest/globals";
import config from "./config.js";
import decodeOpaqueId from "./decodeOpaqueId.js";

jest.mock("./config.js", () => ({
  __esModule: true, // this property makes it work
  default: {
    REACTION_SHOULD_ENCODE_IDS: true
  }
}));

test("decodes base64", () => {
  const encodedId = "cmVhY3Rpb24vc2hvcDpieTV3cGRnM25NcThnWDU0Yw==";
  expect(decodeOpaqueId(encodedId)).toEqual({
    id: "by5wpdg3nMq8gX54c",
    namespace: "reaction/shop"
  });
});

test("passes through non-base64", () => {
  const id = "by5wpdg3nMq8gX54c";
  expect(decodeOpaqueId(id)).toEqual({
    id,
    namespace: null
  });
});

test("skips decoding if REACTION_SHOULD_ENCODE_IDS env is false", async () => {
  const id = "by5wpdg3nMq8gX54c";
  config.REACTION_SHOULD_ENCODE_IDS = false;
  expect(decodeOpaqueId(id)).toEqual({
    id,
    namespace: null
  });
  config.REACTION_SHOULD_ENCODE_IDS = true;
});
