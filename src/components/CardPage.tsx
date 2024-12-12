import { Link, useParams } from "react-router-dom";
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
        <button className="btn btn-primary">Home</button>
      </Link>
      <div className="card-page__header">
        <h1>{hawkerData.name}</h1>
      </div>
      <div className="card-page__content">
        <div className="card-page__image">
          <GoogleMap
            type="streetview"
            address={hawkerData.address}
            lat={hawkerData.latitude_hc}
            lng={hawkerData.longitude_hc}
          />
        </div>
        <div className="card-page__details">
          <p>
            <strong>Address:</strong> {hawkerData.address}
          </p>
          <br></br>
          <p>
            <strong>Cleaning:</strong> {hawkerData.q4_cleaningstartdate} to{" "}
            {hawkerData.q4_cleaningenddate}
          </p>
          <br></br>
          <strong>Description:</strong>
          <br></br>
          <p>{hawkerData.description}</p>
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