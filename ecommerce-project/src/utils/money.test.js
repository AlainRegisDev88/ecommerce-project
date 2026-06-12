import { it, expect, describe } from 'vitest'
import formatMoney from './money'

describe('formatMoney', () => {
    it('formats 1999 cents as $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99');
    })
    it('displays 2 decimal mumbers', () => {
        expect(formatMoney(1550)).toBe('$15.50');
        expect(formatMoney(100)).toBe('$1.00');
    })
})
