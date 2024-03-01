import EventConflictModal from "../modals/EventConflictModal";
import TextInput from "react-autocomplete-input";
import UploadImage from "./UploadImage";
import EventOrganisersForm from "./EventOrganisersForm";
import { useEffect, useState } from "react";
import CustomProgressBar from "../progressBar/CustomProgressBar";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Danger from "../alerts/Danger";
import Success from "../alerts/Success";
import Info from "../alerts/Info";

const EventDetailsForm = ({
  handleSubmit,
  formData,
  setFormData,
  error,
  success,
  existingImage,
  setExistingImage,
  suggestions,
  setSuggestions,
  setSelectedImage,
  uploading,
  showSubmitBtn,
  selectedImage,
  setImageModified,
  organizers,
  setOrganizers,
  showOrganizerForm,
  id,
  updatingEvent,
}) => {
  return (
    <div>
      <div>
        <div>
          <form className="pt-3" onSubmit={(e) => handleSubmit(e)}>
            <div className="my-3">
              <Input
                type="text"
                label="Event Name"
                required={true}
                color="white"
                value={formData.eventName}
                onChange={(e) =>
                  setFormData({ ...formData, eventName: e.target.value })
                }
              ></Input>
            </div>
            <div className="my-3">
              <Input
                required={true}
                type="datetime-local"
                color="white"
                label="Event Start Time"
                value={formData.eventStartDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventStartDate: e.target.value })
                }
              ></Input>
            </div>
            <div className="my-3">
              <Input
                required={true}
                type="datetime-local"
                color="white"
                label="Event End Time"
                value={formData.eventEndDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventEndDate: e.target.value })
                }
              ></Input>
            </div>
            <div className="my-3">
              <Input
                required={true}
                type="text"
                label="Venue"
                color="white"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
              />
            </div>
            <div className="my-3">
              <div>
                Event Type <span className="text-danger">*</span>
              </div>
              <select
                value={formData.eventType}
                onChange={(e) =>
                  setFormData({ ...formData, eventType: e.target.value })
                }
                required={true}
                className="bg-primary border px-8 py-2 rounded-xl"
              >
                <option value="Technical">Technical</option>
                <option value="Non-technical">Non-Technical</option>
                <option value="Workshop">Workshop</option>
                <option value="Hackathon">Hackathon</option>
                <option value="PaperPresentation">Paper Presentation</option>
              </select>
            </div>
            <div className="my-3">
              <Input
                required={true}
                type="text"
                color="white"
                label="First Prize Money"
                value={formData.firstPrizeMoney}
                onChange={(e) =>
                  setFormData({ ...formData, firstPrizeMoney: e.target.value })
                }
              />
            </div>
            <div className="my-3">
              <Input
                required={true}
                type="text"
                color="white"
                label="Second Prize Money"
                value={formData.secondPrizeMoney}
                onChange={(e) =>
                  setFormData({ ...formData, secondPrizeMoney: e.target.value })
                }
              ></Input>
            </div>

            <div className="my-3">
              <Input
                required={true}
                type="text"
                color="white"
                label="Contact Name"
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
              ></Input>
            </div>
            <div className="my-3">
              <Input
                label="Contact Phone"
                color="white"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
              ></Input>
            </div>
            <div className="my-3">
              <Input
                type="email"
                label="Contact Email"
                color="white"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
              ></Input>
            </div>

            <div className="my-3">
              <Input
                type="text"
                color="white"
                label="WhatsApp group link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              ></Input>
            </div>
            <div className="my-3">
              <label>Other Info (Markdown supported for headings)</label>
              <textarea
                label="Other Info"
                color="white"
                rows="8"
                value={formData.otherInfo}
                onChange={(e) =>
                  setFormData({ ...formData, otherInfo: e.target.value })
                }
                className="bg-primary text-white w-full border"
              />
            </div>
            {error && <Danger>{error}</Danger>}
            {success && <Success>{success}</Success>}
            {uploading && (
              <div className="alert alert-secondary w-75">
                Uploading your image...
              </div>
            )}
            {updatingEvent && <Info>Updating event...</Info>}
            {showSubmitBtn && (
              <div className="my-3 ">
                <Button type="submit" className="bg-primaryLight">
                  {selectedImage
                    ? "Upload image & create event"
                    : "Update Event"}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>

      {showOrganizerForm && (
        <EventOrganisersForm
          organizers={organizers}
          setOrganizers={setOrganizers}
          id={id}
        />
      )}
    </div>
  );
};
export default EventDetailsForm;
