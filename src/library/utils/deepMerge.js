function deepMerge(target, source) {
  for (const key in source) {
    if (
      Object.prototype.toString.call(source[key]) === "[object Object]" &&
      key in target
    ) {
      // Recursively merge objects
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return { ...target, ...source };
}

export default deepMerge;

// Object.assign(source[key], deepMerge(target[key], source[key])):
// This line updates the existing object source[key] with new properties, but it keeps the same memory address (reference).
// The object itself changes, but where it's stored in memory stays the same.

// source[key] = { ...source[key], ...deepMerge(target[key], source[key]) }:
// This line creates a new object by merging two objects and then stores this new object's address in source[key].
// The old object is replaced, so the memory address (reference) changes.
