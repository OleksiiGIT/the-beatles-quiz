import {ApiClient} from "@/api/client";
import {ArtistType} from "@/api/artists/types";

export const getArtists = async () => await ApiClient.get<ArtistType>('/')

export const getArtistAlbumCover = async (coverId: number) => await ApiClient.get<string>(`/album_covers/${coverId}`)