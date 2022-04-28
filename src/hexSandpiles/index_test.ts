import { assert } from "chai"
import { V } from "ts3dutils"
import { oddr_to_cube, oddr_to_px } from "."

{
  assert(oddr_to_px(0, 0).equals(V(0, 0)))
  assert(oddr_to_px(1, 0).equals(V(1, 0)))
  assert(oddr_to_px(0, 1).equals(V(0.5, SQRT3_2)))

  assert.deepEqual(oddr_to_cube(0, 0), [0, 0, -0])
  assert.deepEqual(oddr_to_cube(1, 0), [1, 0, -1])
  assert.deepEqual(oddr_to_cube(0, 1), [0, 1, -1])
  assert.deepEqual(oddr_to_cube(0, 2), [-1, 2, -1])
  assert.deepEqual(oddr_to_cube(-1, 0), [-1, 0, 1])
  assert.deepEqual(oddr_to_cube(0, -1), [1, -1, 0])
  assert.deepEqual(oddr_to_cube(-1, -1), [0, -1, 1])
  assert.deepEqual(oddr_to_cube(0, -2), [1, -2, 1])
}
