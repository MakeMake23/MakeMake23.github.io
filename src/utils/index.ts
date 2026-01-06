/**
 * Helper function to get nested property from object using dot notation
 * @param obj The object to query
 * @param path The path to the property (e.g. "blog.title")
 * @returns The value at the path or undefined
 */
export function getNestedProperty(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}
