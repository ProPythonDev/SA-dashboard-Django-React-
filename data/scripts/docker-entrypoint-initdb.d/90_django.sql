-- Creates database and db user for backend Django app.
-- Prefixed with "90_" so this runs after all other database initialization.

\set django_db `echo $DJANGO_DB`
\set django_user `echo $DJANGO_USER`
\set django_password `echo "$DJANGO_PASSWORD"`
CREATE DATABASE :django_db;
CREATE USER :django_user WITH PASSWORD :'django_password';
ALTER ROLE :django_user SET client_encoding TO 'utf8';
ALTER ROLE :django_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE :django_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE :django_db TO :django_user;

-- Allow django user to query postgis data
GRANT USAGE ON SCHEMA public TO :django_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO :django_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO :django_user;
GRANT CONNECT ON DATABASE dashboard TO :django_user;
