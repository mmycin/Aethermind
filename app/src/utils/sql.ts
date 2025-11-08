import SQL, { SQLStatement } from 'sql-template-strings';

/**
 * Tagged template literal for SQL.
 * Returns only the `.text` of the SQLStatement.
 */
export function sql(strings: TemplateStringsArray, ...values: any[]): string {
  const stmt: SQLStatement = SQL(strings, ...values);
  return stmt.text; // only the SQL string
}
