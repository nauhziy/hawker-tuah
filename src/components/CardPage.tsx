import { Link, useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import GoogleMap from "./GoogleMap";
import "./CardPage.css";
import logo from "./assets/logo.jpeg";

interface HawkerCenter {
  name: string;
  address: string;
  description: string;
  google_3d_view: string;
  q4_cleaningstartdate: string;
  q4_cleaningenddate: string;
  latitude_hc: string;
  longitude_hc: string;
}

function CardPage() {
  const { id } = useParams();
  const [hawkerData, setHawkerData] = useState<HawkerCenter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [phoneNumber, setPhoneNumber] = useState(""); // State for storing phone number
  const [subscribed, setSubscribed] = useState(false); // State to track subscription status

  useEffect(() => {
    const fetchHawkerData = async () => {
      try {
        const response = await fetch(
          "https://data.gov.sg/api/action/datastore_search?resource_id=d_bda4baa634dd1cc7a6c7cad5f19e2d68"
        );
        const data = await response.json();

        // Find the hawker center with the matching ID
        const hawker = data.result.records.find(
          (item: any) => item.serial_no === id
        );

        if (hawker) {
          setHawkerData({
            name: hawker.name,
            address: hawker.address_myenv,
            description: hawker.description_myenv,
            google_3d_view: hawker.google_3d_view,
            q4_cleaningstartdate: hawker.q4_cleaningstartdate,
            q4_cleaningenddate: hawker.q4_cleaningenddate,
            latitude_hc: hawker.latitude_hc,
            longitude_hc: hawker.longitude_hc,
          });
        } else {
          setError("Hawker center not found.");
        }
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchHawkerData();
  }, [id]);

  const handleSubscribe = () => {
    // Send the phone number to your server to register for SMS updates
    // For now, we'll just log it and close the modal
    console.log(`Subscribed phone number: ${phoneNumber}`);
    setSubscribed(true);
    setShowModal(false); // Close the modal
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!hawkerData) {
    return (
      <div className="error">No data available for this hawker center.</div>
    );
  }

  return (
    <div className="card-page">
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Hawker Tuah Logo"
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />
      </Link>
      <div className="card-page__header">
        <h1>{hawkerData.name}</h1>
      </div>
      <div className="card-page__content">
        <div className="card-page__details">
          <p>
            <strong>Address:</strong> {hawkerData.address}
          </p>
          <p>
            <strong>Cleaning:</strong> {hawkerData.q4_cleaningstartdate} to{" "}
            {hawkerData.q4_cleaningenddate}
          </p>
          <strong>Description:</strong>
          <p>{hawkerData.description}</p>
          <br></br>
          <br></br>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Subscribe for SMS Updates
          </Button>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Subscribe for SMS Updates</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubscribe}>
                Subscribe
              </Button>
            </Modal.Footer>
          </Modal>

          {subscribed && (
            <div>Thank you for subscribing! You will receive SMS updates.</div>
          )}
        </div>
        <div className="card-page__image">
          <GoogleMap
            type="streetview"
            address={hawkerData.address}
            lat={hawkerData.latitude_hc}
            lng={hawkerData.longitude_hc}
          />
        </div>
      </div>
      <div className="card-page__map">
        <GoogleMap
          type="map"
          address={hawkerData.address}
          lat={hawkerData.latitude_hc}
          lng={hawkerData.longitude_hc}
        />
      </div>
    </div>
  );
}

export default CardPage;
