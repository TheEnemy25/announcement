import React, { useEffect, useState } from 'react';
import AnnouncementService from '../../api-client/services/AnnouncementService';
import { DetailsAnnouncementDto } from '../../api-client/models/DetailsAnnouncementDto';
import { SimilarAnnouncementDto } from '../../api-client/models/SimilarAnnouncementDto';
import './AnnouncementDetailPage.scss';
import { useParams, Link } from 'react-router-dom';

const AnnouncementDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [announcement, setAnnouncement] = useState<DetailsAnnouncementDto | null>(null);
    const [similarAnnouncements, setSimilarAnnouncements] = useState<SimilarAnnouncementDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        return dateString.split('T')[0];
    };

    useEffect(() => {
        const fetchAnnouncementDetails = async () => {
            if (id) {
                try {
                    const data = await AnnouncementService.getDetailsWithSimilar(id);
                    setAnnouncement(data);
                    setSimilarAnnouncements(data.similarAnnouncements || []);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch announcement details:', error);
                    setError('Failed to load announcement details.');
                    setLoading(false);
                }
            }
        };

        fetchAnnouncementDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="announcement-detail-container__list">
            {announcement ? (
                <>
                    <div className="announcement-detail-container__list-line-up">
                        <h1 className="announcement-detail-container__list-title">{announcement.title}</h1>

                        <Link to={`/announcement/update/${id}`} className="announcement-detail-container__update-button">
                            Update Announcement
                        </Link>
                    </div>

                    <p className="announcement-detail-container__list-date">Date Added: {formatDate(announcement.dateAdded)}</p>
                    <p className="announcement-detail-container__list-description">{announcement.description}</p>
                    <hr />
                    <h2 className="announcement-detail-container__list-small-title">Similar Announcements</h2>
                    {similarAnnouncements && similarAnnouncements.length > 0 ? (
                        <ul className="announcements-container__list">
                            {similarAnnouncements.map(similar => (
                                <li key={similar.id} className="announcements-container__list-container">
                                    <Link to={`/announcement/${similar.id}`} className="announcements-container__list-link">
                                        <h3 className="announcements-container__list-title">{similar.title}</h3>
                                        <p className="announcements-container__list-description">{similar.description}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No similar announcements found.</p>
                    )}
                </>
            ) : (
                <p>Announcement not found.</p>
            )}
        </section>
    );
};

export default AnnouncementDetailPage;
