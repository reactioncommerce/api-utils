import config from "./config.js";

/**
 * @name decodeOpaqueId
 * @method
 * @memberof GraphQL/Transforms
 * @summary Transforms an opaque ID to an internal ID. Returns the `id`
 *   unchanged and the `namespace` as null if the `REACTION_SHOULD_ENCODE_IDS` 
 *   environment variable is `false`
 * @param {String} opaqueId The ID to transform
 * @returns {String} An internal ID
 */
export default function decodeOpaqueId(opaqueId) {
  if (opaqueId === undefined || opaqueId === null) return null;

  if (config.REACTION_SHOULD_ENCODE_IDS === false) {
    return { namespace: null, id: opaqueId };
  }

  const [namespace, id] = Buffer
    .from(opaqueId, "base64")
    .toString("utf8")
    .split(":", 2);

  if (namespace && id) {
    return { namespace, id };
  }

  return { namespace: null, id: opaqueId };
}
