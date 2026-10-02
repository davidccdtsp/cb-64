#!/bin/sh
# Valida los .md, genera los JSON de la app y compila la web para producción (app/awsome-app/dist/).
#
# Uso: scripts/compilar.sh [--sin-links | --sin-validacion] [--estricto] [-- opciones de ng build]
#   --sin-links       valida todo salvo los enlaces de docs/fuentes.md (la comprobación de enlaces tarda ~2 min)
#   --sin-validacion  no valida nada: solo regenera los JSON y compila (para compilaciones repetidas)
#   --estricto        los avisos (enlaces no comprobables, datos opcionales raros) también hacen fallar;
#                     sin esta opción se muestran por pantalla y no detienen la compilación
#
# Se detiene en el primer error. Necesita Python 3 con PyYAML y Node >= 22.22 (si hay nvm, se activa
# la versión que indique .nvmrc o, si no hay, la que esté por defecto).
set -e
cd "$(dirname "$0")/.."

validar="python3 scripts/validar_candidatos.py"
generar=""
hacer_validacion=1
while [ $# -gt 0 ]; do
    case "$1" in
        --sin-links) validar="$validar --sin-red"; shift ;;
        --sin-validacion) hacer_validacion=0; shift ;;
        --estricto) validar="$validar --estricto"; generar="$generar --estricto"; shift ;;
        -h|--help) sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
        --) shift; break ;;
        *) echo "opción desconocida: $1 (usa -h)" >&2; exit 2 ;;
    esac
done

if [ "$hacer_validacion" = 1 ]; then
    echo "== Validando"
    $validar
fi

echo "== Generando JSON"
sh scripts/generar_todo.sh --sin-validacion $generar

echo "== Compilando la web"
cd app/awsome-app
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    # sin `set -e` mientras se carga nvm: si no hay versión por defecto o la de .nvmrc no está instalada, nvm
    # devuelve un error que no debe detener el script
    set +e
    . "$HOME/.nvm/nvm.sh"
    nvm use >/dev/null 2>&1
    set -e
fi
[ -d node_modules ] || npm ci
npx ng build "$@"
echo "== Compilación lista en app/awsome-app/dist/awsome-app/browser"
