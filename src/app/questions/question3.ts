function check(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (obj1 === undefined && obj2 === undefined) return true;
  if (obj1 === null && obj2 === null) return true;

  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return obj1 === obj2;
  }

  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !check(obj1[key], obj2[key])) return false;
  }

  return true;
}
