import { render, RenderOptions, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { VirtuosoMockContext } from 'react-virtuoso'
import { AppList } from './list'
import { IAppListData } from './list.types'
import { appListTestId } from './list-container'
import { appListFooterSpinnerTestId } from './list-footer'

interface IItem extends IAppListData {
    label: string
}

const loadMoreMock = jest.fn()

const Template = ({ id, label }: IItem) => {
    return (
        <div key={id}>
            <span>{id}</span>
            <span>{label}</span>
        </div>
    )
}

const itemContent = (_index: number, { id, label }: IItem) => <Template id={id} label={label} />

const renderOptions: RenderOptions = {
    wrapper: ({ children }) => (
        <VirtuosoMockContext.Provider value={{ viewportHeight: 300, itemHeight: 100 }}>{children}</VirtuosoMockContext.Provider>
    ),
}

describe('AppList', () => {
    const data: IItem[] = [
        { id: '1', label: 'foo' },
        { id: '2', label: 'bar' },
        { id: '3', label: 'baz' },
    ]

    it('should correctly render items', () => {
        const { rerender } = render(<AppList itemContent={itemContent} loadMore={loadMoreMock} data={data} />, renderOptions)

        expect(screen.getByTestId(appListTestId)).toBeInTheDocument()
        expect(screen.getByTestId(appListTestId).children).toHaveLength(data.length)

        // We are checking that items are removed if there is no data passed
        rerender(<AppList itemContent={itemContent} loadMore={loadMoreMock} data={[]} />)
        expect(screen.getByTestId(appListTestId).children).toHaveLength(0)
    })

    it('should render/hide spinner inside AppFooter component', () => {
        const { rerender } = render(<AppList loading itemContent={itemContent} loadMore={loadMoreMock} data={[]} />, renderOptions)

        expect(screen.getByTestId(appListFooterSpinnerTestId)).toBeInTheDocument()
        // We are checking that the spinner is removed from DOM in case there is no loading
        rerender(<AppList loading={false} itemContent={itemContent} loadMore={loadMoreMock} data={[]} />)
        expect(screen.queryByTestId(appListFooterSpinnerTestId)).toBeNull()
    })
})
