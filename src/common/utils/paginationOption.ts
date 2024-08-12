// src/utils/pagination.ts

import { FindManyOptions } from "typeorm";

/**
 * Creates pagination options for TypeORM.
 *
 * @param page - The page number (starting from 1).
 * @param limit - The number of items per page.
 * @param options - Additional options to pass to TypeORM's find method.
 * @returns Pagination options.
 */
export function getPaginationOptions(
  page: number,
  limit: number,
  options: FindManyOptions<any> = {}
): FindManyOptions<any> {
  // Calculate offset
  const offset = (page - 1) * limit;

  // Return pagination options
  return {
    ...options,
    take: limit,
    skip: offset,
  };
}
