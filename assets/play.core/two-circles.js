import { sdCircle, opSmoothUnion } from '../../modules/play.core/src/modules/sdf.js'
import { sub, vec2 } from '../../modules/play.core/src/modules/vec2.js'

const density = '#WX?*:÷×+=-· '

export const settings = {
	color : '#525252',
	fontSize: '12px',
}

const p = vec2(0, 0)
export function pre(context, cursor, buffer) {
   	const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect
    p.x = 2.0 * (cursor.x - context.cols / 2) / m * a,
    p.y = 2.0 * (cursor.y - context.rows / 2) / m
}

export function main(coord, context, cursor, buffer) {
	const t = context.time
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	const st = vec2(
		2.0 * (coord.x - context.cols / 2) / m * a,
		2.0 * (coord.y - context.rows / 2) / m
	)

	// Circles
	const d1 = sdCircle(st, 0.2)	           // origin, 0.2 is the radius
	const d2 = sdCircle(sub(st, p), 0.2) // cursor

	// Smooth operation
	const d = opSmoothUnion(d1, d2, 0.7)

	// Calc index of the char map
	const c = 1.0 - Math.exp(-5 * Math.abs(d))
	const index = Math.floor(c * density.length)

	return density[index]

}
