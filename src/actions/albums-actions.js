import * as service from '../services/albums-service';

export const LIKE_ALBUM = 'LIKE_ALBUM';
export const DISLIKE_ALBUM = 'DISLIKE_ALBUM';
export const REVIEW_ALBUM = 'REVIEW_ALBUM';
export const DELETE_ALBUM_REVIEW = 'DELETE_ALBUM_REVIEW';
export const FIND_ALL_ALBUMS = 'FIND_ALL_ALBUMS';



export const likeAlbum = async (dispatch, album) => {
    const updatedAlbum = await service.likeAlbum(album);
    dispatch({
                 type: LIKE_ALBUM,
                 updatedAlbum
             });
}
export const dislikeAlbum = async (dispatch, album) => {
    const updatedAlbum = await service.dislikeAlbum(album);
    dispatch({
                 type: DISLIKE_ALBUM,
                 updatedAlbum
             });
}
export const reviewAlbum = async (dispatch, album) => {
    const updatedAlbum = await service.reviewAlbum(album);
    dispatch({
                 type: REVIEW_ALBUM,
                 updatedAlbum
             });
}
export const deleteAlbumReview = async (dispatch, album) => {
    const updatedAlbum = await service.deleteAlbumReview(album);
    dispatch({
                 type: DELETE_ALBUM_REVIEW,
                 updatedAlbum
             });
}

export const findAllAlbums = async (dispatch) => {
    const albums = await service.findAllAlbums();
    dispatch({
                 type: FIND_ALL_ALBUMS,
                 albums
             });
}