import React, { useEffect, useState } from 'react';
import AnnouncementService from '../../api-client/services/AnnouncementService';
import { DetailsAnnouncementDto } from '../../api-client/models/DetailsAnnouncementDto';
import { SimilarAnnouncementDto } from '../../api-client/models/SimilarAnnouncementDto';
import './AnnouncementPage.scss';
import { useParams } from 'react-router-dom';

const AnnouncementDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [announcement, setAnnouncement] = useState<DetailsAnnouncementDto | null>(null);
    const [similarAnnouncements, setSimilarAnnouncements] = useState<SimilarAnnouncementDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncementDetails = async () => {
            if (id) {
                try {
                    const data = await AnnouncementService.getDetailsWithSimilar(id);
                    console.log('Fetched announcement details:', data);
                    console.log('Similar announcements:', data.similarAnnouncements);

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
        <div className="announcement-container">
            {announcement ? (
                <>
                    <h1>{announcement.title}</h1>
                    <p>{announcement.description}</p>
                    <p>Date Added: {announcement.dateAdded}</p>

                    <h2>Similar Announcements</h2>
                    {similarAnnouncements && similarAnnouncements.length > 0 ? (
                        <ul>
                            {similarAnnouncements.map(similar => (
                                <li key={similar.id}>
                                    <h3>{similar.title}</h3>
                                    <p>{similar.description}</p>
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
        </div>
    );
};

export default AnnouncementDetailPage;