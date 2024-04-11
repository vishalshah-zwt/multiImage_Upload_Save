import React, { useEffect, useState } from 'react'
import axios from "axios"
import FormData from 'form-data'

function UploadImage() {

    const [images, setImages] = useState([])
    
    let data = new FormData();
    if(images.length > 0) {
        for(let i=0;i<images.length;i++)
        {
            data.append(`file`, images[i])
        }
    };


    const handleImages = (e) => {
        let allImages = Array.from(e.target.files)
        setImages(allImages)
    }

    const saveImage = (e) => {
        axios.post('/storeImage', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        }
        )
        .then((response) => {
                console.log(response.data, "&&&&&&&&&&")
        })
        
    }


    return (
        <>
            <div className="MasterContainer">
                <input
                    type="file"
                    onChange={handleImages}
                    name="uploadImage"
                    id='uploadImage'
                    accept='image/*'
                    multiple
                />
                <label htmlFor="uploadImage">
                    Upload Image
                </label>
                <br />
                <div className='ImageContainer h-[30rem] grid grid-cols-2 gap-2  w-[30rem]  border  mx-auto justify-center'>
                    {
                        images?.map((values, index) => {
                            return <img
                                name="image"
                                src={URL.createObjectURL(images[index])}
                                alt="Image will Come Soon "
                            />
                        })
                    }
                </div>
                <button
                    type='button'
                    name='saveImage'
                    onClick={saveImage}
                    value='Save'
                >
                    Save
                </button>

            </div>

        </>
    )
}

export default UploadImage