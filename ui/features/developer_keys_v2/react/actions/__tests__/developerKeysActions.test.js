/*
 * Copyright (C) 2018 - present Instructure, Inc.
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

import actions from '../developerKeysActions'
import storeCreator from '../../store/store'
import axios from '@canvas/axios'

const store = storeCreator()

const ok = x => expect(x).toBeTruthy()
const equal = (x, y) => expect(x).toEqual(y)

function thenStub() {
  return {
    then: () => {
      return {catch: () => {}}
    },
  }
}
describe('Developer key actions', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('listInheritedDeveloperKeysStart returns proper action', () => {
    const retVal = actions.listInheritedDeveloperKeysStart()
    equal(retVal.type, 'LIST_INHERITED_DEVELOPER_KEYS_START')
  })

  test('listInheritedDeveloperKeysStart returns a payload', () => {
    const payload = {test: 'test'}
    const retVal = actions.listInheritedDeveloperKeysStart(payload)
    equal(retVal.payload, payload)
  })

  test('listInheritedDeveloperKeysSuccessful returns proper action', () => {
    const retVal = actions.listInheritedDeveloperKeysSuccessful()
    equal(retVal.type, 'LIST_INHERITED_DEVELOPER_KEYS_SUCCESSFUL')
  })

  test('listInheritedDeveloperKeysSuccessful returns a payload', () => {
    const payload = {test: 'test'}
    const retVal = actions.listInheritedDeveloperKeysSuccessful(payload)
    equal(retVal.payload, payload)
  })

  test('listInheritedDeveloperKeysFailed returns proper action', () => {
    const retVal = actions.listInheritedDeveloperKeysFailed()
    equal(retVal.type, 'LIST_INHERITED_DEVELOPER_KEYS_FAILED')
  })

  test('listInheritedDeveloperKeysFailed returns a error', () => {
    const error = {test: 'test'}
    const retVal = actions.listInheritedDeveloperKeysFailed(error)
    equal(retVal.payload, error)
  })

  test('getDeveloperKeys retrieves account key data', () => {
    const getStub = jest.spyOn(axios, 'get').mockReturnValue(thenStub())
    actions.getDeveloperKeys('http://www.test.com', {})(
      () => {},
      () => {},
    )
    expect(getStub).toHaveBeenCalledWith('http://www.test.com')
  })

  test('getDeveloperKeys retrieves inherited account key data', () => {
    const getStub = jest.spyOn(axios, 'get').mockReturnValue(thenStub())
    actions.getDeveloperKeys('http://www.test.com', {})(
      () => {},
      () => {},
    )
    expect(getStub).toHaveBeenCalledWith('http://www.test.com?inherited=true')
  })

  test('getRemainingDeveloperKeys requests keys from the specified URL', () => {
    const getStub = jest.spyOn(axios, 'get').mockReturnValue(thenStub())
    actions.getRemainingDeveloperKeys('http://www.test.com', [])(
      () => {},
      () => {},
    )
    expect(getStub).toHaveBeenCalledWith('http://www.test.com')
  })

  test('getRemainingInheritedDeveloperKeys requests keys from the specified URL with inherited param', () => {
    const getStub = jest.spyOn(axios, 'get').mockReturnValue(thenStub())
    actions.getRemainingInheritedDeveloperKeys('http://www.test.com', [])(
      () => {},
      () => {},
    )
    expect(getStub).toHaveBeenCalledWith('http://www.test.com?inherited=true')
  })

  test('listDeveloperKeyScopes makes a request to the scopes endpoint', () => {
    const getStub = jest.spyOn(axios, 'get').mockReturnValue(thenStub())
    actions.listDeveloperKeyScopes(1)(store.dispatch)
    expect(getStub).toHaveBeenCalledWith('/api/v1/accounts/1/scopes?group_by=resource_name')
  })
})
