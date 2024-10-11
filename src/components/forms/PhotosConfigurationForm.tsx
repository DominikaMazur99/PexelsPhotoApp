import React from "react";
import { useState, FormEvent } from "react";
import ReusableInputComponent from "../inputs/ReusableInputComponent";
import SelectToColorsComponent from "../inputs/SelectToColorsComponents";
import { options, orientations, sizes, tags } from "../../helpers/options.ts";
import ButtonTagComponent from "../tags/ButtonTagComponent.tsx";
import { IQuery, IPhoto } from "../../interfaces/interfaces";
import {
    BasicButton,
    FormContainer,
    FormContainerButtons,
    FormContainerFilters,
    FormContainerForm,
    FormContainerTags,
    PhotoConfigurationForm,
} from "./PhotosConfigurationForm.style.tsx";

interface IPhotosConfigurationForm {
    setPhotos: (photos: IPhoto[]) => void;
    setSelectedPhoto: (photo: IPhoto | null) => void;
    formData: IQuery;
    setFormData: (element: IQuery) => void;
    fetchPhotos: (
        topic: string,
        color: string,
        orientation: string,
        size: string,
        page: number
    ) => Promise<{ photos: IPhoto[] }>;
    setIsLoading: (loading: boolean) => void;
}

const PhotosConfigurationForm = ({
    setPhotos,
    setSelectedPhoto,
    formData,
    setFormData,
    fetchPhotos,
    setIsLoading,
}: IPhotosConfigurationForm) => {
    const [activeCategory, setActiveCategory] = useState<string>("");

    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const clearFilters = () => {
        setFormData({
            topic: "all",
            color: "",
            orientation: "",
            size: "",
        });
        setActiveCategory("");
    };

    const handleSubmit = async (e: FormEvent) => {
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
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PhotoConfigurationForm onSubmit={handleSubmit}>
            <FormContainer>
                <FormContainerTags>
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
                </FormContainerTags>
                <FormContainerForm>
                    <FormContainerFilters>
                        <ReusableInputComponent
                            placeholder="Wyszukaj..."
                            value={formData.topic}
                            onChange={(e: any) =>
                                handleChange("topic", e.target.value)
                            }
                        />
                        <ReusableInputComponent
                            type="select"
                            options={orientations}
                            placeholder="Orientacja"
                            value={formData.orientation}
                            onChange={(orientation: string) =>
                                handleChange("orientation", orientation)
                            }
                        />
                        <ReusableInputComponent
                            type="select"
                            options={sizes}
                            placeholder="Rozmiar"
                            value={formData.size}
                            onChange={(size: string) =>
                                handleChange("size", size)
                            }
                        />
                        <SelectToColorsComponent
                            placeholder="Kolorystyka"
                            value={formData.color}
                            options={options}
                            onChange={(color: string) =>
                                handleChange("color", color)
                            }
                        />
                    </FormContainerFilters>
                    <FormContainerButtons>
                        <BasicButton
                            onClick={clearFilters}
                            $backgroundColor="rgb(157, 97, 203)"
                            type="button"
                        >
                            wyczyść filtry
                        </BasicButton>
                        <BasicButton
                            $backgroundColor="rgb(157, 97, 203)"
                            type="submit"
                        >
                            szukaj
                        </BasicButton>
                    </FormContainerButtons>
                </FormContainerForm>
            </FormContainer>
        </PhotoConfigurationForm>
    );
};

export default PhotosConfigurationForm;
