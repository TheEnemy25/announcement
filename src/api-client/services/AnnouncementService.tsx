import APIService from '../api/APIService';
import APIRoutes from '../api/APIRoutes';
import { Announcement } from '../models/Announcement';
import { DetailsAnnouncementDto } from '../models/DetailsAnnouncementDto';

const AnnouncementService = {
    getAllAnnouncements: async (): Promise<Announcement[]> => {
        return APIService.get(APIRoutes.announcementControllerUrl() + "/get-all");
    },

    getAnnouncementById: async (id: string): Promise<Announcement> => {
        return APIService.get(`${APIRoutes.announcementControllerUrl()}/get-by-id`, { id });
    },

    createAnnouncement: async (announcement: Announcement): Promise<void> => {
        return APIService.post(APIRoutes.announcementControllerUrl(), announcement);
    },

    updateAnnouncement: async (announcement: Announcement): Promise<Announcement> => {
        return APIService.put(`${APIRoutes.announcementControllerUrl()}/put`, announcement);
    },

    deleteAnnouncement: async (id: string): Promise<void> => {
        return APIService.delete(`${APIRoutes.announcementControllerUrl()}/delete?id=${id}`);
    },

    getDetailsWithSimilar: async (id: string): Promise<DetailsAnnouncementDto> => {
        return APIService.get(APIRoutes.announcementControllerUrl() + "/similar", { id });
    }
}

export default AnnouncementService;