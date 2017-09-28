
SELECT information_schema.tables.table_schema 
,information_schema.tables.table_name

,pg_catalog.pg_tables.tableowner 

FROM information_schema.tables JOIN pg_catalog.pg_tables  ON information_schema.tables.table_name=pg_catalog.pg_tables.tablename 

WHERE  information_schema.tables.table_schema='public';