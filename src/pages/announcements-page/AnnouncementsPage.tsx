import { useEffect, useState } from 'react';
import AnnouncementService from '../../api-client/services/AnnouncementService';
import { Announcement } from '../../api-client/models/Announcement';
import './AnnouncementsPage.scss';

const AnnouncementsPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await AnnouncementService.getAllAnnouncements();
                setAnnouncements(data);
            } catch (error) {
                console.error('Failed to fetch announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="announcements-container">
            <h1 className="">All Announcements</h1>
            <ul>
                {announcements.map(announcement => (
                    <li key={announcement.id}>
                        <h2>{announcement.title}</h2>
                        <p>{announcement.description}</p>
                        <p>{announcement.dateAdded}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnnouncementsPage;