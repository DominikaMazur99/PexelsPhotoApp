export interface IOption {
    value: string;
    label: string;
}
export interface IPhotoSrc {
    landscape: string;
    large: string;
    large2x: string;
    medium: string;
    original: string;
    portrait: string;
    small: string;
    tiny: string;
}
export interface IPhoto {
    id: number;
    width: number;
    height: number;
    alt: string;
    avg_color: string;
    liked: boolean;
    photographer: string;
    photographer_id: number;
    photographer_url: string;
    src: IPhotoSrc;
    url: string;
}

export interface IPhotoResponse {
    page: number;
    per_page: number;
    photos: IPhoto[];
    total_results: number;
    next_page?: string;
}

export interface IQuery {
    topic: string;
    color: string;
    orientation: string;
    size: string;
    page?: number;
}
