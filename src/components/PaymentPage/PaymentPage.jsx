import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 🔹 pour navigation et récupération params
import { activateSubscription } from "../../auth";

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handlePayment = async () => {
        try {
            // 🔹 Récupère l'email de l'utilisateur depuis localStorage
            const email = localStorage.getItem("userEmail");
            if (!email) {
                alert("Veuillez vous connecter avant d'activer l'abonnement.");
                return;
            }

            // 🔹 Simule un paiement réussi
            const success = await activateSubscription(email);

            if (success) {
                alert("Paiement réussi ! Vous pouvez maintenant accéder aux films.");

                // 🔹 Redirection vers le film que l'utilisateur voulait lire
                // On vérifie si on a des infos sur le type/id du film dans l'état location
                const { state } = location;
                if (state && state.type && state.id) {
                    navigate(`/player/${state.type}/${state.id}`);
                } else {
                    navigate("/"); // sinon on va à la home
                }
            }
        } catch (err) {
            console.error("Erreur paiement :", err);
            alert("Une erreur est survenue lors du paiement.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <h2>Abonnement requis</h2>
            <p>Pour accéder aux films, veuillez effectuer le paiement.</p>
            <button
                onClick={handlePayment}
                style={{
                    padding: "10px 20px",
                    marginTop: "20px",
                    cursor: "pointer",
                    backgroundColor: "#e50914",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px"
                }}
            >
                Payer maintenant
            </button>
        </div>
    );
};

export default PaymentPage;
