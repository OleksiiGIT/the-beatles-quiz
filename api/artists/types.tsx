export type ArtistAlbumType = {
    name: string;
    year_released: number;
    tracks: number;
    length: string;
    cover_image_path: string;
    cover_image_id: number;
}

export type ArtistType = {
    artist: string;
    albums: ArtistAlbumType[];
}