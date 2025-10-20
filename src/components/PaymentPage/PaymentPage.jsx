import React, { useState } from "react";

const PaymentPage = () => {
    const [numero, setNumero] = useState("");
    const [nom, setNom] = useState("");

    const handlePayment = async () => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            alert("Veuillez vous connecter avant de payer.");
            return;
        }

        try {
            const response = await fetch("http://localhost/netflix-backend/create_payment.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    totalPrice: 200,
                    nomclient: nom,
                    numeroSend: numero,
                    userEmail: userEmail,
                }),
            });

            const data = await response.json();
            if (data?.url) {
                window.location.href = data.url; // 🔹 Redirection vers MoneyFusion
            } else {
                alert("Erreur lors de la création du paiement.");
            }
        } catch (error) {
            console.error("Erreur paiement :", error);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <h2>Paiement via MoneyFusion</h2>
            <input
                type="text"
                placeholder="Votre nom complet"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
            />
            <input
                type="text"
                placeholder="Numéro de téléphone"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
            />
            <button
                onClick={handlePayment}
                style={{
                    padding: "10px 20px",
                    marginTop: "20px",
                    cursor: "pointer",
                    backgroundColor: "#e50914",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                }}
            >
                Payer maintenant
            </button>
        </div>
    );
};

export default PaymentPage;
