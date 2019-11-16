(module
  (func $add (param $firstParam i32) (param $secondParam i32) (result i32)
    local.get $firstParam
    local.get $secondParam
    i32.add)
  (export "add" (func $add))
)