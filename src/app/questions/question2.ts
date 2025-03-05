function check(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if ((obj1 === undefined || obj1 === null) && (obj2 === undefined || obj2 === null)) {
    return true;
  }

  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
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
    if (!check(obj1[key], obj2[key])) return false;
  }

  return true;
}
