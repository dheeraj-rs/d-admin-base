import { useQuery } from '@tanstack/react-query';

type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassValue[];

interface ClassDictionary {
  [key: string]: boolean | undefined | null;
}

export function cn(...args: ClassValue[]) {
  const classes: string[] = [];
  args.forEach((arg) => {
    if (!arg) return;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(String(arg));
    } else if (Array.isArray(arg)) {
      classes.push(cn(...arg));
    } else if (argType === 'object' && !Array.isArray(arg)) {
      const argObj = arg as ClassDictionary;
      Object.keys(argObj).forEach((key) => {
        if (argObj[key]) {
          classes.push(key);
        }
      });
    }
  });
  return classes.filter(Boolean).join(' ');
}

export const classNames = (...classes: ClassValue[]): string => {
  const result = new Set<string>();
  const addClass = (item: ClassValue): void => {
    if (!item) return;
    if (typeof item === 'string' || typeof item === 'number') {
      result.add(String(item));
      return;
    }
    if (Array.isArray(item)) {
      item.forEach(addClass);
      return;
    }
    if (typeof item === 'object') {
      Object.entries(item).forEach(([className, condition]) => {
        let shouldAdd = false;
        if (typeof condition === 'boolean') {
          shouldAdd = condition;
        } else if (condition != null) {
          shouldAdd = Boolean(condition);
        }
        if (shouldAdd) {
          result.add(className);
        }
      });
    }
  };
  classes.forEach(addClass);
  return Array.from(result).filter(Boolean).join(' ');
};

export const dateFormat = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const fetchElements = async (
  page: number,
  limit: number,
  filters: Record<string, unknown>
) => {
  void page;
  void limit;
  void filters;
  return [];
};

export const useGetAllElements = (
  page: number,
  limit: number,
  filters: Record<string, unknown>
) => {
  return useQuery({
    queryKey: ['elements', page, limit, filters],
    queryFn: () => fetchElements(page, limit, filters),
    staleTime: 5 * 60 * 1000,
  });
};
