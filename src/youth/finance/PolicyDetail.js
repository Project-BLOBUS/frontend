import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPolicyById } from "./financeApi";

const PolicyDetail = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPolicy = async () => {
      try {
        const data = await fetchPolicyById(id); // API 호출
        setPolicy(data);
      } catch (err) {
        setError("Failed to load policy.");
      } finally {
        setLoading(false);
      }
    };

    getPolicy();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!policy) return <p>No data available.</p>;

  return (
    <div>
      <h1>{policy.title}</h1>
      <p>{policy.overview}</p>
      <p>
        Application Period: {policy.applicationPeriodStart} to {policy.applicationPeriodEnd}
      </p>
      <p>Contact Info: {policy.contactInfo}</p>
      <p>Contact Phone: {policy.contactPhone}</p>
    </div>
  );
};

export default PolicyDetail;
