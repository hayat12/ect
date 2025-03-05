function deepCopy<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const newArr: any[] = [];
    for (let i = 0; i < obj.length; i++) {
      newArr[i] = deepCopy(obj[i]);
    }
    return newArr as T;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (typeof obj === 'function') {
      return obj;
  }


  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }
  return newObj as T;
}
