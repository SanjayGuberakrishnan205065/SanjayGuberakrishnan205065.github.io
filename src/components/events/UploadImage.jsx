import { Button, Typography } from "@material-tailwind/react";

const UploadImage = ({
  existingImage,
  setExistingImage,
  selectedImage,
  setSelectedImage,
  setImageModified,
}) => {
  return (
    <div className="">
      <div>
        <Typography variant="h3" color="white">
          Upload a Poster
        </Typography>
        <p className="small text-muted">
          Must be &lt; 5 MB, preferred ratio 16:9
        </p>
        {(existingImage || selectedImage) && (
          <div>
            <img
              width={"250px"}
              src={existingImage || URL.createObjectURL(selectedImage)}
              alt="..."
              className="d-block mx-auto rounded"
            />
            <br />
            <Button
              color="red"
              className="my-3"
              onClick={() => {
                setExistingImage(null);
                setSelectedImage(null);
                setImageModified(true);
              }}
            >
              Remove Image
            </Button>
          </div>
        )}
      </div>
      <div>
        <div>
          <Typography variant="h5" color="white">
            Upload a new image
          </Typography>
        </div>
        <input
          type="file"
          required={true}
          name="img"
          accept="image/*"
          className="form-control"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
            const formData = new FormData();
            formData.append("img", event.target.files[0]);
            setExistingImage(null);
            setImageModified(true);
          }}
        />
      </div>
    </div>
  );
};
export default UploadImage;
