import { ReactElement } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { IAppListData, IAppListProps } from './list.types'
import { AppListFooter } from './list-footer'
import { AppListContainer } from './list-container'

export function AppList<TData extends IAppListData>({ data, loadMore, itemContent, loading = false }: IAppListProps<TData>): ReactElement {
    const components = { List: AppListContainer, Footer: () => <AppListFooter loading={loading} /> }

    return <Virtuoso useWindowScroll data={data} endReached={loadMore} overscan={200} components={components} itemContent={itemContent} />
}
