import axios from 'axios';
import { useState } from 'react'

const SendFile = () => {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState<any>({});

    const handleSelectFile = (e: any) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        try {
            setLoading(true);
            const data = new FormData()
            data.append("my_file", file!)
 
            const res = await axios.post("/upload", data, {
                headers: {
                    'content-type': "mulpipart/form-data"
                }
            })

            setRes(res.data);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <img src={res?.secure_url} alt="" />
            <label htmlFor="file" className="btn-grey">
                {" "}
                select file
            </label>
            {file && <center> {file.name}</center>}
            <input
                id="file"
                type="file"
                onChange={handleSelectFile}
                multiple={false}
            />
            <code>
                {Object.keys(res).length > 0
                    ? Object.keys(res).map((key) => (
                        <p className="output-item" key={key}>
                            <span>{key}:</span>
                            <span>
                                {typeof res[key] === "object" ? "object" : res[key]}
                            </span>
                        </p>
                    ))
                    : null}
            </code>
            {file && (
                <>
                    <button onClick={handleUpload} className="btn-green">
                        {loading ? "uploading..." : "upload to cloudinary"}
                    </button>
                </>
            )}
        </div>
    );
}

export default SendFile