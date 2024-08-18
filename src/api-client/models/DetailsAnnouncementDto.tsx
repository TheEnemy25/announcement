import { SimilarAnnouncementDto } from "./SimilarAnnouncementDto";

export interface DetailsAnnouncementDto {
    id: string;
    title: string;
    description: string;
    dateAdded: string;
    similarAnnouncements: SimilarAnnouncementDto[];
}