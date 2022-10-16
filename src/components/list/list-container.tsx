import { forwardRef } from 'react'

export const appListTestId = 'app-list-container'

export const AppListContainer = forwardRef<HTMLDivElement>((props, ref) => {
    return <div data-testid={appListTestId} {...props} className="app-list-container" ref={ref} />
})

AppListContainer.displayName = 'AppListContainer'
