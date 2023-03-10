#!/usr/bin/env bash

# Executes docker entrypoint scripts in subdirectories.
#
# Prefixed with "20_" so this runs after PostGIS's 10_postgis.sh.

find /datasets/*/postgis-entrypoint-scripts -type f -print0 | while read -d $'\0' f; do
  case "$f" in
    *.sh)
      if [ -x "$f" ]; then
        echo "$0: running $f"
        "$f"
      else
        echo "$0: sourcing $f"
        . "$f"
      fi
      ;;
    *.sql)    echo "$0: running $f"; "${psql[@]}" -f "$f"; echo ;;
    *.sql.gz) echo "$0: running $f"; gunzip -c "$f" | "${psql[@]}"; echo ;;
    *)        echo "$0: ignoring $f" ;;
  esac
  echo
done
