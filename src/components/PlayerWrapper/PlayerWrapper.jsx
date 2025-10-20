/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Player from "../../pages/Player/Player";
import PaymentPage from "../PaymentPage/PaymentPage";
import { checkSubscription } from "../../auth";

const PlayerWrapper = () => {
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        // Récupère l'utilisateur depuis localStorage
        const email = localStorage.getItem("userEmail");
        setUserEmail(email);

        if (!email) {
            setSubscriptionStatus("inactive");
            return;
        }

        const fetchSubscription = async () => {
            try {
                const status = await checkSubscription(email);
                setSubscriptionStatus(status);
            } catch (err) {
                console.error("Erreur lors de la vérification de l'abonnement :", err);
                setSubscriptionStatus("inactive");
            }
        };

        fetchSubscription();
    }, []);

    if (subscriptionStatus === null) return <p>Chargement...</p>;
    if (subscriptionStatus !== "active") return <PaymentPage />;

    return <Player />;
};

export default PlayerWrapper;
