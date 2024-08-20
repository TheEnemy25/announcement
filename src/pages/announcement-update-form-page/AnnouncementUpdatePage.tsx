import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnnouncementService from '../../api-client/services/AnnouncementService';
import { Announcement } from '../../api-client/models/Announcement';
import './AnnouncementUpdatePage.scss';

const AnnouncementUpdatePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            if (id) {
                try {
                    const announcement = await AnnouncementService.getAnnouncementById(id);
                    setTitle(announcement.title);
                    setDescription(announcement.description);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch announcement:', error);
                    setError('Failed to load announcement.');
                    setLoading(false);
                }
            }
        };

        fetchAnnouncement();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedAnnouncement: Announcement = {
            id: id!,
            title,
            description,
            dateAdded: new Date().toISOString(),
        };

        try {
            await AnnouncementService.updateAnnouncement(updatedAnnouncement);
        } catch (error) {
            console.error('Failed to update announcement:', error);
            setError('Failed to update announcement.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="announcement-update-form-container">
            <h1 className="announcement-update-form-container-title">Update Announcement</h1>
            <div className="announcement-update-form-container__list">
                <form onSubmit={handleSubmit} className="announcement-update-form-container__list-form">
                    <div>
                        <h1 className="announcement-update-form-container__list-title">Title:</h1>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <h1 className="announcement-update-form-container__list-title">Description:</h1>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </section>
    );
}

export default AnnouncementUpdatePage;
