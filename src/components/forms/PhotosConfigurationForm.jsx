import { useState } from 'react';
import ReusableInputComponent from '../inputs/ReusableInputComponent';
import SelectToColorsComponent from '../inputs/SelectToColorsComponents';
import { options, orientations, sizes, tags } from '../../helpers/options';
import ButtonTagComponent from '../tags/ButtonTagComponent';
import './PhotosConfigurationForm.scss';

function PhotosConfigurationForm({
    setPhotos,
    setSelectedPhoto,
    formData,
    setFormData,
    fetchPhotos,
    setIsLoading,
}) {
    const [activeCategory, setActiveCategory] = useState('');
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const clearFilters = () => {
        setFormData({
            topic: 'all',
            color: '',
            orientation: '',
            size: '',
        });
        setActiveCategory('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetchPhotos(
                formData.topic,
                formData.color,
                formData.orientation,
                formData.size,
                1 // Ustawiamy stronę na 1 przy każdym wyszukiwaniu
            );
            setPhotos(response.photos);
            setSelectedPhoto(response.photos[0] || null);
            setFormData({
                topic: formData.topic,
                color: formData.color,
                orientation: formData.orientation,
                size: formData.size,
            });
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="form-container__tags">
                    {tags.map((tag) => (
                        <ButtonTagComponent
                            key={tag.value}
                            name="topic"
                            label={tag.name}
                            value={tag.value}
                            handleChange={handleChange}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    ))}
                </div>
                <div className="form-container__form">
                    <ReusableInputComponent
                        placeholder="Wyszukaj..."
                        value={formData.topic}
                        onChange={(e) => handleChange('topic', e.target.value)}
                    />
                    <ReusableInputComponent
                        type="select"
                        options={orientations}
                        placeholder="Orientacja"
                        value={formData.orientation}
                        onChange={(orientation) =>
                            handleChange('orientation', orientation)
                        }
                    />
                    <ReusableInputComponent
                        type="select"
                        options={sizes}
                        placeholder="Rozmiar"
                        value={formData.size}
                        onChange={(size) => handleChange('size', size)}
                    />
                    <SelectToColorsComponent
                        placeholder="Kolorystyka"
                        value={formData.color}
                        options={options}
                        onChange={(color) => handleChange('color', color)}
                    />
                    <button
                        className="form-container__form__btn-clear"
                        onClick={clearFilters}
                    >
                        wyczyść filtry
                    </button>
                    <button
                        className="form-container__form__btn"
                        type="submit"
                    >
                        szukaj
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PhotosConfigurationForm;
