import { FC } from 'react'
import { useComicsList } from './comics-list.hook'
import { AppList } from '../../components/list/list'
import * as styles from './comics-list.module.scss'
import { ComicsCard } from '../comics-card/comics-card'
import { getComicsDescription, getComicsReleaseDate, getComicsThumbnailUri, getComicsUrl } from '../comics.utils'
import { AppButton } from '../../components/button/button'

export const ComicsList: FC = () => {
    const { data, loading, loadNext, navigateToComicDetails, deleteComics } = useComicsList()

    return (
        <div className={styles.comicsList}>
            <div className={styles.header}>
                <h1>Comics</h1>
                <AppButton label="Create New" onClick={() => navigateToComicDetails(null)} />
            </div>

            <AppList
                data={data}
                loadMore={loadNext}
                itemContent={(_, comics) => (
                    <ComicsCard
                        id={comics.id}
                        title={comics.title}
                        uri={getComicsUrl(comics)}
                        thumbnail={getComicsThumbnailUri(comics)}
                        releaseDate={getComicsReleaseDate(comics)}
                        description={getComicsDescription(comics)}
                        creators={comics.creators.items}
                        onDelete={deleteComics}
                        onUpdate={navigateToComicDetails}
                    />
                )}
                loading={loading}
            />
        </div>
    )
}
