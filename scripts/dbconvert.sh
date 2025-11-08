#!/bin/bash
# Export all DuckDB tables to JSON (Windows/Linux compatible)

DB_PATH="./app/data/analytics.duckdb"

# Get table names as plain CSV, no headers
TABLES=$(duckdb --csv "$DB_PATH" -c "SELECT table_name FROM duckdb_tables() WHERE schema_name='main';")

# Loop and export
for table in $TABLES; do
    echo "Exporting table: $table"
    duckdb "$DB_PATH" -c "COPY $table TO '${table}.json' (FORMAT JSON);"
done

echo "All tables exported to JSON!"
