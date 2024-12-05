import React, { useEffect, useState } from "react";
import { fetchAllPolicies } from "./WelfareApi";

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPolicies = async () => {
      try {
        const data = await fetchAllPolicies(); // API 호출
        setPolicies(data);
      } catch (err) {
        setError("Failed to load policies.");
      } finally {
        setLoading(false);
      }
    };

    getPolicies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Policy List</h1>
      <ul>
        {policies.map((policy) => (
          <li key={policy.policyId}>
            <h2>{policy.title}</h2>
            <p>{policy.overview}</p>
            <p>
              Application Period: {policy.applicationPeriodStart} to {policy.applicationPeriodEnd}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyList;
