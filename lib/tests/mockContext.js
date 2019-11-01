import mockCollection from "./mockCollection.js";

const mockContext = {
  accountId: "FAKE_ACCOUNT_ID",
  appEvents: {
    emit() { },
    on() { }
  },
  collections: {},
  getAbsoluteUrl: jest.fn().mockName("getAbsoluteUrl").mockImplementation((path) => {
    const adjustedPath = path[0] === "/" ? path : `/${path}`;
    return `https://app.mock${adjustedPath}`;
  }),
  getFunctionsOfType: jest.fn().mockName("getFunctionsOfType").mockReturnValue([]),
  mutations: {},
  queries: {},
  userHasPermission: jest.fn().mockName("userHasPermission"),
  userHasPermissionLegacy: jest.fn().mockName("userHasPermissionLegacy"),
  userId: "FAKE_USER_ID",
  validatePermissions: jest.fn().mockName("validatePermissions"),
  validatePermissionsLegacy: jest.fn().mockName("validatePermissionsLegacy")
};

[
  "Accounts",
  "Assets",
  "Cart",
  "Catalog",
  "Emails",
  "ExampleIOUPaymentRefunds",
  "Groups",
  "MediaRecords",
  "NavigationItems",
  "NavigationTrees",
  "Notifications",
  "Orders",
  "Packages",
  "Products",
  "Revisions",
  "roles",
  "SellerShops",
  "Shipping",
  "Shops",
  "SimpleInventory",
  "Tags",
  "Templates",
  "Themes",
  "users"
].forEach((collectionName) => {
  mockContext.collections[collectionName] = mockCollection(collectionName);
});

mockContext.collections.Media = {
  find: jest.fn().mockName("Media.find"),
  findLocal: jest.fn().mockName("Media.findLocal"),
  findOne: jest.fn().mockName("Media.findOne"),
  findOneLocal: jest.fn().mockName("Media.findOneLocal"),
  insert: jest.fn().mockName("Media.insert"),
  update: jest.fn().mockName("Media.update"),
  remove: jest.fn().mockName("Media.remove")
};

export default mockContext;
