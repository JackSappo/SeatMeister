#!/usr/bin/env bash

create_session() {
  node createSession.js $@
}

group() {
  echo $(node group.js $@)
}

# set_default() {
#   node setDefault.js $@
# }

demo() {
  node demo.js $@
}

case "$1" in
  create_session)
    echo $(create_session ${@:2})
    ;;
  group)
    echo $(group ${@:2})
    ;;
  # set_default)
  #   echo $(set_default ${@:2})
  #   ;;
  demo)
    echo $(demo ${@:2})
    ;;
  *)
    echo $"Usage: $0 {create_session|group|demo}"
    exit 1
  esac
