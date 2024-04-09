import React from 'react';
import '../css/style.css';

function EditPaintingForm({ painting, updatedPaintingData, handleChange, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" id="title" className="form-control" name="Title" value={updatedPaintingData.Title} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="artist" className="form-label">Artist:</label>
                <input type="text" id="artist" className="form-control" name="Artist" value={updatedPaintingData.Artist} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea id="description" className="form-control" name="Description" value={updatedPaintingData.Description} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input type="text" id="price" className="form-control" name="Price" value={updatedPaintingData.Price} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image:</label>
                <input type="file" id="image" className="form-control" name="image" onChange={handleChange} />
            </div>
            <div className="text-center"> {/* Wrapping the button in a div with text-center class */}
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
        </form>
    );
}

export default EditPaintingForm;
