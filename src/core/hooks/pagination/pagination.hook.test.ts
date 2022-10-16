import { renderHook, RenderHookResult, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
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

describe('usePagination', () => {
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

    it('should automatically load data during initialisation', async () => {
        expect(renderHookResult.result.current.data).toHaveLength(limit)
    })

    it('should load next batch', async () => {
        expect(renderHookResult.result.current.data).toHaveLength(limit)
        act(() => renderHookResult.result.current.loadNext())
        // Loading state should be set to true
        expect(renderHookResult.result.current.loading).toBeTruthy()
        // Wait for the next batch to be loaded
        await act(async () => {
            await waitFor(() => expect(mockDataLoader).toHaveBeenCalledTimes(2))
        })
        // Loading state should be set to false
        expect(renderHookResult.result.current.loading).toBeFalsy()
        // Checking that the data length increased
        expect(renderHookResult.result.current.data).toHaveLength(total)
        // Checking that there is no more data to load
        expect(renderHookResult.result.current.canLoadMore()).toBeFalsy()
    })

    it('should reset the state', async () => {
        const data = [{ id: 1, name: '1' }]
        act(() => renderHookResult.result.current.setData(data))
        expect(renderHookResult.result.current.data).toHaveLength(data.length)
        await act(async () => renderHookResult.result.current.reset())
        expect(renderHookResult.result.current.data).toHaveLength(limit)
    })

    it('should setData sync', () => {
        const data = [{ id: 1, name: '1' }]
        act(() => renderHookResult.result.current.setData(data))
        expect(renderHookResult.result.current.data).toHaveLength(data.length)
    })

    it('should getData sync', () => {
        const data = [{ id: 1, name: '1' }]
        act(() => renderHookResult.result.current.setData(data))
        expect(renderHookResult.result.current.data).toEqual(data)
    })
})
