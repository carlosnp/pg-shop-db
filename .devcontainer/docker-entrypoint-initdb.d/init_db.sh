set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE pg-shop-db;
    GRANT ALL PRIVILEGES ON DATABASE pg-shop-db TO postgres;
EOSQL