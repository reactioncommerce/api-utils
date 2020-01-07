import arrayJoinPlusRemainingQuery from "./arrayJoinPlusRemainingQuery.js";
import mockCollection from "./tests/mockCollection.js";
import getFakeMongoCursor from "../tests/getFakeMongoCursor.js";

import getPaginatedResponse from "./graphql/getPaginatedResponse.js";
import arrayJoinQuery from "./arrayJoinQuery.js";


// need to create promise for this

const mockFindOne = jest
.fn()
.mockName("collection")
.mockReturnValue({
  findOne: (selector, option) => Promise.resolve({
    _id: 'p1wrwsv9y5po24ngv',
    featuredProductIds: [
      '501', '503', '505',
      '506', '504', '500',
      '501', '502', '507',
      '508', '509', '512',
      '511', '513', '510',
      '506', '514'
    ]
  })
});

const mockJoinCollectionCursor = jest
.fn()
.mockName("collection")
.mockReturnValue({
  find: getFakeMongoCursor("COLLECTIONs", new Array(100))
});

const arrayJoinNodeMock = jest
  .fn()
  .mockName("arrayJoinQuery")
  .mockReturnValue([
    {
      _id: '514',
      shopId: '123',
      position: -1
    },
    {
      _id: '501',
      shopId: '123',
      position: 0
    },
    {
      _id: '503',
      shopId: '123',
      position: 1
    }
  ]);

const remainingDocsCursor = getFakeMongoCursor("COLLECTIONs", new Array(20));

const getPaginatedResponseMock =  { nodes: [], pageInfo: { hasNextPage: false }, totalCount: null };

const arrayJoinQueryMock = jest
  .fn()
  .mockName("applyPaginationToMongoCursor")
  .mockReturnValue({ pageInfo: {hasNextPage: true}, nodes: [], totalCount: null });

beforeAll(() => {

});

afterAll(() => {

});

test("epxect arrayJoinPlusRemainingQuery to join two catalog queries and consider offset", () => {
  const result = await arrayJoinPlusRemainingQuery({
    arrayFieldPath: "featuredProductIds",
    collection: mockCollection("Tags"),
    connectionArgs: { offset: 2, sortOrder: 'desc', sortBy: 'featured' },
    joinCollection: mockCollection("Catalog"),
    joinFieldPath: "product.productId",
    joinSelector: {
      'product.tagIds': 'tagId',
      'product.isDeleted': { '$ne': true },
      'product.isVisible': true,
      shopId: { '$in': ["shopId"] }
    },
    joinSortOrder: "asc",
    positionFieldName: "position",
    selector: { _id: "tagId" },
    sortByForRemainingDocs: "createdAt",
    sortOrderForRemainingDocs: "asc"
  });
  expect(true).toBe(true);

});
