/*
 * Copyright (C) 2013 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import round from '../index'
import Big from 'big.js'
import {bigSum} from '../../grading/GradeCalculationHelper.ts'

describe('Util > .round()', () => {
  const x = 1234.56789

  test('round.DEFAULT is 2', () => {
    expect(round.DEFAULT).toBe(2)
  })

  test('optionally rounds to 6 decimal places', () => {
    expect(round(x, 6)).toBe(x)
  })

  test('optionally rounds to 5 decimal places', () => {
    expect(round(x, 5)).toBe(x)
  })

  test('optionally rounds to 4 decimal places', () => {
    expect(round(x, 4)).toBe(1234.5679)
  })

  test('optionally rounds to 3 decimal places', () => {
    expect(round(x, 3)).toBe(1234.568)
  })

  test('optionally rounds to 2 decimal places', () => {
    expect(round(x, 2)).toBe(1234.57)
  })

  test('optionally rounds to 1 decimal places', () => {
    expect(round(x, 1)).toBe(1234.6)
  })

  test('optionally rounds to 0 decimal places', () => {
    expect(round(x, 0)).toBe(1235)
  })

  test('rounds integers to 0 decimal places', () => {
    expect(round(x)).toBe(1235)
  })

  test('rounds numerical strings into numbers', () => {
    expect(round(`${x}`)).toBe(1235)
  })

  test('rounds up from decimal values of 5', () => {
    // example specifically requires correct rounding
    // naive rounding will otherwise result in 78.83
    expect(round(78.835, 2)).toBe(78.84)
  })

  test('rounds strings in scientific notation', () => {
    expect(round('4.000000732e+0')).toBe(4)
  })

  test('rounds numbers in scientific notation', () => {
    expect(round(6e-3, 2)).toBe(0.01)
  })

  test('returns NaN when given a non-numerical string', () => {
    expect(Number.isNaN(round('invalid', 2))).toBe(true)
  })

  test('returns NaN when given NaN', () => {
    expect(Number.isNaN(round(NaN, 2))).toBe(true)
  })

  test('correctly handles null values', () => {
    expect(round(null, 2)).toBe(NaN)
  })
})
