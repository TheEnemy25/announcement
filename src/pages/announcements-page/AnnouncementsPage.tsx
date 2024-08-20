import { useEffect, useState } from 'react';
import AnnouncementService from '../../api-client/services/AnnouncementService';
import { Announcement } from '../../api-client/models/Announcement';
import './AnnouncementsPage.scss';
import { Link } from 'react-router-dom';

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

    const formatDate = (dateString: string) => {
        return dateString.split('T')[0];
    };

    return (
        <section className="announcements-container">
            <div className="announcements-container-flex">
                <h1 className="announcements-container-title">All Announcements</h1>
                <Link to="/announcement-form" className="announcements-container-button">
                    Create Announcement
                </Link>
            </div>

            <ul className="announcements-container__list">
                {announcements.map(announcement => (
                    <li key={announcement.id} className="announcements-container__list-container">
                        <Link to={`/announcement/${announcement.id}`} className="announcements-container__list-link">
                            <h2 className="announcements-container__list-title">{announcement.title}</h2>
                            <hr />
                            <p className="announcements-container__list-date">Date Added: {formatDate(announcement.dateAdded)}</p>
                            <p className="announcements-container__list-description">{announcement.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section >
    );
}

export default AnnouncementsPage;