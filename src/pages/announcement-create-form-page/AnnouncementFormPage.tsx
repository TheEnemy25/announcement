import { useState } from 'react';
import AnnouncementService from '../../api-client/services/AnnouncementService';
import { Announcement } from '../../api-client/models/Announcement';
import './AnnouncementFormPage.scss';

const AnnouncementFormPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newAnnouncement: Announcement = {
            id: '',
            title,
            description,
            dateAdded: new Date().toISOString()
        };

        try {
            await AnnouncementService.createAnnouncement(newAnnouncement);
        } catch (error) {
            console.error('Failed to create announcement:', error);
        }
    };

    return (
        <section className="announcement-form-container">
            <h1 className="announcement-form-container-title">Create New Announcement</h1>
            <div className="announcement-form-container__list">
                <form onSubmit={handleSubmit} className="announcement-form-container__list-form">
                    <div>
                        <h1 className="announcement-form-container__list-title">Title:</h1>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <h1 className="announcement-form-container__list-title">Description:</h1>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </section>
    );
}

export default AnnouncementFormPage;