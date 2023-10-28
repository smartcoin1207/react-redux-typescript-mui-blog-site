export interface IBlog {
    id: string,
    title : string,
    content: string | null,
    pdf : any | null,
    videos: any | null,
    images : any | null,
    user_id : string | null,
    group_id : string | null,
    category_id: string | null,
    genre_id : string,
    status : string | null,
    created_at : string | null
}