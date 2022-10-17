import { renderHook, RenderHookResult, act, waitFor } from '@testing-library/react'
import { IPaginationParams, IPaginationResponse } from '../../types'
import { usePagination } from './pagination.hook'
import { IPaginationHook } from './pagination.hook.types'

interface IData {
    id: number
    name: string
}

const total = 40
const limit = 20

async function loadData({ offset, limit }: IPaginationParams): Promise<IPaginationResponse<IData>> {
    const data = new Array(limit).fill(null).map((_, index) => ({
        id: offset + index,
        name: `Name ${offset + index}`,
    }))

    return {
        data,
        meta: { offset: offset + limit, limit, total },
    }
}

const mockDataLoader = jest.fn(loadData)

let renderHookResult: RenderHookResult<IPaginationHook<IData>, never>

// There is only one test as renderHook causes isolation issues, so it's impossible to split the tests
// TODO fix renderHook isolation issues
describe('usePagination.init', () => {
    beforeEach(async () => {
        // Hook initialization
        await act(async () => {
            renderHookResult = renderHook(() => usePagination<IData>(mockDataLoader, limit))
        })
    })

    afterEach(() => {
        renderHookResult.unmount()
        mockDataLoader.mockClear()
    })

    it('should correctly invoke async methods', async () => {
        const { result } = renderHookResult
        // should initialize the hook with data
        expect(result.current.data).toHaveLength(limit)
        // 'should load the next batch of data'
        act(() => result.current.loadNext())
        // Loading state should be set to true
        expect(result.current.loading).toBeTruthy()
        // Wait for the next batch to be loaded
        await act(async () => {
            await waitFor(() => expect(mockDataLoader).toHaveBeenCalledTimes(2))
        })
        // Loading state should be set to false
        expect(result.current.loading).toBeFalsy()
        // Checking that the data length increased
        expect(result.current.data).toHaveLength(total)

        // 'should prevent loading more data'
        expect(result.current.canLoadMore()).toBeFalsy()

        const data = [{ id: 1, name: '1' }]

        // should reset the state'
        act(() => result.current.setData(data))
        expect(result.current.data).toHaveLength(data.length)
        await act(async () => result.current.reset())
        expect(result.current.data).toHaveLength(limit)

        // should setData sync
        act(() => renderHookResult.result.current.setData(data))
        expect(renderHookResult.result.current.data).toHaveLength(data.length)

        //should getData sync
        act(() => renderHookResult.result.current.setData(data))
        expect(renderHookResult.result.current.data).toEqual(data)
    })
})
