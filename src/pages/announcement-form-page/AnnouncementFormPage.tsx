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
        <div className="announcement-form-container">
            <h1>Create New Announcement</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AnnouncementFormPage;