#!/bin/sh
# Valida los .md (sin comprobar enlaces) y genera los JSON de la app; se detiene en el primer fallo.
#
# Uso: scripts/generar_todo.sh [--estricto] [--sin-validacion]
#   --estricto        los avisos (de la validación y de los generadores) también hacen fallar
#   --sin-validacion  no ejecuta antes validar_candidatos.py (p. ej. si ya se validó)
set -e
cd "$(dirname "$0")/.."

estricto=""
validar=1
for a in "$@"; do
    case "$a" in
        --estricto) estricto="--estricto" ;;
        --sin-validacion) validar=0 ;;
        -h|--help) sed -n '2,6p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
        *) echo "opción desconocida: $a (usa -h)" >&2; exit 2 ;;
    esac
done

if [ "$validar" = 1 ]; then
    echo "== validar_candidatos.py (sin enlaces)"
    python3 scripts/validar_candidatos.py --sin-red $estricto
fi
for s in generar_json generar_candidatos generar_escenarios generar_costes; do
    echo "== $s.py"
    python3 "scripts/$s.py" $estricto
done
echo "== estado del arte (.md -> public/docs/)"
rm -rf app/awsome-app/public/docs/estado-del-arte
mkdir -p app/awsome-app/public/docs
cp -r docs/estado-del-arte app/awsome-app/public/docs/
